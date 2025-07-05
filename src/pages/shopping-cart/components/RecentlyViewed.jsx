import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ items = [] }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Recently Viewed
        </h2>
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/product-catalog'}
          iconName="ArrowRight"
          iconSize={16}
        >
          View All Products
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.slice(0, 6).map((item) => (
          <Link
            key={item.id}
            to={`/product-detail?id=${item.id}`}
            className="group"
          >
            <div className="bg-surface-50 rounded-lg p-3 border border-border hover:shadow-medium transition-all duration-200">
              {/* Product Image */}
              <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-surface-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-1">
                <h3 className="font-medium text-sm text-text-primary line-clamp-2 group-hover:text-primary transition-smooth">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-text-muted line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {item.rating && (
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-secondary fill-current" />
                    <span className="text-xs text-text-secondary">
                      {item.rating}
                    </span>
                  </div>
                )}

                {/* Quick Add to Cart */}
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart logic here
                      console.log('Add to cart:', item.id);
                    }}
                    className="w-full text-xs"
                    iconName="Plus"
                    iconSize={12}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;