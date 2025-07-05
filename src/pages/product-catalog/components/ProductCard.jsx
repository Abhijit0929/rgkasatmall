import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickView, onWishlistToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle?.(product.id, newWishlistState);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="group relative bg-background border border-border rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-100">
        <Link to={`/product-detail?id=${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-surface-200 animate-pulse" />
          )}
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-error text-error-foreground text-xs font-semibold px-2 py-1 rounded-md">
            {discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground text-xs font-semibold px-2 py-1 rounded-md">
            NEW
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-8 h-8 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon
            name="Heart"
            size={16}
            className={`transition-colors duration-200 ${
              isWishlisted 
                ? 'text-error fill-current' :'text-text-muted hover:text-error'
            }`}
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-text-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={handleQuickView}
            className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            iconName="Eye"
            iconSize={16}
          >
            Quick View
          </Button>
        </div>

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-3 left-3 bg-background bg-opacity-90 rounded-md px-2 py-1 flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-secondary fill-current" />
            <span className="text-xs font-medium text-text-primary">
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product-detail?id=${product.id}`}>
          {/* Product Name */}
          <h3 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Product Category */}
          <p className="text-sm text-text-muted mb-2 capitalize">
            {product.category}
          </p>

          {/* Price Section */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Product Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-surface-100 text-text-secondary px-2 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Availability Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                product.inStock ? 'bg-success' : 'bg-error'
              }`} />
              <span className={`text-xs font-medium ${
                product.inStock ? 'text-success' : 'text-error'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Reviews Count */}
            {product.reviewCount && (
              <span className="text-xs text-text-muted">
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="Eye"
            iconSize={14}
            onClick={handleQuickView}
          >
            Quick View
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            iconName="ShoppingCart"
            iconSize={14}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;