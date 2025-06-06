// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useProductDetail } from '../hooks/useProductDetail';
import { formatPrice, formatRating, formatCategory } from '../utils/formatters';

const ProductImage = ({ src, alt }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [imageError, setImageError] = React.useState(false);
  const images = Array.isArray(src) ? src : [src];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">Imagen no disponible</span>
            </div>
          </div>
        ) : (
          <img
            src={images[currentImage]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && !imageError && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImage 
                  ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800 scale-105' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <img
                src={image}
                alt={`${alt} vista ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, retry } = useProductDetail(id);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Cargando detalles del producto..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Producto no encontrado"
        message={error}
        onRetry={retry}
      />
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back button  */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a Productos</span>
        </Button>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <ProductImage
            src={product.images || product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Basic info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full font-medium">
                {formatCategory(product.category)}
              </span>
              {product.brand && (
                <span className="text-sm text-gray-600 dark:text-gray-400">por {product.brand}</span>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  -{product.discountPercentage.toFixed(0)}% DESC
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {formatRating(product.rating)} ({product.reviews?.length || 0} reseñas)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Descripción</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Stock status */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="font-medium text-gray-900 dark:text-gray-100">Stock disponible:</span>
            <span className={`font-bold px-3 py-1 rounded-full text-sm ${
              product.stock > 0 
                ? product.stock <= 5
                  ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900'
                  : 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900'
                : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900'
            }`}>
              {product.stock > 0 
                ? product.stock <= 5 
                  ? `¡Solo ${product.stock} disponibles!`
                  : `${product.stock} disponibles`
                : 'Agotado'
              }
            </span>
          </div>

          {/* Additional Info */}
          {(product.weight || product.dimensions) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.weight && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Peso</span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.weight}g</div>
                </div>
              )}
              {product.dimensions && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dimensiones</span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};