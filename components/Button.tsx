
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '' }) => {
  const baseClasses = "px-6 py-3 rounded-full transition-colors duration-300 inline-block text-center";
  const primaryClasses = "bg-button-bg hover:bg-button-bg-hover text-text-active";
  const secondaryClasses = "border border-line hover:bg-button-bg text-text-active";
  
  const buttonClasses = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
