import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryOptionsForm = ({ onNext, onBack, shippingAddress }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Delivered within 5-7 business days',
      price: 0,
      estimatedDays: '5-7',
      icon: 'Package'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Delivered within 2-3 business days',
      price: 99,
      estimatedDays: '2-3',
      icon: 'Zap'
    },
    {
      id: 'premium',
      name: 'Premium Delivery',
      description: 'Delivered within 1-2 business days',
      price: 199,
      estimatedDays: '1-2',
      icon: 'Crown'
    }
  ];

  const getEstimatedDeliveryDate = (days) => {
    const today = new Date();
    const maxDays = parseInt(days.split('-')[1] || days);
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + maxDays);
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption);
    }
  };

  return (
    <div className="bg-background">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Delivery Options
        </h2>
        <p className="text-text-secondary">
          Choose your preferred delivery speed
        </p>
      </div>

      {/* Delivery Address Summary */}
      <div className="bg-surface-50 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary mb-1">
              Delivering to:
            </h3>
            <p className="text-text-secondary text-sm">
              {shippingAddress?.fullName}
            </p>
            <p className="text-text-secondary text-sm">
              {shippingAddress?.addressLine1}
              {shippingAddress?.addressLine2 && `, ${shippingAddress.addressLine2}`}
            </p>
            <p className="text-text-secondary text-sm">
              {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.pinCode}
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="space-y-4 mb-6">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
              selectedOption?.id === option.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
            }`}
            onClick={() => setSelectedOption(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedOption?.id === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-200 text-text-muted'
                }`}>
                  <Icon name={option.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-text-primary">
                      {option.name}
                    </h3>
                    {option.price === 0 && (
                      <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-2">
                    {option.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-text-muted">
                      <Icon name="Calendar" size={14} />
                      <span>
                        By {getEstimatedDeliveryDate(option.estimatedDays)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-text-muted">
                      <Icon name="Clock" size={14} />
                      <span>{option.estimatedDays} business days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {option.price === 0 ? 'FREE' : `₹${option.price}`}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption?.id === option.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedOption?.id === option.id && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Instructions */}
      <div className="bg-surface-50 border border-border rounded-lg p-4 mb-6">
        <h3 className="font-medium text-text-primary mb-2">
          Delivery Instructions (Optional)
        </h3>
        <textarea
          placeholder="Any special instructions for delivery? e.g., Call before delivery, Leave at security, etc."
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Important Notes */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-warning-600 mt-0.5" />
          <div className="text-sm text-warning-800">
            <p className="font-medium mb-1">Important Notes:</p>
            <ul className="space-y-1 text-xs">
              <li>• Delivery times are estimated and may vary based on location</li>
              <li>• Express and Premium delivery available only in major cities</li>
              <li>• Someone must be available to receive the package</li>
              <li>• Delivery charges are non-refundable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
        >
          Back to Address
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!selectedOption}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default DeliveryOptionsForm;