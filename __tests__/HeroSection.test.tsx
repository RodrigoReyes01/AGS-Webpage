import { render, screen } from '@testing-library/react';
import HeroSection from '@/app/components/HeroSection';

describe('HeroSection Component', () => {
  it('should render with full viewport height', () => {
    const { container } = render(<HeroSection />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('h-screen');
    expect(header).toHaveClass('min-h-[600px]');
  });

  it('should render background image with correct attributes', () => {
    render(<HeroSection />);
    const images = document.querySelectorAll('img');
    const heroImage = Array.from(images).find(img => 
      img.alt === 'Aviation Ground Solutions - Aircraft on tarmac'
    );
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('alt', 'Aviation Ground Solutions - Aircraft on tarmac');
  });

  it('should render with dark overlay for text readability', () => {
    const { container } = render(<HeroSection />);
    const overlay = container.querySelector('.bg-black.bg-opacity-50');
    expect(overlay).toBeInTheDocument();
  });

  it('should use semantic header element', () => {
    const { container } = render(<HeroSection />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should render with custom background image', () => {
    render(<HeroSection backgroundImage="/custom-image.jpg" />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should have proper z-index layering', () => {
    const { container } = render(<HeroSection />);
    const backgroundContainer = container.querySelector('.z-0');
    const contentContainer = container.querySelector('.z-10');
    expect(backgroundContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
  });

  it('should have responsive container with proper padding', () => {
    const { container } = render(<HeroSection />);
    const contentContainer = container.querySelector('.max-w-7xl');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('px-4');
    expect(contentContainer).toHaveClass('sm:px-6');
    expect(contentContainer).toHaveClass('lg:px-8');
  });

  it('should center content vertically and horizontally', () => {
    const { container } = render(<HeroSection />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('items-center');
    expect(header).toHaveClass('justify-center');
  });

  // Task 7.2: Hero text content tests
  describe('Hero Text Content (Task 7.2)', () => {
    it('should render main heading with default text', () => {
      render(<HeroSection />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain('AVIATION');
      expect(heading.textContent).toContain('GROUND');
      expect(heading.textContent).toContain('SOLUTIONS');
    });

    it('should style "GROUND" word in brand blue color', () => {
      const { container } = render(<HeroSection />);
      const groundSpan = container.querySelector('.text-brand-blue');
      expect(groundSpan).toBeInTheDocument();
      expect(groundSpan?.textContent).toBe('GROUND');
    });

    it('should render subheading with default text', () => {
      render(<HeroSection />);
      const subheading = screen.getByText(/Your premier FBO ground service from Belize to Panama/i);
      expect(subheading).toBeInTheDocument();
      expect(subheading.tagName).toBe('P');
    });

    it('should render CTA button with default text', () => {
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      // Should have two buttons: one for mobile, one for desktop
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toBeInTheDocument();
      expect(buttons[1]).toBeInTheDocument();
    });

    it('should integrate with translation system - custom heading', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Custom subheading text',
        ctaButton: 'Contact Us',
      };
      render(<HeroSection translations={translations} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toContain('AVIATION GROUND SOLUTIONS');
      
      const subheading = screen.getByText('Custom subheading text');
      expect(subheading).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button', { name: 'Contact Us' });
      // Should have two buttons: one for mobile, one for desktop
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toBeInTheDocument();
      expect(buttons[1]).toBeInTheDocument();
    });

    it('should integrate with translation system - Spanish', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Su servicio FBO terrestre premier desde Belice hasta Panamá',
        ctaButton: '¡Hablemos!',
      };
      render(<HeroSection translations={translations} locale="es" />);
      
      const subheading = screen.getByText(/Su servicio FBO terrestre premier desde Belice hasta Panamá/i);
      expect(subheading).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button', { name: '¡Hablemos!' });
      // Should have two buttons: one for mobile, one for desktop
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toBeInTheDocument();
      expect(buttons[1]).toBeInTheDocument();
    });

    it('should have proper typography classes for heading', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');
      expect(heading).toHaveClass('text-4xl');
      expect(heading).toHaveClass('md:text-6xl');
      expect(heading).toHaveClass('lg:text-7xl');
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('text-white');
    });

    it('should have proper typography classes for subheading', () => {
      const { container } = render(<HeroSection />);
      const subheading = container.querySelector('p');
      expect(subheading).toHaveClass('text-base');
      expect(subheading).toHaveClass('sm:text-lg');
      expect(subheading).toHaveClass('md:text-xl');
      expect(subheading).toHaveClass('lg:text-2xl');
      expect(subheading).toHaveClass('text-white');
    });

    it('should have text shadow for readability', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');
      const subheading = container.querySelector('p');
      expect(heading).toHaveClass('drop-shadow-lg');
      expect(subheading).toHaveClass('drop-shadow-md');
    });
  });

  // Task 7.4: Responsive behavior tests
  describe('Responsive Behavior (Task 7.4)', () => {
    it('should have responsive text sizing for heading', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');
      // Mobile: text-4xl, Small: text-5xl, Tablet: text-6xl, Desktop: text-7xl
      expect(heading).toHaveClass('text-4xl');
      expect(heading).toHaveClass('sm:text-5xl');
      expect(heading).toHaveClass('md:text-6xl');
      expect(heading).toHaveClass('lg:text-7xl');
    });

    it('should have responsive text sizing for subheading', () => {
      const { container } = render(<HeroSection />);
      const subheading = container.querySelector('p');
      // Mobile: text-base, Small: text-lg, Tablet: text-xl, Desktop: text-2xl
      expect(subheading).toHaveClass('text-base');
      expect(subheading).toHaveClass('sm:text-lg');
      expect(subheading).toHaveClass('md:text-xl');
      expect(subheading).toHaveClass('lg:text-2xl');
    });

    it('should have mobile CTA button that is centered and hidden on desktop', () => {
      const { container } = render(<HeroSection />);
      const mobileButtonContainer = container.querySelector('.md\\:hidden');
      expect(mobileButtonContainer).toBeInTheDocument();
      expect(mobileButtonContainer?.querySelector('button')).toBeInTheDocument();
    });

    it('should have desktop CTA button positioned bottom-right and hidden on mobile', () => {
      const { container } = render(<HeroSection />);
      const desktopButtonContainer = container.querySelector('.hidden.md\\:block');
      expect(desktopButtonContainer).toBeInTheDocument();
      expect(desktopButtonContainer).toHaveClass('absolute');
      expect(desktopButtonContainer).toHaveClass('bottom-8');
      expect(desktopButtonContainer).toHaveClass('right-8');
      expect(desktopButtonContainer).toHaveClass('lg:bottom-12');
      expect(desktopButtonContainer).toHaveClass('lg:right-12');
      expect(desktopButtonContainer?.querySelector('button')).toBeInTheDocument();
    });

    it('should render two CTA buttons for responsive behavior', () => {
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      // One for mobile (centered), one for desktop (bottom-right)
      expect(buttons).toHaveLength(2);
    });

    it('should maintain background image aspect ratio with object-cover', () => {
      const { container } = render(<HeroSection />);
      const images = container.querySelectorAll('img');
      const heroImage = Array.from(images).find(img => 
        img.alt === 'Aviation Ground Solutions - Aircraft on tarmac'
      );
      expect(heroImage).toHaveClass('object-cover');
    });

    it('should have tablet breakpoint styling (md: 768px)', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');
      const subheading = container.querySelector('p');
      
      // Verify md: breakpoint classes exist
      expect(heading).toHaveClass('md:text-6xl');
      expect(subheading).toHaveClass('md:text-xl');
    });
  });
});
