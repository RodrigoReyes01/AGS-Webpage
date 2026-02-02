# AGS-Webpage

Official website for AGS (Aviation Ground Solutions) - Premier FBO and ground handling services in Central America.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The static site will be in the 'out/' folder
```

## 📦 Project Structure

- `/app` - Next.js 14 app directory with pages and components
- `/components` - Reusable React components
- `/lib` - Utilities (i18n, caching, performance monitoring)
- `/public` - Static assets (images, service worker, manifest)
- `/translations` - i18n JSON files (en, es)
- `/Images` - Source images (original assets)
- `/Videos` - Source videos

## 🌐 Deployment

This is a statically exported Next.js site optimized for Apache/cPanel hosting.

See [CPANEL_DEPLOYMENT_GUIDE.md](./CPANEL_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy to cPanel

1. Build: `npm run build`
2. Upload entire `out/` folder to `public_html`
3. Ensure `.htaccess` is uploaded (handles routing)

## ✨ Features

- 🌍 Bilingual (English/Spanish)
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance (PWA, service worker, caching)
- 🖼️ WebP images with responsive sizes
- ♿ Accessibility compliant
- 🔒 Security headers configured
- 📊 Performance monitoring (Core Web Vitals)

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Service Worker (offline support)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production site
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run analyze` - Analyze bundle sizes
- `npm run size` - Check size limits

## 🌍 Languages

- English (default) - `/` or `/en`
- Spanish - `/es`

## 📄 License

Proprietary - AGS Aviation Ground Solutions
