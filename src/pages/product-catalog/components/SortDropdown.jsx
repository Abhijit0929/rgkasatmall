import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'newest', label: 'Newest Arrivals', icon: 'Clock' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'popularity', label: 'Most Popular', icon: 'Heart' },
    { value: 'discount', label: 'Highest Discount', icon: 'Percent' }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-surface-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        aria-label="Sort products"
        aria-expanded={isOpen}
      >
        <Icon name="ArrowUpDown" size={16} className="text-text-muted" />
        <span className="text-sm font-medium text-text-primary">
          Sort: {currentSortOption.label}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-muted transition-transform duration-200"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-medium z-30 overflow-hidden">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-50 transition-smooth ${
                  currentSort === option.value 
                    ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary' : 'text-text-muted'} 
                />
                <span className="text-sm font-medium flex-1">
                  {option.label}
                </span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;