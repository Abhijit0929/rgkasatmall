import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const CartBadge = ({ className = '', size = 'md' }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize cart count from localStorage
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(savedCartCount));

    // Listen for cart updates
    const handleCartUpdate = (event) => {
      const newCount = event.detail?.count || 0;
      setCartCount(newCount);
      
      // Trigger animation for count changes
      if (newCount !== cartCount) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
    };

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Listen for storage changes (for cross-tab updates)
    const handleStorageChange = (event) => {
      if (event.key === 'cartCount') {
        const newCount = parseInt(event.newValue || '0');
        setCartCount(newCount);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cartCount]);

  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 18,
      badge: 'w-4 h-4 text-xs',
      container: 'p-1.5'
    },
    md: {
      icon: 20,
      badge: 'w-5 h-5 text-xs',
      container: 'p-2'
    },
    lg: {
      icon: 24,
      badge: 'w-6 h-6 text-sm',
      container: 'p-2.5'
    }
  };

  const config = sizeConfig[size] || sizeConfig.md;

  const handleCartClick = (e) => {
    // Add subtle click feedback
    e.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
      if (e.currentTarget) {
        e.currentTarget.style.transform = 'scale(1)';
      }
    }, 100);
  };

  return (
    <Link
      to="/shopping-cart"
      onClick={handleCartClick}
      className={`relative ${config.container} text-text-secondary hover:text-primary transition-smooth rounded-lg hover:bg-surface-100 ${className}`}
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <Icon name="ShoppingCart" size={config.icon} />
      
      {cartCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-primary text-primary-foreground font-medium rounded-full ${config.badge} flex items-center justify-center transition-all duration-200 ${
            isAnimating ? 'animate-pulse scale-110' : ''
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
      
      {/* Subtle pulse animation for empty cart on hover */}
      {cartCount === 0 && (
        <span className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
      )}
    </Link>
  );
};

// Utility function to update cart count
export const updateCartCount = (newCount) => {
  localStorage.setItem('cartCount', newCount.toString());
  
  // Dispatch custom event for real-time updates
  const event = new CustomEvent('cartUpdated', {
    detail: { count: newCount }
  });
  window.dispatchEvent(event);
};

// Utility function to add item to cart
export const addToCart = (quantity = 1) => {
  const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
  const newCount = currentCount + quantity;
  updateCartCount(newCount);
  return newCount;
};

// Utility function to remove item from cart
export const removeFromCart = (quantity = 1) => {
  const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
  const newCount = Math.max(0, currentCount - quantity);
  updateCartCount(newCount);
  return newCount;
};

// Utility function to clear cart
export const clearCart = () => {
  updateCartCount(0);
};

export default CartBadge;