import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedForLater = ({ items = [], onMoveToCart, onRemove }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Saved for Later ({items.length})
        </h2>
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/user-authentication?tab=wishlist'}
          iconName="Heart"
          iconSize={16}
        >
          View All Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-surface-50 rounded-lg p-4 border border-border">
            {/* Product Image */}
            <Link to={`/product-detail?id=${item.id}`} className="block mb-3">
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            {/* Product Details */}
            <div className="space-y-2">
              <Link 
                to={`/product-detail?id=${item.id}`}
                className="text-text-primary hover:text-primary transition-smooth"
              >
                <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-xs text-text-muted line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {item.selectedSize && (
                <div className="text-xs text-text-secondary">
                  Size: {item.selectedSize} • Color: {item.selectedColor}
                </div>
              )}

              {/* Stock Status */}
              {item.stockStatus && (
                <div className={`flex items-center gap-1 text-xs ${
                  item.stockStatus === 'in-stock' ? 'text-success-600' :
                  item.stockStatus === 'low-stock'? 'text-warning-600' : 'text-error-600'
                }`}>
                  <Icon 
                    name={
                      item.stockStatus === 'in-stock' ? 'CheckCircle' :
                      item.stockStatus === 'low-stock'? 'AlertCircle' : 'XCircle'
                    } 
                    size={12} 
                  />
                  <span>
                    {item.stockStatus === 'in-stock' && 'In Stock'}
                    {item.stockStatus === 'low-stock' && `Only ${item.stockCount} left`}
                    {item.stockStatus === 'out-of-stock' && 'Out of Stock'}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="primary"
                  onClick={() => onMoveToCart(item.id)}
                  disabled={item.stockStatus === 'out-of-stock'}
                  className="flex-1 text-xs"
                  iconName="ShoppingCart"
                  iconSize={14}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-error-600 hover:text-error-700 hover:bg-error-50"
                  iconName="Trash2"
                  iconSize={14}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;