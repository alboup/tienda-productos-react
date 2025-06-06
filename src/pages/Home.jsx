// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { ProductSearch } from "../components/product/ProductSearch";
import { ProductFilters } from "../components/product/ProductFilters";
import { Pagination } from "../components/product/Pagination";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

const MetricCard = ({ icon, value, label, delay = 0 }) => {
  return (
    <div
      className="glass rounded-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-lg animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const { categories } = useCategories();

  const {
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
    retry,
  } = useProducts();

  // Generate search suggestions based on products
  useEffect(() => {
    if (products.length > 0) {
      const suggestions = products
        .map((p) => p.title)
        .filter((title) =>
          title.toLowerCase().includes(filters.search.toLowerCase())
        )
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    }
  }, [products, filters.search]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div
            className="absolute inset-0 opacity-30 animate-pulse"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="animate-fadeIn">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Descubre{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Productos
                </span>
                <br />
                Increíbles
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Explora nuestra extensa colección de productos de alta calidad
                de varias categorías. Encuentra exactamente lo que buscas con
                filtros inteligentes y búsqueda instantánea.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <MetricCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.82 14l.93-2h7.53c.75 0 1.41-.41 1.75-1.03l3.58-6.49L19.24 3H5.21L4.27 1H1v2h2l3.6 7.59-1.35 2.44C4.52 14.37 5 15.28 5.83 15.28H19v-2H7.82z" />
                  </svg>
                }
                value="100+"
                label="Productos Disponibles"
                delay={0}
              />
              <MetricCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L10.91 8.26L12 2Z" />
                  </svg>
                }
                value="4.5+"
                label="Valoración Promedio"
                delay={100}
              />
              <MetricCard
                icon={
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 20H5V9H19V20Z" />
                  </svg>
                }
                value={categories.length}
                label="Categorías"
                delay={200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="space-y-6 animate-slideUp">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <ProductSearch
                value={filters.search}
                onChange={setSearch}
                placeholder="Buscar productos increíbles..."
                suggestions={searchSuggestions}
              />

              {/* Results count */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {!loading && !error && (
                  <span className="flex items-center space-x-2">
                    <span>
                      Mostrando{" "}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {pagination.total}
                      </span>{" "}
                      productos
                      {filters.search && ` para "${filters.search}"`}
                      {filters.category && ` en "${filters.category}"`}
                    </span>
                    {(filters.search || filters.category) && (
                      <button
                        onClick={handleReset}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-2 transition-colors hover:scale-105 transform"
                      >
                        Limpiar todo
                      </button>
                    )}
                  </span>
                )}
              </div>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onProductClick={handleProductClick}
            onRetry={retry}
          />

          {/* Pagination */}
          {!loading && !error && products.length > 0 && (
            <div className="animate-fadeIn">
              <Pagination
                currentPage={filters.page}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
