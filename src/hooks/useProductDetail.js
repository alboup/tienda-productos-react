import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Invalid product ID');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const productData = await productService.getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError(err.message || 'Error loading product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const retry = () => {
    if (productId) {
      fetchProduct();
    }
  };

  return {
    product,
    loading,
    error,
    retry,
  };
};