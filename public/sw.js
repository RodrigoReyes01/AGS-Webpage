// Service Worker for AGS Website
// Implements caching strategies for optimal performance
// Network-first for critical assets to ensure incognito/private browsing works

const CACHE_VERSION = 'v2'; // Incremented version
const STATIC_CACHE = `ags-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `ags-images-${CACHE_VERSION}`;
const API_CACHE = `ags-api-${CACHE_VERSION}`;

// Assets to cache immediately on install (optional enhancement)
const PRECACHE_ASSETS = [
  '/favicon.png',
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn('[SW] Precache failed, continuing anyway:', err);
        });
      })
      .catch((err) => {
        console.warn('[SW] Cache open failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('ags-') && name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== API_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .catch((err) => {
        console.warn('[SW] Cache cleanup failed:', err);
      })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  try {
    const url = new URL(request.url);

    // API requests - stale-while-revalidate
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        caches.open(API_CACHE)
          .then((cache) => {
            return cache.match(request).then((cachedResponse) => {
              const fetchPromise = fetch(request)
                .then((networkResponse) => {
                  if (networkResponse && networkResponse.ok) {
                    cache.put(request, networkResponse.clone()).catch((err) => {
                      console.warn('[SW] Failed to cache API response:', err);
                    });
                  }
                  return networkResponse;
                })
                .catch((err) => {
                  console.warn('[SW] API fetch failed:', err);
                  throw err;
                });
              return cachedResponse || fetchPromise;
            });
          })
          .catch((err) => {
            console.warn('[SW] API cache failed, fetching from network:', err);
            return fetch(request);
          })
      );
      return;
    }

    // HTML pages - NETWORK-FIRST with cache fallback
    // This ensures incognito mode works (always tries network first)
    if (request.destination === 'document') {
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone).catch((err) => {
                    console.warn('[SW] Failed to cache HTML:', err);
                  });
                })
                .catch((err) => {
                  console.warn('[SW] Failed to open cache for HTML:', err);
                });
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[SW] HTML fetch failed, trying cache:', err);
            return caches.match(request)
              .then((cachedResponse) => {
                return cachedResponse || caches.match('/');
              })
              .catch((cacheErr) => {
                console.warn('[SW] Cache match failed:', cacheErr);
                throw err; // Re-throw original network error
              });
          })
      );
      return;
    }

    // JavaScript and CSS - NETWORK-FIRST with cache fallback
    // Critical for incognito mode to work properly
    if (request.destination === 'script' || request.destination === 'style') {
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone).catch((err) => {
                    console.warn('[SW] Failed to cache asset:', err);
                  });
                })
                .catch((err) => {
                  console.warn('[SW] Failed to open cache for asset:', err);
                });
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[SW] Asset fetch failed, trying cache:', err);
            return caches.match(request)
              .catch((cacheErr) => {
                console.warn('[SW] Cache match failed:', cacheErr);
                throw err; // Re-throw original network error
              });
          })
      );
      return;
    }

    // Images - NETWORK-FIRST with cache fallback
    if (request.destination === 'image') {
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(IMAGE_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone).catch((err) => {
                    console.warn('[SW] Failed to cache image:', err);
                  });
                })
                .catch((err) => {
                  console.warn('[SW] Failed to open image cache:', err);
                });
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[SW] Image fetch failed, trying cache:', err);
            return caches.match(request)
              .catch((cacheErr) => {
                console.warn('[SW] Image cache match failed:', cacheErr);
                // Return placeholder SVG if both network and cache fail
                return new Response(
                  '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Image unavailable</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              });
          })
      );
      return;
    }

    // Fonts - NETWORK-FIRST with cache fallback
    if (request.destination === 'font') {
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone).catch((err) => {
                    console.warn('[SW] Failed to cache font:', err);
                  });
                })
                .catch((err) => {
                  console.warn('[SW] Failed to open cache for font:', err);
                });
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[SW] Font fetch failed, trying cache:', err);
            return caches.match(request)
              .catch((cacheErr) => {
                console.warn('[SW] Font cache match failed:', cacheErr);
                throw err;
              });
          })
      );
      return;
    }

    // Default - NETWORK-FIRST with cache fallback
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone).catch((err) => {
                  console.warn('[SW] Failed to cache resource:', err);
                });
              })
              .catch((err) => {
                console.warn('[SW] Failed to open cache:', err);
              });
          }
          return networkResponse;
        })
        .catch((err) => {
          console.warn('[SW] Fetch failed, trying cache:', err);
          return caches.match(request)
            .catch((cacheErr) => {
              console.warn('[SW] Cache match failed:', cacheErr);
              throw err;
            });
        })
    );
  } catch (error) {
    console.error('[SW] Fetch handler error:', error);
    // If anything goes wrong, just fetch from network
    event.respondWith(fetch(request));
  }
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Retrieve pending form submissions from IndexedDB
  // This would be implemented based on your form handling logic
  console.log('[SW] Syncing contact form submissions...');
}

// Push notifications (optional - for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/favicon.png',
    badge: '/favicon.png',
  };
  event.waitUntil(
    self.registration.showNotification('AGS Notification', options)
  );
});

// Error handler
self.addEventListener('error', (event) => {
  console.error('[SW] Service worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});