import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSuccessModal = ({ isOpen, orderDetails, onClose }) => {
  if (!isOpen) return null;

  const generateOrderId = () => {
    return 'RGK' + Date.now().toString().slice(-8);
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDays = orderDetails?.deliveryOption?.estimatedDays || '5-7';
    const maxDays = parseInt(deliveryDays.split('-')[1] || deliveryDays);
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + maxDays);
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const orderId = generateOrderId();
  const estimatedDelivery = getEstimatedDeliveryDate();

  return (
    <div className="fixed inset-0 bg-text-primary bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-strong max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Success Header */}
        <div className="text-center p-6 border-b border-border">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-text-secondary">
            Thank you for shopping with R.G Kasat Saree Mall
          </p>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-6">
          {/* Order ID */}
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Order ID</p>
            <p className="text-xl font-mono font-semibold text-primary">
              {orderId}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-surface-50 rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Items ({orderDetails?.items?.length || 0})</span>
                <span className="text-text-primary">{formatPrice(orderDetails?.totals?.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery</span>
                <span className="text-text-primary">
                  {orderDetails?.totals?.deliveryCharges === 0 ? 'FREE' : formatPrice(orderDetails?.totals?.deliveryCharges || 0)}
                </span>
              </div>
              {orderDetails?.totals?.codCharges > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">COD Charges</span>
                  <span className="text-text-primary">{formatPrice(orderDetails?.totals?.codCharges)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">GST</span>
                <span className="text-text-primary">{formatPrice(orderDetails?.totals?.gstAmount || 0)}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-text-primary">Total Paid</span>
                  <span className="text-primary">{formatPrice(orderDetails?.totals?.total || 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-surface-50 rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Truck" size={18} className="mr-2" />
              Delivery Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-text-secondary">Estimated Delivery:</span>
                <p className="font-medium text-text-primary">{estimatedDelivery}</p>
              </div>
              <div>
                <span className="text-text-secondary">Delivery Address:</span>
                <p className="text-text-primary">
                  {orderDetails?.shippingAddress?.fullName}
                </p>
                <p className="text-text-secondary text-xs">
                  {orderDetails?.shippingAddress?.addressLine1}, {orderDetails?.shippingAddress?.city}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-surface-50 rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="CreditCard" size={18} className="mr-2" />
              Payment Method
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name={orderDetails?.paymentMethod?.method?.icon} size={16} className="text-primary" />
              <span className="text-text-primary text-sm">
                {orderDetails?.paymentMethod?.method?.name}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="font-medium text-primary mb-2">What's Next?</h3>
            <ul className="space-y-1 text-sm text-primary-700">
              <li className="flex items-start space-x-2">
                <Icon name="Mail" size={14} className="mt-0.5 flex-shrink-0" />
                <span>Order confirmation sent to your email</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Package" size={14} className="mt-0.5 flex-shrink-0" />
                <span>We'll prepare your order for shipping</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Bell" size={14} className="mt-0.5 flex-shrink-0" />
                <span>You'll receive tracking updates via SMS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-border space-y-3">
          <Button
            variant="primary"
            fullWidth
            iconName="Package"
            onClick={() => {
              // Navigate to order tracking
              window.location.href = `/order-tracking?id=${orderId}`;
            }}
          >
            Track Your Order
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Link to="/product-catalog">
              <Button variant="outline" fullWidth iconName="ShoppingBag">
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/homepage">
              <Button variant="ghost" fullWidth iconName="Home">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-smooth"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;