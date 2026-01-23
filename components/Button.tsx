'use client';

import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  // Base styles that apply to all buttons
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'bg-brand-blue text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-brand-blue hover:shadow-lg hover:scale-105',
    secondary: 'bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white active:bg-blue-700 focus:ring-brand-blue hover:shadow-lg hover:scale-105',
    outline: 'bg-transparent text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white active:bg-blue-700 focus:ring-brand-blue hover:shadow-lg hover:scale-105',
    glass: 'bg-white/10 backdrop-blur-2xl text-white border-2 border-white/40 hover:bg-white/20 hover:border-white/60 active:bg-white/30 focus:ring-white/50 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] hover:scale-105',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
