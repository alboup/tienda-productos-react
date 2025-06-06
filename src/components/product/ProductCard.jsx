// src/components/product/ProductCard.jsx 
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { formatPrice, formatRating, truncateText } from '../../utils/formatters';

// Componente para la imagen con lazy loading
const ProductImage = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 ${className}`}>
      {/* Loading spinner */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-gray-500">Imagen no disponible</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
      
      {/* Overlay gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

// Componente para el rating con estrellas
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    const isFull = i < fullStars;
    const isHalf = i === fullStars && hasHalfStar;
    
    stars.push(
      <div key={i} className="relative">
        <svg
          className={`w-4 h-4 transition-colors duration-200 ${isFull ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {isHalf && (
          <svg
            className="absolute inset-0 w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      {stars}
    </div>
  );
};

// Badge para descuentos
const DiscountBadge = ({ discount }) => {
  if (!discount || discount <= 0) return null;

  return (
    <div className="absolute top-3 right-3 z-10 transform -rotate-12">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
        -{discount.toFixed(0)}%
      </div>
    </div>
  );
};

// Indicador de stock
const StockIndicator = ({ stock }) => {
  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock <= 0;

  return (
    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium z-10 ${
      isOutOfStock 
        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
        : isLowStock
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    }`}>
      {isOutOfStock ? 'Agotado' : isLowStock ? `Solo ${stock}` : `${stock} disponibles`}
    </div>
  );
};

// Componente principal del ProductCard
export const ProductCard = ({ product, onClick, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(product.id);
    }
  };

  return (
    <div 
      className="animate-slideUp transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="group focus:ring-2 focus:ring-blue-500 focus:outline-none overflow-hidden cursor-pointer glass border-0 shadow-glass hover:shadow-colored-lg transition-all duration-500"
        onClick={handleClick}
      >
        {/* Imagen con badges */}
        <div className="relative">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            className="aspect-square"
          />
          
          <DiscountBadge discount={product.discountPercentage} />
          <StockIndicator stock={product.stock} />
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-4">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {product.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {truncateText(product.description, 100)}
            </p>
          </div>

          {/* Precio y Rating */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price * (1 + product.discountPercentage / 100))}
                </div>
              )}
            </div>
            
            <div className="text-right space-y-1">
              <StarRating rating={product.rating} />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatRating(product.rating)}
              </div>
            </div>
          </div>

          {/* REMOVIDO: Categoría eliminada completamente */}

          {/* Botón de acción (aparece en hover) */}
          <button
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-medium shadow-lg transition-all duration-300 transform ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Ver Detalles</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Efecto de brillo en hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transition-all duration-600 ${
            isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
          }`}
        />
      </Card>
    </div>
  );
};