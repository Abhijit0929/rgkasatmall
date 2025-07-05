import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ 
  products, 
  loading, 
  hasMore, 
  onLoadMore, 
  onQuickView, 
  onWishlistToggle 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && !loadingMore) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadingMore]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-background border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-surface-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-200 rounded w-3/4" />
        <div className="h-3 bg-surface-200 rounded w-1/2" />
        <div className="h-5 bg-surface-200 rounded w-1/3" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-surface-200 rounded w-1/4" />
          <div className="h-3 bg-surface-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={32} className="text-text-muted" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No products found
      </h3>
      <p className="text-text-muted mb-6 max-w-md">
        We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-smooth"
        >
          <Icon name="RotateCcw" size={16} />
          <span>Reset Filters</span>
        </button>
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface-50 transition-smooth"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Existing Products */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            onWishlistToggle={onWishlistToggle}
          />
        ))}

        {/* Loading Skeletons */}
        {loading && products.length === 0 && (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && <EmptyState />}
      </div>

      {/* Load More Section */}
      {products.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          {/* Infinite Scroll Trigger */}
          <div ref={loadMoreRef} className="h-4" />

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="flex items-center space-x-2 text-text-muted">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} />
              </div>
              <span className="text-sm">Loading more products...</span>
            </div>
          )}

          {/* Manual Load More Button (fallback) */}
          {hasMore && !loadingMore && (
            <button
              onClick={handleLoadMore}
              className="flex items-center space-x-2 px-6 py-3 border border-border text-text-secondary rounded-lg hover:bg-surface-50 hover:text-text-primary transition-smooth"
            >
              <Icon name="Plus" size={16} />
              <span>Load More Products</span>
            </button>
          )}

          {/* End of Results */}
          {!hasMore && products.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-text-muted">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">You've seen all products</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {products.length > 0 && (
        <div className="text-center text-sm text-text-muted py-4 border-t border-border">
          Showing {products.length} products
          {hasMore && ' • Scroll for more'}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;