import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ recentlyViewed = [], suggestedProducts = [] }) => {
  return (
    <div className="text-center py-12">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-4 bg-surface-100 rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-text-muted" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Looks like you haven't added any sarees to your cart yet. 
          Discover our beautiful collection and find your perfect saree.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          variant="primary"
          onClick={() => window.location.href = '/product-catalog'}
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Shop Sarees
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/homepage'}
          iconName="Home"
          iconPosition="left"
        >
          Go to Homepage
        </Button>
      </div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product-detail?id=${product.id}`}
                className="group"
              >
                <div className="bg-surface-50 rounded-lg p-4 border border-border hover:shadow-medium transition-all duration-200">
                  <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-surface-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-text-primary line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <p className="text-primary font-semibold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            You Might Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedProducts.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product-detail?id=${product.id}`}
                className="group"
              >
                <div className="bg-surface-50 rounded-lg p-4 border border-border hover:shadow-medium transition-all duration-200">
                  <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-surface-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-text-primary line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    {product.originalPrice > product.price && (
                      <p className="text-xs text-text-muted line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" size={12} className="text-secondary fill-current" />
                      <span className="text-xs text-text-secondary">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Silk Sarees', icon: 'Sparkles', path: '/product-catalog?category=silk' },
            { name: 'Cotton Sarees', icon: 'Leaf', path: '/product-catalog?category=cotton' },
            { name: 'Wedding Sarees', icon: 'Heart', path: '/product-catalog?category=wedding' },
            { name: 'Designer Sarees', icon: 'Palette', path: '/product-catalog?category=designer' }
          ].map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group p-4 bg-surface-50 rounded-lg border border-border hover:shadow-medium transition-all duration-200"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <Icon name={category.icon} size={24} className="text-primary" />
              </div>
              <p className="font-medium text-sm text-text-primary group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;