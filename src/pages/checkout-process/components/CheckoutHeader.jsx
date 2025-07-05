import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutHeader = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Shipping', icon: 'MapPin' },
    { id: 2, label: 'Delivery', icon: 'Truck' },
    { id: 3, label: 'Payment', icon: 'CreditCard' },
    { id: 4, label: 'Review', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-heading font-semibold text-text-primary">
            Secure Checkout
          </h1>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} className="text-accent" />
            <span>SSL Secured</span>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                  step.id <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.id === currentStep + 1
                    ? 'bg-primary-100 text-primary border-2 border-primary' :'bg-surface-200 text-text-muted'
                }`}>
                  {step.id < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                  step.id <= currentStep ? 'text-primary' : 'text-text-muted'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                  step.id < currentStep ? 'bg-primary' : 'bg-surface-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;