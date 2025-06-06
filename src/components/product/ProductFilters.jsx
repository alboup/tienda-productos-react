// src/components/product/ProductFilters.jsx
import React from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useCategories } from '../../hooks/useCategories';
import { SORT_OPTIONS } from '../../utils/constants';
import { formatCategory } from '../../utils/formatters';

export const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onReset,
  className = '' 
}) => {
  const { categories, loading: categoriesLoading } = useCategories();

  const categoryOptions = categories.map(category => ({
    value: category,
    label: formatCategory(category)
  }));

  const sortOptions = SORT_OPTIONS.map(option => ({
    value: `${option.value}-${option.order}`,
    label: option.label
  }));

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split('-');
    onFilterChange({ sortBy, order });
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-end gap-4 ${className}`}>
      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <Select
          label="Categoría"
          value={filters.category}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder={categoriesLoading ? "Cargando..." : "Todas las categorías"}
          disabled={categoriesLoading}
        />
      </div>

      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <Select
          label="Ordenar por"
          value={`${filters.sortBy}-${filters.order}`}
          onChange={handleSortChange}
          options={sortOptions}
        />
      </div>

      <div className="w-full sm:w-auto">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="w-full sm:w-auto sm:mt-6"
        >
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
};