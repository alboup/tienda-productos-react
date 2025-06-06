import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Error loading categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};