import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderReviewForm = ({ 
  onPlaceOrder, 
  onBack, 
  shippingAddress, 
  deliveryOption, 
  paymentMethod,
  cartItems = []
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock cart items if none provided
  const mockCartItems = [
    {
      id: 1,
      name: 'Banarasi Silk Saree - Royal Blue',
      color: 'Royal Blue',
      size: 'Free Size',
      price: 12999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Kanjivaram Silk Saree - Maroon',
      color: 'Maroon',
      size: 'Free Size',
      price: 8999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop'
    }
  ];

  const items = cartItems.length > 0 ? cartItems : mockCartItems;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharges = deliveryOption?.price || 0;
  const codCharges = paymentMethod?.method?.id === 'cod' ? 50 : 0;
  const gstRate = 0.18; // 18% GST
  const gstAmount = Math.round(subtotal * gstRate);
  const total = subtotal + deliveryCharges + codCharges + gstAmount;

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder({
        items,
        shippingAddress,
        deliveryOption,
        paymentMethod,
        totals: {
          subtotal,
          deliveryCharges,
          codCharges,
          gstAmount,
          total
        }
      });
    }, 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-background">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Review Your Order
        </h2>
        <p className="text-text-secondary">
          Please review all details before placing your order
        </p>
      </div>

      <div className="space-y-6">
        {/* Order Items */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Package" size={20} className="mr-2" />
            Order Items ({items.length})
          </h3>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{item.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {formatPrice(item.price)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-sm text-text-secondary">
                      {formatPrice(item.price * item.quantity)} total
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Shipping Address
          </h3>
          
          <div className="bg-background rounded-lg p-4">
            <p className="font-medium text-text-primary">{shippingAddress?.fullName}</p>
            <p className="text-text-secondary text-sm mt-1">
              {shippingAddress?.addressLine1}
              {shippingAddress?.addressLine2 && `, ${shippingAddress.addressLine2}`}
            </p>
            <p className="text-text-secondary text-sm">
              {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.pinCode}
            </p>
            <p className="text-text-secondary text-sm">
              Phone: {shippingAddress?.phoneNumber}
            </p>
          </div>
        </div>

        {/* Delivery Option */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Truck" size={20} className="mr-2" />
            Delivery Option
          </h3>
          
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">{deliveryOption?.name}</p>
                <p className="text-text-secondary text-sm">{deliveryOption?.description}</p>
              </div>
              <p className="font-semibold text-text-primary">
                {deliveryOption?.price === 0 ? 'FREE' : formatPrice(deliveryOption?.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Payment Method
          </h3>
          
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name={paymentMethod?.method?.icon} size={20} className="text-primary" />
              <div>
                <p className="font-medium text-text-primary">{paymentMethod?.method?.name}</p>
                <p className="text-text-secondary text-sm">{paymentMethod?.method?.description}</p>
                {paymentMethod?.method?.id === 'card' && paymentMethod?.details?.cardNumber && (
                  <p className="text-text-secondary text-sm">
                    **** **** **** {paymentMethod.details.cardNumber.slice(-4)}
                  </p>
                )}
                {paymentMethod?.method?.id === 'upi' && paymentMethod?.details?.upiId && (
                  <p className="text-text-secondary text-sm">
                    {paymentMethod.details.upiId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Receipt" size={20} className="mr-2" />
            Price Details
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-text-secondary">
              <span>Delivery Charges</span>
              <span className={deliveryCharges === 0 ? 'text-accent' : ''}>
                {deliveryCharges === 0 ? 'FREE' : formatPrice(deliveryCharges)}
              </span>
            </div>
            
            {codCharges > 0 && (
              <div className="flex justify-between text-text-secondary">
                <span>COD Charges</span>
                <span>{formatPrice(codCharges)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-text-secondary">
              <span>GST (18%)</span>
              <span>{formatPrice(gstAmount)}</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-lg font-semibold text-text-primary">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-surface-50 border border-border rounded-lg p-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 text-primary focus:ring-primary"
            />
            <div className="text-sm text-text-secondary">
              <p>
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                . I understand that my order will be processed according to these terms.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          disabled={isProcessing}
        >
          Back to Payment
        </Button>
        
        <Button
          variant="primary"
          onClick={handlePlaceOrder}
          disabled={!agreedToTerms || isProcessing}
          loading={isProcessing}
          iconName={isProcessing ? undefined : "ShoppingBag"}
          iconPosition="right"
          className="min-w-[160px]"
        >
          {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
        </Button>
      </div>
    </div>
  );
};

export default OrderReviewForm;