// src/utils/constants.js
export const PRODUCT_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  DEBOUNCE_DELAY: 300,
};

export const SORT_OPTIONS = [
  { value: 'title', label: 'Nombre A-Z', order: 'asc' },
  { value: 'title', label: 'Nombre Z-A', order: 'desc' },
  { value: 'price', label: 'Precio Menor-Mayor', order: 'asc' },
  { value: 'price', label: 'Precio Mayor-Menor', order: 'desc' },
  { value: 'rating', label: 'Mejor Valorados', order: 'desc' },
];