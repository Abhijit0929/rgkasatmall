import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach(value => {
          chips.push({
            category,
            value,
            label: formatFilterLabel(category, value)
          });
        });
      }
    });
    
    return chips;
  };

  const formatFilterLabel = (category, value) => {
    const labelMap = {
      category: {
        'silk': 'Silk Sarees',
        'cotton': 'Cotton Sarees',
        'chiffon': 'Chiffon Sarees',
        'georgette': 'Georgette Sarees',
        'banarasi': 'Banarasi Sarees',
        'kanjivaram': 'Kanjivaram Sarees',
        'designer': 'Designer Sarees'
      },
      price: {
        '0-2000': 'Under ₹2,000',
        '2000-5000': '₹2,000 - ₹5,000',
        '5000-10000': '₹5,000 - ₹10,000',
        '10000-20000': '₹10,000 - ₹20,000',
        '20000-50000': '₹20,000 - ₹50,000',
        '50000+': 'Above ₹50,000'
      },
      fabric: {
        'pure-silk': 'Pure Silk',
        'art-silk': 'Art Silk',
        'cotton-silk': 'Cotton Silk',
        'handloom': 'Handloom',
        'linen': 'Linen',
        'crepe': 'Crepe'
      },
      color: {
        'red': 'Red',
        'blue': 'Blue',
        'green': 'Green',
        'pink': 'Pink',
        'yellow': 'Yellow',
        'purple': 'Purple',
        'orange': 'Orange',
        'black': 'Black',
        'white': 'White',
        'gold': 'Gold'
      },
      occasion: {
        'wedding': 'Wedding',
        'festival': 'Festival',
        'party': 'Party',
        'casual': 'Casual',
        'office': 'Office Wear',
        'traditional': 'Traditional'
      }
    };

    return labelMap[category]?.[value] || value;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {/* Active Filter Chips */}
      {chips.map((chip, index) => (
        <div
          key={`${chip.category}-${chip.value}-${index}`}
          className="flex items-center space-x-2 bg-primary-50 text-primary border border-primary-200 rounded-full px-3 py-1.5 text-sm font-medium"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.category, chip.value)}
            className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-200"
            aria-label={`Remove ${chip.label} filter`}
          >
            <Icon name="X" size={12} className="text-primary" />
          </button>
        </div>
      ))}

      {/* Clear All Button */}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-text-muted hover:text-primary text-sm font-medium px-3 py-1.5 rounded-full hover:bg-surface-100 transition-smooth"
        >
          <Icon name="X" size={14} />
          <span>Clear All</span>
        </button>
      )}

      {/* Results Count */}
      <div className="flex items-center space-x-2 ml-auto">
        <span className="text-sm text-text-muted">
          {chips.length} filter{chips.length !== 1 ? 's' : ''} applied
        </span>
      </div>
    </div>
  );
};

export default FilterChips;