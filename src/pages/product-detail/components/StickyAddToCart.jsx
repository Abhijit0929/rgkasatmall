import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StickyAddToCart = ({ product, selectedSize, quantity, onAddToCart, onBuyNow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show sticky bar when user scrolls past the main product info
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setIsExpanded(true);
      return;
    }
    onAddToCart();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setIsExpanded(true);
      return;
    }
    onBuyNow();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-strong z-50 lg:hidden">
      {/* Expanded Size Selection */}
      {isExpanded && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-text-primary">Select Size</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-text-muted hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => {
                  // This would typically call a parent function to update selectedSize
                  setIsExpanded(false);
                }}
                disabled={!size.available}
                className={`p-2 border rounded-lg text-sm font-medium transition-all ${
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
      )}

      {/* Main Sticky Bar */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-primary text-lg">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-text-muted line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              {selectedSize ? (
                <span className="text-sm text-text-secondary">
                  Size: {selectedSize} • Qty: {quantity}
                </span>
              ) : (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Select Size
                </button>
              )}
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={product.inStock ? "CheckCircle" : "XCircle"} 
                  size={14} 
                  className={product.inStock ? "text-success" : "text-error"} 
                />
                <span className={`text-xs ${
                  product.inStock ? "text-success" : "text-error"
                }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              iconName="ShoppingCart"
              className="px-3"
            >
              Add
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleBuyNow}
              disabled={!product.inStock}
              iconName="Zap"
              className="px-4"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        {!selectedSize && (
          <div className="mt-3 flex items-center space-x-2 text-xs text-text-muted">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-border rounded-full"></div>
              <div className="w-2 h-2 bg-border rounded-full"></div>
            </div>
            <span>Step 1 of 3: Select size</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyAddToCart;