import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onQuantityChange, onRemove, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      await onQuantityChange(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item.id);
  };

  return (
    <div className="bg-surface-50 rounded-lg p-4 border border-border">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product-detail?id=${item.id}`} className="block">
            <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-surface-100">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <Link 
                to={`/product-detail?id=${item.id}`}
                className="text-text-primary hover:text-primary transition-smooth"
              >
                <h3 className="font-medium text-base line-clamp-2">{item.name}</h3>
              </Link>
              
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-text-secondary">
                <span>Size: {item.size}</span>
                <span>•</span>
                <span>Color: {item.color}</span>
                {item.fabric && (
                  <>
                    <span>•</span>
                    <span>Fabric: {item.fabric}</span>
                  </>
                )}
              </div>

              {item.originalPrice > item.price && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-text-muted line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-success-100 text-success-600 px-2 py-0.5 rounded">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Price - Mobile */}
            <div className="sm:hidden">
              <div className="text-lg font-semibold text-primary">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-text-secondary">
                ₹{item.price.toLocaleString('en-IN')} each
              </div>
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg bg-background">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                  className="p-2 hover:bg-surface-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  aria-label="Decrease quantity"
                >
                  <Icon name="Minus" size={16} />
                </button>
                
                <div className="px-3 py-2 min-w-[3rem] text-center font-medium">
                  {isUpdating ? (
                    <Icon name="Loader2" size={16} className="animate-spin mx-auto" />
                  ) : (
                    item.quantity
                  )}
                </div>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating || item.quantity >= item.maxQuantity}
                  className="p-2 hover:bg-surface-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  aria-label="Increase quantity"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>

              {item.quantity >= item.maxQuantity && (
                <span className="text-xs text-warning-600">
                  Max {item.maxQuantity} per order
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleSaveForLater}
                className="text-sm"
                iconName="Heart"
                iconSize={16}
              >
                Save for Later
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleRemove}
                className="text-sm text-error-600 hover:text-error-700 hover:bg-error-50"
                iconName="Trash2"
                iconSize={16}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Price - Desktop */}
        <div className="hidden sm:block flex-shrink-0 text-right">
          <div className="text-lg font-semibold text-primary">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-text-secondary">
            ₹{item.price.toLocaleString('en-IN')} each
          </div>
        </div>
      </div>

      {/* Stock Status */}
      {item.stockStatus && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className={`flex items-center gap-2 text-sm ${
            item.stockStatus === 'in-stock' ? 'text-success-600' :
            item.stockStatus === 'low-stock'? 'text-warning-600' : 'text-error-600'
          }`}>
            <Icon 
              name={
                item.stockStatus === 'in-stock' ? 'CheckCircle' :
                item.stockStatus === 'low-stock'? 'AlertCircle' : 'XCircle'
              } 
              size={16} 
            />
            <span>
              {item.stockStatus === 'in-stock' && 'In Stock'}
              {item.stockStatus === 'low-stock' && `Only ${item.stockCount} left`}
              {item.stockStatus === 'out-of-stock' && 'Out of Stock'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;