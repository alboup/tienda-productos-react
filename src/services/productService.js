// src/services/productService.js
import api from './api';

export const productService = {
  async getProducts({
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'title',
    order = 'asc'
  } = {}) {
    try {
      const skip = (page - 1) * limit;
      const params = new URLSearchParams();
      
      params.append('limit', limit);
      params.append('skip', skip);
      
      if (sortBy) {
        params.append('sortBy', sortBy);
        params.append('order', order);
      }

      let endpoint = '/products';
      
      // Priorizar búsqueda sobre categoría
      if (search?.trim()) {
        endpoint = '/products/search';
        params.append('q', search.trim());
      } else if (category?.trim()) {
        endpoint = `/products/category/${encodeURIComponent(category)}`;
      }

      const response = await api.get(`${endpoint}?${params.toString()}`);
      
      // Verificar estructura de respuesta
      const products = response.data.products || [];
      const total = response.data.total || 0;
      
      return {
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPrevPage: page > 1,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(`Error al cargar productos: ${error.message}`);
    }
  },

  async getProductById(id) {
    try {
      if (!id) throw new Error('Se requiere ID del producto');
      
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Producto no encontrado');
      }
      console.error('Error fetching product:', error);
      throw new Error(`Error al cargar producto: ${error.message}`);
    }
  },

  
  async getCategories() {
    try {
      // Usar category-list que devuelve un array simple de strings
      const response = await api.get('/products/category-list');
      const categories = response.data || [];
      
      //console.log('Categories API response:', categories);
      
      // Verificar que sea un array
      if (!Array.isArray(categories)) {
        console.warn('Categories response is not an array:', categories);
        return [];
      }
      
      // Filtrar categorías válidas (ya son strings)
      const validCategories = categories.filter(cat => 
        typeof cat === 'string' && cat.trim().length > 0
      );
      
      //console.log('Valid categories loaded:', validCategories.length, validCategories);
      return validCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // En caso de error, devolver array vacío en lugar de fallar
      return [];
    }
  },

  // Método alternativo usando el endpoint con objetos (por si lo necesitas)
  async getCategoriesWithDetails() {
    try {
      const response = await api.get('/products/categories');
      const categoriesData = response.data || [];
      
      if (!Array.isArray(categoriesData)) {
        console.warn('Categories with details response is not an array:', categoriesData);
        return [];
      }
      
      // Extraer solo los slugs para usar en filtros
      const categories = categoriesData.map(cat => cat.slug || cat.name).filter(Boolean);
      
      console.log('Categories with details loaded:', categories.length, categories);
      return {
        categories,
        categoriesData 
      };
    } catch (error) {
      console.error('Error fetching categories with details:', error);
      return {
        categories: [],
        categoriesData: []
      };
    }
  }
};