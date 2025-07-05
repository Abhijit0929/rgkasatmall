import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileMenu = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Handle logout
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } else {
      // Navigate to authentication page
      window.location.href = '/user-authentication';
    }
    onClose();
  };

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/homepage', 
      icon: 'Home',
      description: 'Discover our latest collections'
    },
    { 
      label: 'Shop Sarees', 
      path: '/product-catalog', 
      icon: 'ShoppingBag',
      description: 'Browse our premium saree collection'
    },
  ];

  const quickActions = [
    {
      label: 'Shopping Cart',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      description: 'View your selected items'
    },
    {
      label: 'Checkout',
      path: '/checkout-process',
      icon: 'CreditCard',
      description: 'Complete your purchase'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary bg-opacity-50 z-mobile-menu transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background shadow-strong z-mobile-menu transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="font-heading font-semibold text-primary text-lg">
                  R.G Kasat
                </h2>
                <p className="text-sm text-text-secondary font-caption -mt-1">
                  Saree Mall
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-primary hover:bg-surface-100 rounded-lg transition-smooth"
              aria-label="Close menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <nav className="py-4">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider">
                  Navigation
                </h3>
              </div>
              
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-4 transition-smooth ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50 border-r-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActivePath(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-surface-200 text-text-muted'
                  }`}>
                    <Icon name={item.icon} size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="border-t border-border py-4">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider">
                  Quick Actions
                </h3>
              </div>
              
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className={`flex items-center space-x-3 px-6 py-3 transition-smooth ${
                    isActivePath(action.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                  }`}
                >
                  <Icon name={action.icon} size={18} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-text-muted">
                      {action.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Account Section */}
            <div className="border-t border-border py-4">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider">
                  Account
                </h3>
              </div>
              
              <button
                onClick={handleAuthAction}
                className="flex items-center space-x-3 px-6 py-4 w-full text-left text-text-secondary hover:text-primary hover:bg-surface-100 transition-smooth"
              >
                <div className="p-2 rounded-lg bg-surface-200">
                  <Icon name={isAuthenticated ? "User" : "LogIn"} size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {isAuthenticated ? 'My Account' : 'Sign In'}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {isAuthenticated 
                      ? 'Manage your account settings' :'Access your account or create one'
                    }
                  </div>
                </div>
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    localStorage.removeItem('isAuthenticated');
                    setIsAuthenticated(false);
                    onClose();
                  }}
                  className="flex items-center space-x-3 px-6 py-3 w-full text-left text-text-secondary hover:text-error hover:bg-error-50 transition-smooth"
                >
                  <Icon name="LogOut" size={18} />
                  <span className="font-medium text-sm">Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 bg-surface-50">
            <div className="text-center">
              <p className="text-xs text-text-muted">
                © 2024 R.G Kasat Saree Mall
              </p>
              <p className="text-xs text-text-muted mt-1">
                Premium Indian Textiles
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;