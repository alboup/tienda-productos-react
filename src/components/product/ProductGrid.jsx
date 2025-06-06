import React, { memo } from 'react';
import { ProductCard } from './ProductCard';
import { Loading } from '../ui/Loading';
import { ErrorMessage } from '../ui/ErrorMessage';

export const ProductGrid = memo(({ 
  products = [], 
  loading = false, 
  error = null, 
  onProductClick,
  onRetry 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Cargando productos..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error al cargar productos"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No se encontraron productos</h3>
        <p className="text-gray-600 dark:text-gray-400">Prueba ajustando tu búsqueda o criterios de filtro</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          index={index}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';