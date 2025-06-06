// src/utils/formatters.js

export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatRating = (rating) => {
  return Number(rating).toFixed(1);
};

/**
 * Convierte una cadena con guiones a Title Case.
 * Si el valor proporcionado no es una cadena, devuelve cadena vacía.
 */
export const formatCategory = (category) => {
  if (typeof category !== 'string') {
    return '';
  }

  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
