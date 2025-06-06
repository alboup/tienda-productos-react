// src/components/product/ProductSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export const ProductSearch = ({
  value = '',
  onChange,
  placeholder = 'Buscar productos...',
  disabled = false,
  suggestions = []
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const debouncedValue = useDebounce(value, 150);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (onChange) {
      onChange(suggestion);
    }
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    setShowSuggestions(
      isFocused &&
      debouncedValue.length > 0 &&
      suggestions.length > 0
    );
  }, [isFocused, debouncedValue, suggestions]);

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        {/* Icono de búsqueda */}
        <div
          className={`
            absolute inset-y-0 left-0 pl-3 flex items-center 
            transition-colors duration-300
            ${isFocused ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input mejorado */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => setIsFocused(false), 200)
          }
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-10 pr-10 py-2.5 rounded-lg border-2 shadow-sm transition-all duration-300
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            placeholder-gray-700 dark:placeholder-gray-400
            ${isFocused
              ? 'border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800'
              : 'border-gray-300 dark:border-gray-600'}
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />

        {/* Botón para borrar texto */}
        {value && (
          <button
            onClick={() => onChange('')}
            className={`
              absolute inset-y-0 right-0 pr-3 flex items-center 
              transition-colors duration-200
              text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
            `}
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown de sugerencias */}
      {showSuggestions && (
        <div
          className={`
            absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-600 
            shadow-lg rounded-lg z-50 overflow-hidden animate-fadeIn
          `}
        >
          {suggestions.slice(0, 5).map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-3 text-left text-base 
                text-gray-800 dark:text-gray-100
                hover:bg-gray-100 dark:hover:bg-gray-700/50
                transition-colors duration-200
                border-b border-gray-100 dark:border-gray-700
                last:border-b-0
              `}
              type="button"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
