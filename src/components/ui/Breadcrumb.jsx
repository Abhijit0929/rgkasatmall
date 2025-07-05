import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  // Default breadcrumb mapping based on routes
  const routeMapping = {
    '/homepage': { label: 'Home', icon: 'Home' },
    '/product-catalog': { label: 'Shop Sarees', icon: 'ShoppingBag' },
    '/product-detail': { label: 'Product Details', icon: 'Eye' },
    '/shopping-cart': { label: 'Shopping Cart', icon: 'ShoppingCart' },
    '/user-authentication': { label: 'Account', icon: 'User' },
    '/checkout-process': { label: 'Checkout', icon: 'CreditCard' },
  };

  // Generate breadcrumb items
  const generateBreadcrumbItems = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const items = [{ label: 'Home', path: '/homepage', icon: 'Home' }];

    if (location.pathname === '/homepage') {
      return items;
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMapping[currentPath];
      
      if (routeInfo) {
        items.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  // Don't render breadcrumb on homepage
  if (location.pathname === '/homepage' && !customItems) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path || index}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-text-muted flex-shrink-0" 
            />
          )}
          
          {item.isLast || index === breadcrumbItems.length - 1 ? (
            <span className="flex items-center space-x-1 text-text-primary font-medium">
              {item.icon && (
                <Icon 
                  name={item.icon} 
                  size={14} 
                  className="text-text-muted" 
                />
              )}
              <span className="truncate">{item.label}</span>
            </span>
          ) : (
            <Link
              to={item.path}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth group"
            >
              {item.icon && (
                <Icon 
                  name={item.icon} 
                  size={14} 
                  className="text-text-muted group-hover:text-primary transition-smooth" 
                />
              )}
              <span className="truncate hover:underline">{item.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;