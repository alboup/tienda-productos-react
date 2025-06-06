import React from 'react';

export const Loading = ({ size = 'md', text = 'Cargando...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin ${sizes[size]}`}></div>
      {text && <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{text}</p>}
    </div>
  );
};