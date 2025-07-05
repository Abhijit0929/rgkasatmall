import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestCheckout = () => {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center">
        <div className="mb-4">
          <Icon name="ShoppingCart" size={32} className="text-text-muted mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Continue as Guest
        </h3>
        <p className="text-text-secondary mb-4">
          You can checkout without creating an account
        </p>
        <Link to="/checkout-process">
          <Button variant="outline" fullWidth>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="ArrowRight" size={18} />
              <span>Continue to Checkout</span>
            </div>
          </Button>
        </Link>
        <p className="text-xs text-text-muted mt-3">
          You can create an account later to track your orders
        </p>
      </div>
    </div>
  );
};

export default GuestCheckout;