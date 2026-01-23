import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-brand-blue'); // primary variant
    expect(button).toHaveClass('px-6'); // md size
  });

  it('should render with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('bg-brand-blue');
    expect(button).toHaveClass('text-white');
  });

  it('should render with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-brand-blue');
    expect(button).toHaveClass('border-2');
  });

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('text-brand-blue');
    expect(button).toHaveClass('border-2');
  });

  it('should render with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('text-sm');
  });

  it('should render with medium size', () => {
    render(<Button size="md">Medium Button</Button>);
    const button = screen.getByRole('button', { name: /medium button/i });
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('text-base');
  });

  it('should render with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('px-8');
    expect(button).toHaveClass('py-4');
    expect(button).toHaveClass('text-lg');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have transition classes for smooth state changes', () => {
    render(<Button>Transition Button</Button>);
    const button = screen.getByRole('button', { name: /transition button/i });
    expect(button).toHaveClass('transition-all');
    expect(button).toHaveClass('duration-300');
    expect(button).toHaveClass('ease-in-out');
  });

  it('should have hover state classes', () => {
    render(<Button variant="primary">Hover Button</Button>);
    const button = screen.getByRole('button', { name: /hover button/i });
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).toHaveClass('hover:shadow-lg');
    expect(button).toHaveClass('hover:scale-105');
  });

  it('should have active state classes', () => {
    render(<Button variant="primary">Active Button</Button>);
    const button = screen.getByRole('button', { name: /active button/i });
    expect(button).toHaveClass('active:bg-blue-800');
  });

  it('should have focus ring classes', () => {
    render(<Button>Focus Button</Button>);
    const button = screen.getByRole('button', { name: /focus button/i });
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
    expect(button).toHaveClass('focus:ring-offset-2');
  });

  it('should support different button types', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    let button = screen.getByRole('button', { name: /button/i });
    expect(button).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Submit</Button>);
    button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    button = screen.getByRole('button', { name: /reset/i });
    expect(button).toHaveAttribute('type', 'reset');
  });
});
