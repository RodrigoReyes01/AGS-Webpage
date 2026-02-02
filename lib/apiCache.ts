// API Response Caching with IndexedDB
// Implements stale-while-revalidate pattern
// Gracefully handles incognito/private browsing where IndexedDB may be unavailable

const DB_NAME = 'ags-api-cache';
const DB_VERSION = 1;
const STORE_NAME = 'responses';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedResponse {
  url: string;
  data: any;
  timestamp: number;
}

// Check if IndexedDB is available (may be disabled in incognito mode)
function isIndexedDBAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && 'indexedDB' in window && window.indexedDB !== null;
  } catch (error) {
    console.warn('[API Cache] IndexedDB check failed:', error);
    return false;
  }
}

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('IndexedDB not available (private browsing?)'));
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'url' });
        }
      };
    } catch (error) {
      reject(error);
    }
  });
}

// Get cached response
async function getCached(url: string): Promise<any | null> {
  if (!isIndexedDBAvailable()) {
    console.info('[API Cache] IndexedDB not available, skipping cache read');
    return null;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const cached = request.result as CachedResponse | undefined;
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          resolve(cached.data);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('[API Cache] Error reading from cache:', error);
    return null;
  }
}

// Set cached response
async function setCached(url: string, data: any): Promise<void> {
  if (!isIndexedDBAvailable()) {
    console.info('[API Cache] IndexedDB not available, skipping cache write');
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const cached: CachedResponse = {
      url,
      data,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(cached);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('[API Cache] Error writing to cache:', error);
  }
}

// Fetch with cache - stale-while-revalidate
export async function fetchWithCache<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  // Try to get cached data first
  const cached = await getCached(url);

  // If we have cached data, return it immediately
  if (cached !== null) {
    // Revalidate in the background
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setCached(url, data))
      .catch((error) => console.error('Background revalidation failed:', error));

    return cached;
  }

  // No cache, fetch from network
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    await setCached(url, data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Clear expired cache entries
export async function clearExpiredCache(): Promise<void> {
  if (!isIndexedDBAvailable()) {
    console.info('[API Cache] IndexedDB not available, skipping cache cleanup');
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        const cached = cursor.value as CachedResponse;
        if (Date.now() - cached.timestamp > CACHE_DURATION) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  } catch (error) {
    console.warn('[API Cache] Error clearing expired cache:', error);
  }
}

// Clear all cache
export async function clearAllCache(): Promise<void> {
  if (!isIndexedDBAvailable()) {
    console.info('[API Cache] IndexedDB not available, skipping cache clear');
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (error) {
    console.warn('[API Cache] Error clearing cache:', error);
  }
}
