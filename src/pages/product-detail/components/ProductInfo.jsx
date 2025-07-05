import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart({
      productId: product.id,
      size: selectedSize,
      quantity: quantity
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-secondary fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-secondary fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-border" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary">
            {product.name}
          </h1>
          <button
            onClick={handleWishlistToggle}
            className="p-2 rounded-full hover:bg-surface-100 transition-smooth"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Icon 
              name="Heart" 
              size={24} 
              className={`transition-colors ${
                isWishlisted ? 'text-error fill-current' : 'text-text-muted hover:text-error'
              }`} 
            />
          </button>
        </div>
        <p className="text-text-secondary font-medium">{product.brand}</p>
        <p className="text-sm text-text-muted">{product.category}</p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-sm font-medium text-text-primary ml-2">
            {product.rating}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-text-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-sm font-medium">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary">
          Inclusive of all taxes • Free shipping above ₹999
        </p>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product.inStock ? "CheckCircle" : "XCircle"} 
          size={20} 
          className={product.inStock ? "text-success" : "text-error"} 
        />
        <span className={`font-medium ${
          product.inStock ? "text-success" : "text-error"
        }`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product.inStock && product.stockCount <= 5 && (
          <span className="text-warning text-sm">
            Only {product.stockCount} left!
          </span>
        )}
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">
            Size
          </label>
          <button className="text-sm text-primary hover:underline">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              disabled={!size.available}
              className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                selectedSize === size.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : size.available
                  ? 'border-border hover:border-primary hover:bg-surface-50' :'border-border bg-surface-100 text-text-disabled cursor-not-allowed'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="Minus" size={16} />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.maxQuantity}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="Plus" size={16} />
          </button>
          <span className="text-sm text-text-muted">
            Max {product.maxQuantity} per order
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={handleAddToCart}
          disabled={!product.inStock}
          iconName="ShoppingCart"
          iconPosition="left"
          className="h-12"
        >
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={() => window.location.href = '/checkout-process'}
          disabled={!product.inStock || !selectedSize}
          iconName="Zap"
          iconPosition="left"
          className="h-12"
        >
          Buy Now
        </Button>
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <h3 className="font-medium text-text-primary">Key Features</h3>
        <div className="grid grid-cols-1 gap-2">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Sharing */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Share</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-surface-100 transition-smooth">
              <Icon name="Facebook" size={18} className="text-text-muted" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-100 transition-smooth">
              <Icon name="Twitter" size={18} className="text-text-muted" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-100 transition-smooth">
              <Icon name="Instagram" size={18} className="text-text-muted" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-100 transition-smooth">
              <Icon name="Share2" size={18} className="text-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;