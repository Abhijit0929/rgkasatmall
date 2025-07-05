import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';
import SortDropdown from './components/SortDropdown';
import FilterChips from './components/FilterChips';
import QuickViewModal from './components/QuickViewModal';

import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    fabric: [],
    color: [],
    occasion: []
  });
  const [currentSort, setCurrentSort] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Elegant Banarasi Silk Saree with Golden Border",
      category: "banarasi",
      price: 15999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      inStock: true,
      isNew: true,
      rating: 4.8,
      reviewCount: 156,
      features: ["Pure Silk", "Handwoven", "Traditional Design"],
      description: "Exquisite Banarasi silk saree featuring intricate golden zari work and traditional motifs."
    },
    {
      id: 2,
      name: "Traditional Kanjivaram Silk Saree",
      category: "kanjivaram",
      price: 12499,
      originalPrice: 16999,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
      inStock: true,
      isNew: false,
      rating: 4.7,
      reviewCount: 89,
      features: ["Pure Silk", "Temple Border", "Rich Colors"],
      description: "Authentic Kanjivaram saree with temple border and rich color combinations."
    },
    {
      id: 3,
      name: "Designer Georgette Saree with Embroidery",
      category: "designer",
      price: 8999,
      originalPrice: 12999,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop",
      inStock: true,
      isNew: true,
      rating: 4.6,
      reviewCount: 234,
      features: ["Georgette Fabric", "Embroidered", "Party Wear"],
      description: "Contemporary designer saree perfect for parties and special occasions."
    },
    {
      id: 4,
      name: "Cotton Handloom Saree with Block Print",
      category: "cotton",
      price: 3499,
      originalPrice: 4999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      inStock: true,
      isNew: false,
      rating: 4.5,
      reviewCount: 167,
      features: ["Pure Cotton", "Block Print", "Eco-Friendly"],
      description: "Comfortable cotton saree with traditional block print designs."
    },
    {
      id: 5,
      name: "Chiffon Saree with Sequin Work",
      category: "chiffon",
      price: 6999,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
      inStock: false,
      isNew: false,
      rating: 4.4,
      reviewCount: 98,
      features: ["Chiffon Fabric", "Sequin Work", "Lightweight"],
      description: "Elegant chiffon saree with beautiful sequin embellishments."
    },
    {
      id: 6,
      name: "Art Silk Saree with Digital Print",
      category: "silk",
      price: 4999,
      originalPrice: 7999,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop",
      inStock: true,
      isNew: true,
      rating: 4.3,
      reviewCount: 145,
      features: ["Art Silk", "Digital Print", "Modern Design"],
      description: "Modern art silk saree with vibrant digital print patterns."
    },
    {
      id: 7,
      name: "Handwoven Cotton Silk Saree",
      category: "cotton",
      price: 7499,
      originalPrice: 10999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      inStock: true,
      isNew: false,
      rating: 4.7,
      reviewCount: 123,
      features: ["Cotton Silk", "Handwoven", "Natural Dyes"],
      description: "Handwoven cotton silk saree with natural dye colors."
    },
    {
      id: 8,
      name: "Georgette Saree with Floral Embroidery",
      category: "georgette",
      price: 9999,
      originalPrice: 13999,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
      inStock: true,
      isNew: true,
      rating: 4.6,
      reviewCount: 178,
      features: ["Georgette", "Floral Embroidery", "Elegant"],
      description: "Beautiful georgette saree with intricate floral embroidery work."
    }
  ];

  // Initialize component
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search') || '';
    const category = urlParams.get('category') || '';
    
    setSearchQuery(search);
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        category: [category]
      }));
    }

    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (filters.category.length > 0) {
      filtered = filtered.filter(product =>
        filters.category.includes(product.category)
      );
    }

    // Apply price filters
    if (filters.price.length > 0) {
      filtered = filtered.filter(product => {
        return filters.price.some(priceRange => {
          const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
          return product.price >= min && (max === undefined || product.price <= max);
        });
      });
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, currentSort, searchQuery]);

  // Event handlers
  const handleFilterChange = (category, values) => {
    setFilters(prev => ({
      ...prev,
      [category]: values
    }));
  };

  const handleRemoveFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      price: [],
      fabric: [],
      color: [],
      occasion: []
    });
  };

  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
  };

  const handleLoadMore = async () => {
    // Simulate loading more products
    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        // For demo, we'll just set hasMore to false after first load
        setHasMore(false);
        resolve();
      }, 1000);
    });
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (productId, isWishlisted) => {
    // Handle wishlist toggle logic
    console.log(`Product ${productId} wishlist status: ${isWishlisted}`);
  };

  const handleAddToCart = (productData) => {
    // Handle add to cart logic
    console.log('Adding to cart:', productData);
    
    // Update cart count in localStorage
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    const newCount = currentCount + productData.quantity;
    localStorage.setItem('cartCount', newCount.toString());
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: newCount }
    }));
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((total, filterArray) => {
      return total + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-header-mobile lg:pt-header-desktop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  Saree Collection
                </h1>
                <p className="text-text-secondary mt-1">
                  Discover our premium collection of traditional and contemporary sarees
                </p>
              </div>
              
              {/* Results Count */}
              <div className="text-sm text-text-muted">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <FilterChips
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            {!isMobile && (
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
                isMobile={false}
              />
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-surface-50 p-4 rounded-lg">
                {/* Mobile Filter Button */}
                {isMobile && (
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterPanelOpen(true)}
                    iconName="Filter"
                    iconSize={16}
                    className="relative"
                  >
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </Button>
                )}

                {/* Sort Dropdown */}
                <div className="ml-auto">
                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onQuickView={handleQuickView}
                onWishlistToggle={handleWishlistToggle}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isMobile && (
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            isMobile={true}
          />
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
};

export default ProductCatalog;