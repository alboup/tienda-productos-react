// src/components/product/Pagination.jsx
import React, { useState } from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const [jumpPage, setJumpPage] = useState('');

  // Genera un rango de páginas (máximo 7 botones)
  const generatePageNumbers = () => {
    const visibleCount = 7;
    let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let end = Math.min(totalPages, start + visibleCount - 1);
    if (end - start + 1 < visibleCount) {
      start = Math.max(1, end - visibleCount + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return { pages, start, end };
  };

  const { pages, start, end } = generatePageNumbers();

  // Función que, si el valor es un número válido, llama a onPageChange
  const tryJumpTo = () => {
    const num = parseInt(jumpPage, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPages && num !== currentPage) {
      onPageChange(num);
    }
    setJumpPage('');
  };

  // Cuando se pulsa Enter dentro del input
  const handleJumpKey = (e) => {
    if (e.key === 'Enter') {
      tryJumpTo();
    }
  };

  return (
    <nav
      aria-label="Paginación"
      className={`flex flex-col items-center space-y-3 ${className}`}
    >
      <div className="flex items-center space-x-2">
        {/* « Primero */}
        <button
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage}
          className={`
            flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-colors
            ${hasPrevPage
              ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
          `}
          aria-label="Ir a la primera página"
        >
          <span className="text-lg">«</span>
          <span>Primero</span>
        </button>

        {/* ‹ Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`
            flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-colors
            ${hasPrevPage
              ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
          `}
          aria-label="Página anterior"
        >
          <span className="text-lg">‹</span>
          <span>Anterior</span>
        </button>

        {/* Si hay salto al inicio (… antes) */}
        {start > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="
                px-3 py-2 rounded-full text-base font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
              "
            >
              1
            </button>
            {start > 2 && (
              <span className="px-2 text-gray-500 dark:text-gray-400 select-none">…</span>
            )}
          </>
        )}

        {/* Botones de página */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-4 py-2 rounded-full text-base font-medium transition-colors 
              ${page === currentPage
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
            `}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Página ${page}`}
          >
            {page}
          </button>
        ))}

        {/* Si hay salto al final (… después) */}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="px-2 text-gray-500 dark:text-gray-400 select-none">…</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="
                px-3 py-2 rounded-full text-base font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
              "
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Siguiente › */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`
            flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-colors
            ${hasNextPage
              ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
          `}
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <span className="text-lg">›</span>
        </button>

        {/* Último » */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
          className={`
            flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-colors
            ${hasNextPage
              ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
          `}
          aria-label="Ir a la última página"
        >
          <span>Último</span>
          <span className="text-lg">»</span>
        </button>
      </div>

      {/* Indicador “Página X de Y” y salto mediante input */}
      <div className="flex items-center space-x-3">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">
          Página <span className="font-bold text-blue-600 dark:text-blue-400">{currentPage}</span> de <span className="font-bold">{totalPages}</span>
        </span>

        <div className="flex items-center space-x-1">
          <label htmlFor="jump-page" className="text-sm text-gray-600 dark:text-gray-400">
            Ir a:
          </label>
          <input
            id="jump-page"
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJumpKey}
            onBlur={tryJumpTo}
            placeholder="N°"
            className="
              w-16 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>
      </div>
    </nav>
  );
};
