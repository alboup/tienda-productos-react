// src/components/layout/Footer.jsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 TiendaProductos. Desarrollado con React & Vite para la Prueba Técnica de Cymit.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Datos proporcionados por la API de DummyJSON
          </p>
        </div>
      </div>
    </footer>
  );
};