import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { useDebounce } from './useDebounce';
import { PRODUCT_CONSTANTS } from '../utils/constants';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: 'title',
    order: 'asc',
    page: 1,
    limit: PRODUCT_CONSTANTS.DEFAULT_PAGE_SIZE,
    ...initialFilters,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const debouncedSearch = useDebounce(filters.search, PRODUCT_CONSTANTS.DEBOUNCE_DELAY);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await productService.getProducts({
        ...filters,
        search: debouncedSearch,
      });

      setProducts(result.products);
      setPagination({
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      });
    } catch (err) {
      setError(err.message || 'Error loading products');
      setProducts([]);
      setPagination({
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  }, []);

  const setSearch = useCallback((search) => {
    updateFilters({ search, page: 1 });
  }, [updateFilters]);

  const setCategory = useCallback((category) => {
    updateFilters({ category, page: 1 });
  }, [updateFilters]);

  const setSorting = useCallback((sortBy, order = 'asc') => {
    updateFilters({ sortBy, order, page: 1 });
  }, [updateFilters]);

  const setPage = useCallback((page) => {
    updateFilters({ page });
  }, [updateFilters]);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'title',
      order: 'asc',
      page: 1,
      limit: PRODUCT_CONSTANTS.DEFAULT_PAGE_SIZE,
    });
  }, []);

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    setSearch,
    setCategory,
    setSorting,
    setPage,
    updateFilters,
    resetFilters,
    retry: fetchProducts,
  };
};