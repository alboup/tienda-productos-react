// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};