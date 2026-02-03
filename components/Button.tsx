
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'navbar';
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '', style }) => {
  const baseClasses = "px-6 py-3 rounded-full transition-colors duration-300 inline-block text-center";
  const primaryClasses = "bg-button-bg hover:bg-button-bg-hover text-text-active";
  const secondaryClasses = "border-2 hover:bg-button-bg text-text-active";
  const navbarClasses = "text-bg hover:opacity-90" + " " + "bg-[#0E5F63]";

  const buttonClasses = `${baseClasses} ${
    variant === 'primary' ? primaryClasses :
    variant === 'navbar' ? navbarClasses :
    secondaryClasses
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} style={style}>
      {children}
    </button>
  );
};

export default Button;
