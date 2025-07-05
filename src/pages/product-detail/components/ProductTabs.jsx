import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'care', label: 'Care Instructions', icon: 'Heart' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-secondary fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-secondary fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />
      );
    }

    return stars;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-text-primary mb-2">About this Saree</h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {product.culturalSignificance && (
              <div>
                <h3 className="font-medium text-text-primary mb-2">Cultural Significance</h3>
                <p className="text-text-secondary leading-relaxed">
                  {product.culturalSignificance}
                </p>
              </div>
            )}

            {product.occasions && (
              <div>
                <h3 className="font-medium text-text-primary mb-2">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occasion, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-text-secondary">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'care':
        return (
          <div className="space-y-4">
            <div className="bg-surface-50 p-4 rounded-lg">
              <h3 className="font-medium text-text-primary mb-3 flex items-center">
                <Icon name="AlertCircle" size={18} className="text-warning mr-2" />
                Care Instructions
              </h3>
              <ul className="space-y-2">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-warning-50 p-4 rounded-lg">
              <h3 className="font-medium text-warning-600 mb-2 flex items-center">
                <Icon name="AlertTriangle" size={18} className="mr-2" />
                Important Notes
              </h3>
              <ul className="space-y-1">
                <li className="text-warning-600 text-sm">• Dry clean recommended for best results</li>
                <li className="text-warning-600 text-sm">• Avoid direct sunlight when drying</li>
                <li className="text-warning-600 text-sm">• Store in a cool, dry place</li>
              </ul>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-surface-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-bold text-text-primary">
                      {product.rating}
                    </span>
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary mb-1">
                    {Math.round((product.reviews.filter(r => r.rating >= 4).length / product.reviews.length) * 100)}% recommend
                  </p>
                  <p className="text-xs text-text-muted">this product</p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = product.reviews.filter(r => r.rating === rating).length;
                  const percentage = (count / product.reviews.length) * 100;
                  
                  return (
                    <div key={rating} className="flex items-center space-x-2 text-sm">
                      <span className="w-8 text-text-secondary">{rating}★</span>
                      <div className="flex-1 bg-border rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-text-muted text-xs">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {product.reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b border-border pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-text-primary">{review.userName}</span>
                        {review.verified && (
                          <span className="bg-success text-success-foreground px-2 py-0.5 rounded-full text-xs">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-text-muted text-sm">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-2">{review.comment}</p>
                  
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <button className="hover:text-primary transition-smooth">
                      <Icon name="ThumbsUp" size={14} className="inline mr-1" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="hover:text-primary transition-smooth">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {product.reviews.length > 5 && (
              <button className="w-full py-3 border border-border rounded-lg text-primary hover:bg-primary-50 transition-smooth">
                View All Reviews ({product.reviewCount})
              </button>
            )}
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-50 p-4 rounded-lg">
                <h3 className="font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Truck" size={18} className="text-primary mr-2" />
                  Delivery Options
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-text-secondary">Standard Delivery</span>
                    <span className="text-text-primary">5-7 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-text-secondary">Express Delivery</span>
                    <span className="text-text-primary">2-3 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-text-secondary">Same Day Delivery</span>
                    <span className="text-text-primary">Available in select cities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-surface-50 p-4 rounded-lg">
                <h3 className="font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="RotateCcw" size={18} className="text-accent mr-2" />
                  Return Policy
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">30-day return window</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Free return pickup</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Full refund on return</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-medium text-primary mb-2 flex items-center">
                <Icon name="Gift" size={18} className="mr-2" />
                Free Shipping Benefits
              </h3>
              <p className="text-primary text-sm">
                Enjoy free standard shipping on orders above ₹999. Express delivery available for ₹99.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
              {tab.id === 'reviews' && (
                <span className="bg-surface-200 text-text-muted px-2 py-0.5 rounded-full text-xs">
                  {product.reviewCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;