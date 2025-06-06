// src/components/ui/Select.jsx
import React, { forwardRef } from 'react';

export const Select = forwardRef(({ 
  label,
  error,
  options = [],
  placeholder = 'Selecciona una opción',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 
          shadow-sm bg-white dark:bg-gray-800
          focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400
          disabled:bg-gray-50 dark:disabled:bg-gray-700 
          disabled:text-gray-500 dark:disabled:text-gray-400
          text-gray-900 dark:text-gray-100
          px-3 py-2.5 text-sm sm:text-base
          transition-all duration-200
          appearance-none cursor-pointer
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={`${option.value}-${idx}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';