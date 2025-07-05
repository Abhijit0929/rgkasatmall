import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ currentProductId, category }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock related products data
  const relatedProducts = [
    {
      id: 2,
      name: "Elegant Banarasi Silk Saree",
      brand: "Weavers Pride",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    {
      id: 3,
      name: "Traditional Kanjivaram Saree",
      brand: "South Silk",
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
      inStock: true,
      isNew: true,
      isBestseller: false
    },
    {
      id: 4,
      name: "Designer Georgette Saree",
      brand: "Fashion Studio",
      price: 4999,
      originalPrice: 7999,
      discount: 38,
      rating: 4.3,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop",
      inStock: true,
      isNew: false,
      isBestseller: false
    },
    {
      id: 5,
      name: "Handwoven Cotton Saree",
      brand: "Artisan Craft",
      price: 2999,
      originalPrice: 4499,
      discount: 33,
      rating: 4.4,
      reviewCount: 92,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
      inStock: false,
      isNew: false,
      isBestseller: false
    },
    {
      id: 6,
      name: "Festive Embroidered Saree",
      brand: "Celebration Wear",
      price: 6999,
      originalPrice: 9999,
      discount: 30,
      rating: 4.5,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
      inStock: true,
      isNew: true,
      isBestseller: false
    }
  ].filter(product => product.id !== currentProductId);

  const itemsPerSlide = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const totalSlides = Math.ceil(relatedProducts.length / itemsPerSlide.desktop);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-secondary fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-secondary fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-border" />
      );
    }

    return stars;
  };

  const ProductCard = ({ product }) => (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-medium transition-all group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link to={`/product-detail?id=${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-text-secondary hover:text-error transition-colors mb-2">
            <Icon name="Heart" size={16} />
          </button>
          <button className="w-8 h-8 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Icon name="Eye" size={16} />
          </button>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center">
            <span className="bg-background text-text-primary px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-text-muted">{product.brand}</p>
          <Link 
            to={`/product-detail?id=${product.id}`}
            className="font-medium text-text-primary hover:text-primary transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-text-muted ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <Button
          variant={product.inStock ? "primary" : "outline"}
          size="sm"
          fullWidth
          disabled={!product.inStock}
          iconName={product.inStock ? "ShoppingCart" : "AlertCircle"}
          iconPosition="left"
        >
          {product.inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </div>
    </div>
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">
              You May Also Like
            </h2>
            <p className="text-text-secondary mt-1">
              Similar sarees in {category} category
            </p>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-surface-50 transition-smooth"
              disabled={currentSlide === 0}
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-surface-50 transition-smooth"
              disabled={currentSlide === totalSlides - 1}
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${totalSlides * 100}%`
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {relatedProducts
                    .slice(
                      slideIndex * itemsPerSlide.desktop,
                      (slideIndex + 1) * itemsPerSlide.desktop
                    )
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center justify-center space-x-2 mt-6">
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-surface-50 transition-smooth"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-surface-50 transition-smooth"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            to="/product-catalog"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-600 font-medium transition-colors"
          >
            <span>View All {category} Sarees</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;