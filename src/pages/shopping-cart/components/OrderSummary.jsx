import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode, 
  onProceedToCheckout,
  isProcessing = false 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');
    
    try {
      const result = await onApplyPromoCode(promoCode.trim());
      if (result.success) {
        setPromoSuccess(result.message || 'Promo code applied successfully!');
        setPromoCode('');
      } else {
        setPromoError(result.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromoCode();
    }
  };

  return (
    <div className="bg-surface-50 rounded-lg p-6 border border-border sticky top-4">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Order Summary
      </h2>

      {/* Promo Code Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isApplyingPromo}
          />
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            disabled={!promoCode.trim() || isApplyingPromo}
            loading={isApplyingPromo}
            iconName="Tag"
            iconSize={16}
          >
            Apply
          </Button>
        </div>
        
        {promoError && (
          <div className="flex items-center gap-2 mt-2 text-sm text-error-600">
            <Icon name="AlertCircle" size={14} />
            <span>{promoError}</span>
          </div>
        )}
        
        {promoSuccess && (
          <div className="flex items-center gap-2 mt-2 text-sm text-success-600">
            <Icon name="CheckCircle" size={14} />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success-600">
            <span>Discount</span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-success-600">FREE</span>
            ) : (
              `₹${shipping.toLocaleString('en-IN')}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-text-secondary">
          <span>Tax (GST)</span>
          <span>₹{tax.toLocaleString('en-IN')}</span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold text-text-primary">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mb-6 p-3 bg-surface-100 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Truck" size={16} className="text-text-muted mt-0.5" />
          <div className="text-sm">
            <p className="text-text-primary font-medium">Free Shipping</p>
            <p className="text-text-secondary">
              On orders above ₹2,000. Delivery in 3-5 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Icon name="Shield" size={14} />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="RotateCcw" size={14} />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={isProcessing}
        loading={isProcessing}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>

      {/* Continue Shopping */}
      <Button
        variant="ghost"
        fullWidth
        onClick={() => window.location.href = '/product-catalog'}
        iconName="ArrowLeft"
        iconPosition="left"
      >
        Continue Shopping
      </Button>

      {/* Payment Methods */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-muted text-center mb-3">
          We accept
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-5 bg-surface-200 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-text-muted">VISA</span>
          </div>
          <div className="w-8 h-5 bg-surface-200 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-text-muted">MC</span>
          </div>
          <div className="w-8 h-5 bg-surface-200 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-text-muted">UPI</span>
          </div>
          <div className="w-8 h-5 bg-surface-200 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-text-muted">NB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;