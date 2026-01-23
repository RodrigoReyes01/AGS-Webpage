# Design Document: Aviation Ground Solutions Landing Page

## Overview

The Aviation Ground Solutions landing page is a responsive Next.js application that serves as the primary entry point for potential clients. The design emphasizes a modern, professional aesthetic appropriate for the aviation industry while ensuring accessibility and performance across all devices.

The implementation uses Next.js 14+ with the App Router, TypeScript for type safety, and Tailwind CSS for responsive styling. The architecture separates concerns between presentation components, internationalization logic, and content management, enabling easy maintenance and future expansion.

## Architecture

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl or custom i18n solution
- **Image Optimization**: Next.js Image component
- **State Management**: React Context API for language selection

### Project Structure

```
app/
├── [locale]/
│   ├── layout.tsx          # Root layout with language provider
│   ├── page.tsx             # Landing page
│   └── components/
│       ├── Navigation.tsx   # Navigation bar component
│       └── HeroSection.tsx  # Hero section component
├── components/
│   ├── LanguageSelector.tsx # Language toggle component
│   └── Button.tsx           # Reusable button component
├── lib/
│   └── i18n.ts              # Internationalization configuration
├── translations/
│   ├── en.json              # English translations
│   └── es.json              # Spanish translations
└── public/
    └── images/              # Optimized images
```

### Component Hierarchy

```
Page (Landing)
├── Navigation
│   ├── Logo
│   ├── NavigationLinks
│   ├── RequestButton
│   └── LanguageSelector
└── HeroSection
    ├── Heading
    ├── Subheading
    └── ChatButton
```

## Components and Interfaces

### Navigation Component

**Purpose**: Provides site-wide navigation with responsive behavior and language selection.

**Props Interface**:
```typescript
interface NavigationProps {
  locale: string;
  translations: {
    aboutUs: string;
    ourServices: string;
    requestUs: string;
  };
}
```

**Behavior**:
- Desktop (≥768px): Horizontal layout with all items visible
- Mobile (<768px): Hamburger menu with slide-out drawer
- Sticky positioning on scroll
- Active link highlighting

**Styling Approach**:
- Transparent background with subtle backdrop blur
- White text with hover effects
- Blue accent for active states and "Request Us" button
- Smooth transitions for all interactive states

### HeroSection Component

**Purpose**: Creates impactful first impression with company branding and call-to-action.

**Props Interface**:
```typescript
interface HeroSectionProps {
  locale: string;
  translations: {
    mainHeading: string;
    subheading: string;
    ctaButton: string;
  };
  backgroundImage: string;
}
```

**Behavior**:
- Full viewport height (100vh)
- Responsive text sizing using clamp() or Tailwind responsive classes
- Background image with overlay for text readability
- CTA button positioned bottom-right on desktop, centered on mobile

**Styling Approach**:
- Background image with dark overlay (opacity 0.4-0.6)
- White text with text-shadow for readability
- "GROUND" in brand blue (#0066CC or similar)
- CTA button with hover scale effect

### LanguageSelector Component

**Purpose**: Enables users to switch between English and Spanish.

**Props Interface**:
```typescript
interface LanguageSelectorProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}
```

**Behavior**:
- Displays US and Spanish flags as clickable buttons
- Highlights currently selected language
- Persists selection to localStorage
- Updates URL to reflect language (e.g., /en or /es)

**Implementation**:
```typescript
const LanguageSelector = ({ currentLocale, onLanguageChange }) => {
  const handleLanguageChange = (locale: string) => {
    localStorage.setItem('preferredLanguage', locale);
    onLanguageChange(locale);
    // Update URL using Next.js router
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleLanguageChange('en')}
        className={currentLocale === 'en' ? 'opacity-100' : 'opacity-50'}
      >
        <Image src="/flags/us.svg" alt="English" width={24} height={24} />
      </button>
      <button 
        onClick={() => handleLanguageChange('es')}
        className={currentLocale === 'es' ? 'opacity-100' : 'opacity-50'}
      >
        <Image src="/flags/es.svg" alt="Español" width={24} height={24} />
      </button>
    </div>
  );
};
```

### Button Component

**Purpose**: Reusable button component with consistent styling and variants.

**Props Interface**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Variants**:
- **Primary**: Blue background, white text (for "Request Us", "Let's Chat!")
- **Secondary**: White background, blue text
- **Outline**: Transparent background, blue border

## Data Models

### Translation Structure

**English Translation File (en.json)**:
```json
{
  "navigation": {
    "aboutUs": "About us",
    "ourServices": "Our Services",
    "requestUs": "Request Us"
  },
  "hero": {
    "mainHeading": "AVIATION GROUND SOLUTIONS",
    "groundWord": "GROUND",
    "subheading": "Your premier FBO ground service from Belize to Panama",
    "ctaButton": "Let's Chat!"
  }
}
```

**Spanish Translation File (es.json)**:
```json
{
  "navigation": {
    "aboutUs": "Sobre nosotros",
    "ourServices": "Nuestros Servicios",
    "requestUs": "Solicítanos"
  },
  "hero": {
    "mainHeading": "AVIATION GROUND SOLUTIONS",
    "groundWord": "GROUND",
    "subheading": "Su servicio FBO terrestre premier desde Belice hasta Panamá",
    "ctaButton": "¡Hablemos!"
  }
}
```

### Internationalization Context

**Purpose**: Manages language state across the application.

```typescript
interface I18nContextType {
  locale: string;
  translations: Record<string, any>;
  setLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState(initialLocale);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load translations for current locale
    import(`@/translations/${locale}.json`).then(setTranslations);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, translations, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};
```

## Responsive Design Breakpoints

### Breakpoint Strategy

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: ≥ 1024px

### Navigation Responsive Behavior

**Desktop (≥768px)**:
- Horizontal layout
- All links visible
- Logo left, links center, CTA and language selector right

**Mobile (<768px)**:
- Hamburger menu icon
- Slide-out drawer for navigation links
- Logo left, hamburger right
- Language selector in drawer

### Hero Section Responsive Behavior

**Desktop (≥1024px)**:
- Heading: text-7xl (72px)
- Subheading: text-2xl (24px)
- CTA button: bottom-right, absolute positioning

**Tablet (768px-1024px)**:
- Heading: text-6xl (60px)
- Subheading: text-xl (20px)
- CTA button: bottom-right, absolute positioning

**Mobile (<768px)**:
- Heading: text-4xl (36px)
- Subheading: text-lg (18px)
- CTA button: centered, relative positioning below text

## Image Optimization Strategy

### Background Images

- Use Next.js Image component with `fill` prop
- Implement `priority` prop for hero background (above fold)
- Serve WebP format with JPEG fallback
- Implement responsive image sizes using `sizes` prop

### Logo Images

- Use SVG format when possible for scalability
- PNG with transparent background as fallback
- Multiple sizes for different contexts (navigation, mobile, etc.)

### Implementation Example

```typescript
<Image
  src="/images/hero-background.jpg"
  alt="Aviation Ground Solutions"
  fill
  priority
  quality={85}
  sizes="100vw"
  className="object-cover"
/>
```

## Accessibility Considerations

### Semantic HTML

- Use `<nav>` for navigation bar
- Use `<header>` for hero section
- Use `<button>` for interactive elements (not `<div>`)
- Use proper heading hierarchy (h1 for main heading)

### ARIA Labels

```typescript
<nav aria-label="Main navigation">
  <button aria-label="Toggle menu" aria-expanded={isOpen}>
    {/* Hamburger icon */}
  </button>
</nav>

<button aria-label="Switch to Spanish">
  <Image src="/flags/es.svg" alt="" role="presentation" />
</button>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Visible focus indicators for all focusable elements
- Logical tab order
- Escape key closes mobile menu

### Color Contrast

- Ensure WCAG AA compliance (4.5:1 for normal text)
- Text overlay on background images must maintain readability
- Use text-shadow or background overlays as needed



## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Navigation Link Functionality

*For any* navigation link in the Navigation component, clicking that link should trigger navigation to the corresponding section or page.

**Validates: Requirements 2.1**

### Property 2: Language Switching Completeness

*For any* language selection (English or Spanish), all translatable content on the page should display in the selected language with no mixed-language content.

**Validates: Requirements 5.1, 5.2**

### Property 3: Dynamic Language Updates

*For any* visible text element on the page, changing the language should update that element's content without requiring a page reload.

**Validates: Requirements 5.5**

### Property 4: Image Accessibility

*For any* image element rendered on the page, that element should have a non-empty alt attribute providing appropriate alternative text.

**Validates: Requirements 7.4**

### Property 5: Interactive Element Feedback

*For any* interactive element (button, link, or clickable component), user interaction (hover, click, focus) should produce visible visual feedback indicating the interaction state.

**Validates: Requirements 8.1, 8.4**

### Property 6: Smooth State Transitions

*For any* interactive element with state changes (hover, active, focus), the transition between states should use CSS transitions for smooth visual changes.

**Validates: Requirements 8.5**

### Property 7: Translation Key Consistency

*For any* translated string accessed in the application, it should be retrieved using the consistent key-based translation system (e.g., `t('navigation.aboutUs')` format).

**Validates: Requirements 10.4**

### Property 8: Translation Fallback Behavior

*For any* translation key that does not exist in the current language's translation file, the system should gracefully fall back to the English translation for that key.

**Validates: Requirements 10.5**

## Error Handling

### Translation Errors

**Missing Translation Keys**:
- Fallback to English translation
- Log warning in development mode
- Display key name if English also missing (e.g., "[missing: navigation.aboutUs]")

**Invalid Locale**:
- Default to English ('en')
- Log error in development mode
- Persist valid locale to prevent repeated errors

### Image Loading Errors

**Failed Image Load**:
- Display fallback placeholder image
- Log error for monitoring
- Provide alt text for accessibility

**Missing Image Files**:
- Show broken image indicator in development
- Use Next.js Image component error handling
- Implement onError callback for graceful degradation

### Navigation Errors

**Invalid Route**:
- Redirect to home page
- Log navigation error
- Display user-friendly error message

**Scroll Target Not Found**:
- Scroll to top of page as fallback
- Log warning in development mode

### Responsive Behavior Errors

**Viewport Detection Issues**:
- Default to mobile-first layout
- Use CSS media queries as primary responsive mechanism
- JavaScript viewport detection as enhancement only

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, component rendering, and error conditions
- **Property tests**: Verify universal properties across all inputs using randomized testing

Both approaches are complementary and necessary. Unit tests catch concrete bugs and verify specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing

**Focus Areas**:
- Component rendering with specific props
- User interaction simulation (clicks, hovers)
- Responsive behavior at specific breakpoints
- Error boundary behavior
- Edge cases (empty translations, missing images)

**Testing Library**: React Testing Library with Jest

**Example Unit Tests**:
- Navigation renders with correct links
- Hero section displays correct heading text
- Language selector switches between languages
- Mobile menu opens and closes correctly
- Buttons have correct hover states

### Property-Based Testing

**Library**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: ags-landing-page, Property {number}: {property_text}`

**Property Test Implementation**:

Each correctness property defined above must be implemented as a single property-based test. Examples:

**Property 4: Image Accessibility**
```typescript
// Feature: ags-landing-page, Property 4: Image Accessibility
test('all images have alt text', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        src: fc.string(),
        alt: fc.string().filter(s => s.length > 0)
      })),
      (images) => {
        const { container } = render(<TestComponent images={images} />);
        const imgElements = container.querySelectorAll('img');
        
        imgElements.forEach(img => {
          expect(img.getAttribute('alt')).toBeTruthy();
          expect(img.getAttribute('alt').length).toBeGreaterThan(0);
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 8: Translation Fallback**
```typescript
// Feature: ags-landing-page, Property 8: Translation Fallback Behavior
test('missing translations fall back to English', () => {
  fc.assert(
    fc.property(
      fc.string(), // Random translation key
      (translationKey) => {
        const result = getTranslation(translationKey, 'es');
        
        // Should return English translation or key indicator
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        
        // Should not return undefined or null
        expect(result).not.toBeNull();
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Focus Areas**:
- Full page rendering with all components
- Language switching across entire page
- Navigation flow between sections
- Image optimization and loading
- Responsive behavior across breakpoints

**Tools**: Playwright or Cypress for end-to-end testing

### Accessibility Testing

**Tools**:
- jest-axe for automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)

**Test Cases**:
- All interactive elements keyboard accessible
- Proper focus management
- ARIA labels present and correct
- Color contrast meets WCAG AA standards

### Performance Testing

**Metrics**:
- Lighthouse performance score > 80
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

**Tools**:
- Lighthouse CI for automated performance testing
- WebPageTest for detailed performance analysis
