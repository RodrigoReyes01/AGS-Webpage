# AGS Landing Page - Project Structure

## Directory Structure

```
ags-webpage/
├── app/                      # Next.js App Router directory
│   ├── components/          # Page-specific components
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles with Tailwind
├── components/              # Reusable components
│   ├── Button.tsx           # Reusable button component
│   ├── LanguageSelector.tsx # Language toggle component
│   └── ...
├── lib/                     # Utility functions and configurations
│   ├── i18n.ts             # Internationalization setup
│   └── ...
├── translations/            # Translation files
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
├── public/                  # Static assets
│   └── images/             # Optimized images
├── __tests__/              # Test files (optional location)
└── ...config files
```

## Configuration Files

- **package.json**: Project dependencies and scripts
- **tsconfig.json**: TypeScript configuration with strict mode
- **next.config.js**: Next.js configuration
- **tailwind.config.ts**: Tailwind CSS configuration with brand colors
- **postcss.config.js**: PostCSS configuration for Tailwind
- **jest.config.js**: Jest testing configuration
- **jest.setup.js**: Jest setup with Testing Library
- **.eslintrc.json**: ESLint configuration

## Key Features

- Next.js 14+ with App Router
- TypeScript with strict mode enabled
- Tailwind CSS for styling
- Jest + React Testing Library for unit tests
- fast-check for property-based testing
- Internationalization support (English/Spanish)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build for production:
   ```bash
   npm run build
   ```
