import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Simulate cart count from localStorage or context
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(savedCartCount));

    // Simulate authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to product catalog with search query
      window.location.href = `/product-catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Handle logout
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } else {
      // Navigate to authentication page
      window.location.href = '/user-authentication';
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Shop Sarees', path: '/product-catalog', icon: 'ShoppingBag' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-header-mobile lg:h-header-desktop">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/homepage" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center transition-smooth group-hover:bg-primary-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-heading font-semibold text-primary">
                    R.G Kasat
                  </h1>
                  <p className="text-xs text-text-secondary font-caption -mt-1">
                    Saree Mall
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="search"
                  placeholder="Search sarees, fabrics, occasions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface-50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                />
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Mobile Search */}
              <button className="lg:hidden p-2 text-text-secondary hover:text-primary transition-smooth">
                <Icon name="Search" size={20} />
              </button>

              {/* Account */}
              <Button
                variant="ghost"
                onClick={handleAuthAction}
                className="hidden sm:flex items-center space-x-2"
                iconName={isAuthenticated ? "User" : "LogIn"}
                iconSize={18}
              >
                <span className="hidden lg:inline">
                  {isAuthenticated ? 'Account' : 'Sign In'}
                </span>
              </Button>

              {/* Cart */}
              <Link to="/shopping-cart" className="relative p-2 text-text-secondary hover:text-primary transition-smooth">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-text-secondary hover:text-primary transition-smooth"
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden border-t border-border px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              placeholder="Search sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface-50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text-primary bg-opacity-50 z-mobile-menu lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background shadow-strong z-mobile-menu transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="font-heading font-semibold text-primary">R.G Kasat</h2>
                <p className="text-xs text-text-secondary font-caption -mt-1">Saree Mall</p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-text-secondary hover:text-primary transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className="flex-1 py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-6 py-3 text-base font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50 border-r-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="border-t border-border mt-4 pt-4">
              <button
                onClick={() => {
                  handleAuthAction();
                  closeMobileMenu();
                }}
                className="flex items-center space-x-3 px-6 py-3 w-full text-left text-base font-medium text-text-secondary hover:text-primary hover:bg-surface-100 transition-smooth"
              >
                <Icon name={isAuthenticated ? "User" : "LogIn"} size={20} />
                <span>{isAuthenticated ? 'My Account' : 'Sign In'}</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;