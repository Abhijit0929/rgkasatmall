import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearAll,
  isMobile = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    fabric: false,
    color: false,
    occasion: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterSections = [
    {
      key: 'category',
      title: 'Category',
      options: [
        { value: 'silk', label: 'Silk Sarees', count: 245 },
        { value: 'cotton', label: 'Cotton Sarees', count: 189 },
        { value: 'chiffon', label: 'Chiffon Sarees', count: 156 },
        { value: 'georgette', label: 'Georgette Sarees', count: 134 },
        { value: 'banarasi', label: 'Banarasi Sarees', count: 98 },
        { value: 'kanjivaram', label: 'Kanjivaram Sarees', count: 87 },
        { value: 'designer', label: 'Designer Sarees', count: 76 }
      ]
    },
    {
      key: 'price',
      title: 'Price Range',
      type: 'range',
      options: [
        { value: '0-2000', label: 'Under ₹2,000', count: 156 },
        { value: '2000-5000', label: '₹2,000 - ₹5,000', count: 234 },
        { value: '5000-10000', label: '₹5,000 - ₹10,000', count: 189 },
        { value: '10000-20000', label: '₹10,000 - ₹20,000', count: 145 },
        { value: '20000-50000', label: '₹20,000 - ₹50,000', count: 98 },
        { value: '50000+', label: 'Above ₹50,000', count: 45 }
      ]
    },
    {
      key: 'fabric',
      title: 'Fabric Type',
      options: [
        { value: 'pure-silk', label: 'Pure Silk', count: 198 },
        { value: 'art-silk', label: 'Art Silk', count: 167 },
        { value: 'cotton-silk', label: 'Cotton Silk', count: 145 },
        { value: 'handloom', label: 'Handloom', count: 123 },
        { value: 'linen', label: 'Linen', count: 89 },
        { value: 'crepe', label: 'Crepe', count: 76 }
      ]
    },
    {
      key: 'color',
      title: 'Color',
      type: 'color',
      options: [
        { value: 'red', label: 'Red', color: '#DC2626', count: 156 },
        { value: 'blue', label: 'Blue', color: '#2563EB', count: 134 },
        { value: 'green', label: 'Green', color: '#16A34A', count: 123 },
        { value: 'pink', label: 'Pink', color: '#EC4899', count: 112 },
        { value: 'yellow', label: 'Yellow', color: '#EAB308', count: 98 },
        { value: 'purple', label: 'Purple', color: '#9333EA', count: 87 },
        { value: 'orange', label: 'Orange', color: '#EA580C', count: 76 },
        { value: 'black', label: 'Black', color: '#000000', count: 145 },
        { value: 'white', label: 'White', color: '#FFFFFF', count: 134 },
        { value: 'gold', label: 'Gold', color: '#D4AF37', count: 89 }
      ]
    },
    {
      key: 'occasion',
      title: 'Occasion',
      options: [
        { value: 'wedding', label: 'Wedding', count: 189 },
        { value: 'festival', label: 'Festival', count: 156 },
        { value: 'party', label: 'Party', count: 134 },
        { value: 'casual', label: 'Casual', count: 123 },
        { value: 'office', label: 'Office Wear', count: 98 },
        { value: 'traditional', label: 'Traditional', count: 87 }
      ]
    }
  ];

  const handleFilterSelect = (sectionKey, value) => {
    const currentFilters = filters[sectionKey] || [];
    const isSelected = currentFilters.includes(value);
    
    let newFilters;
    if (isSelected) {
      newFilters = currentFilters.filter(item => item !== value);
    } else {
      newFilters = [...currentFilters, value];
    }
    
    onFilterChange(sectionKey, newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((total, filterArray) => {
      return total + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  const FilterSection = ({ section }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(section.key)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-50 transition-smooth"
      >
        <span className="font-medium text-text-primary">{section.title}</span>
        <Icon 
          name={expandedSections[section.key] ? "ChevronUp" : "ChevronDown"} 
          size={18} 
          className="text-text-muted"
        />
      </button>
      
      {expandedSections[section.key] && (
        <div className="px-4 pb-4 space-y-2">
          {section.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={(filters[section.key] || []).includes(option.value)}
                onChange={() => handleFilterSelect(section.key, option.value)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              
              {section.type === 'color' && (
                <div 
                  className="w-4 h-4 rounded-full border border-border flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                />
              )}
              
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
                  {option.label}
                </span>
                <span className="text-xs text-text-muted">
                  ({option.count})
                </span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-text-primary bg-opacity-50 z-40"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Filter Panel */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-strong z-50 transform transition-transform duration-300 max-h-[85vh] ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">
                  Filters
                </h2>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} className="text-text-muted" />
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              {filterSections.map((section) => (
                <FilterSection key={section.key} section={section} />
              ))}
            </div>
            
            {/* Footer Actions */}
            <div className="p-4 border-t border-border bg-surface-50">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClearAll}
                  className="flex-1"
                  disabled={getActiveFilterCount() === 0}
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="w-80 bg-background border-r border-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">
              Filters
            </h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-text-muted hover:text-primary"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      {/* Filter Sections */}
      <div>
        {filterSections.map((section) => (
          <FilterSection key={section.key} section={section} />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;