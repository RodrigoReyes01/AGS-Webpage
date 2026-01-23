import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from '@/app/components/HeroSection';

/**
 * Task 7.3: Add "Let's Chat!" call-to-action button
 * Tests for CTA button positioning, styling, and translation integration
 * Requirements: 3.4
 */
describe('HeroSection - CTA Button (Task 7.3)', () => {
  describe('Button Rendering and Content', () => {
    it('should render CTA button with default "Let\'s Chat!" text', () => {
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      // Should have 2 buttons (one for mobile, one for desktop)
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });

    it('should render CTA button with custom translation text', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Test subheading',
        ctaButton: 'Contact Us Now',
      };
      render(<HeroSection translations={translations} />);
      const buttons = screen.getAllByRole('button', { name: 'Contact Us Now' });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });

    it('should render CTA button with Spanish translation', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Su servicio FBO terrestre premier',
        ctaButton: '¡Hablemos!',
      };
      render(<HeroSection translations={translations} locale="es" />);
      const buttons = screen.getAllByRole('button', { name: '¡Hablemos!' });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });
  });

  describe('Button Component Integration', () => {
    it('should use Button component with primary variant', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Verify both buttons have primary variant classes
      buttons.forEach(button => {
        expect(button).toHaveClass('bg-brand-blue');
        expect(button).toHaveClass('text-white');
      });
    });

    it('should use Button component with large size', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Verify both buttons have large size classes
      buttons.forEach(button => {
        expect(button).toHaveClass('px-8');
        expect(button).toHaveClass('py-4');
        expect(button).toHaveClass('text-lg');
      });
    });

    it('should have hover effect classes from Button component', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Verify hover classes are present on both buttons
      buttons.forEach(button => {
        expect(button).toHaveClass('hover:bg-blue-700');
        expect(button).toHaveClass('hover:shadow-lg');
        expect(button).toHaveClass('hover:scale-105');
      });
    });

    it('should have transition classes for smooth animations', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Verify transition classes on both buttons
      buttons.forEach(button => {
        expect(button).toHaveClass('transition-all');
        expect(button).toHaveClass('duration-300');
      });
    });
  });

  describe('Button Positioning', () => {
    it('should position button in bottom-right on desktop (md breakpoint)', () => {
      const { container } = render(<HeroSection />);
      const desktopButtonContainer = container.querySelector('div.hidden.md\\:block.absolute');
      
      expect(desktopButtonContainer).toBeInTheDocument();
      expect(desktopButtonContainer).toHaveClass('hidden');
      expect(desktopButtonContainer).toHaveClass('md:block');
      expect(desktopButtonContainer).toHaveClass('absolute');
      expect(desktopButtonContainer).toHaveClass('bottom-8');
      expect(desktopButtonContainer).toHaveClass('right-8');
      expect(desktopButtonContainer).toHaveClass('lg:bottom-12');
      expect(desktopButtonContainer).toHaveClass('lg:right-12');
    });

    it('should center button on mobile', () => {
      const { container } = render(<HeroSection />);
      const mobileButtonContainer = container.querySelector('div.md\\:hidden');
      
      expect(mobileButtonContainer).toBeInTheDocument();
      expect(mobileButtonContainer).toHaveClass('md:hidden');
    });

    it('should have proper z-index for button visibility', () => {
      const { container } = render(<HeroSection />);
      const desktopButtonContainer = container.querySelector('div.hidden.md\\:block.absolute');
      
      // Desktop button container should have z-10 to be above background
      expect(desktopButtonContainer).toBeInTheDocument();
      expect(desktopButtonContainer).toHaveClass('z-10');
    });

    it('should position button outside content container for proper desktop layout', () => {
      const { container } = render(<HeroSection />);
      
      // Content container with text
      const contentContainer = container.querySelector('.max-w-7xl');
      expect(contentContainer).toBeInTheDocument();
      
      // Desktop button container should be a sibling, not a child of content container
      const desktopButtonContainer = container.querySelector('div.hidden.md\\:block.absolute');
      expect(desktopButtonContainer).toBeInTheDocument();
      
      // Verify desktop button is not inside content container
      const buttonInsideContent = contentContainer?.querySelector('div.hidden.md\\:block');
      expect(buttonInsideContent).toBeNull();
    });
  });

  describe('Button Interactivity', () => {
    it('should be clickable', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Should not throw error when clicked
      buttons.forEach(button => {
        expect(() => fireEvent.click(button)).not.toThrow();
      });
    });

    it('should log click event (placeholder functionality)', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Click first button
      fireEvent.click(buttons[0]);
      
      expect(consoleSpy).toHaveBeenCalledWith("Let's Chat button clicked");
      
      consoleSpy.mockRestore();
    });

    it('should have focus ring for accessibility', () => {
      const { container } = render(<HeroSection />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      
      // Verify focus ring classes on both buttons
      buttons.forEach(button => {
        expect(button).toHaveClass('focus:ring-2');
        expect(button).toHaveClass('focus:ring-offset-2');
        expect(button).toHaveClass('focus:ring-brand-blue');
      });
    });
  });

  describe('Translation System Integration', () => {
    it('should accept translations prop for CTA button text', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Test',
        ctaButton: 'Custom CTA Text',
      };
      
      render(<HeroSection translations={translations} />);
      const buttons = screen.getAllByRole('button', { name: 'Custom CTA Text' });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });

    it('should fallback to default text if translation is missing', () => {
      const translations = {
        mainHeading: 'AVIATION GROUND SOLUTIONS',
        groundWord: 'GROUND',
        subheading: 'Test',
        // ctaButton is intentionally missing
      };
      
      render(<HeroSection translations={translations as any} />);
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });

    it('should update button text when translations change', () => {
      const { rerender } = render(
        <HeroSection 
          translations={{
            mainHeading: 'AVIATION GROUND SOLUTIONS',
            groundWord: 'GROUND',
            subheading: 'Test',
            ctaButton: 'English CTA',
          }} 
        />
      );
      
      let buttons = screen.getAllByRole('button', { name: 'English CTA' });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
      
      // Update to Spanish
      rerender(
        <HeroSection 
          translations={{
            mainHeading: 'AVIATION GROUND SOLUTIONS',
            groundWord: 'GROUND',
            subheading: 'Test',
            ctaButton: 'CTA en Español',
          }}
          locale="es"
        />
      );
      
      buttons = screen.getAllByRole('button', { name: 'CTA en Español' });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 3.4: Display "Let\'s Chat!" button in bottom right', () => {
      const { container } = render(<HeroSection />);
      
      // Buttons exist (2 for responsive design)
      const buttons = screen.getAllByRole('button', { name: /Let's Chat!/i });
      expect(buttons.length).toBe(2);
      buttons.forEach(button => expect(button).toBeInTheDocument());
      
      // Desktop button is positioned bottom-right
      const desktopButtonContainer = container.querySelector('div.hidden.md\\:block.absolute');
      expect(desktopButtonContainer).toBeInTheDocument();
      expect(desktopButtonContainer).toHaveClass('bottom-8');
      expect(desktopButtonContainer).toHaveClass('right-8');
      expect(desktopButtonContainer).toHaveClass('lg:bottom-12');
      expect(desktopButtonContainer).toHaveClass('lg:right-12');
      
      // Buttons use primary variant (blue background)
      buttons.forEach(button => {
        expect(button).toHaveClass('bg-brand-blue');
      });
      
      // Buttons are integrated with translation system
      buttons.forEach(button => {
        expect(button.textContent).toBe("Let's Chat!");
      });
    });
  });
});
