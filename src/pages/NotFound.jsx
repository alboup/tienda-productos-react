import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="text-center py-16 animate-fadeIn">
      <div className="w-24 h-24 mx-auto mb-8 text-gray-400 dark:text-gray-500 animate-bounce">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.468-.787-6.172-2.109a8.001 8.001 0 0111.344 0z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404 - Página No Encontrada</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        La página que buscas no existe.
      </p>
      <Link to="/">
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300">
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};