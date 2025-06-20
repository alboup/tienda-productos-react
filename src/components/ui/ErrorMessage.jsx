import React from 'react';
import { Button } from './Button';

export const ErrorMessage = ({ 
  title = 'Algo salió mal',
  message = 'Por favor, inténtalo de nuevo más tarde',
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 text-red-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline">
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
};