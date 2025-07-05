import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ cartItems = [], deliveryCharges = 0, codCharges = 0 }) => {
  // Mock cart items if none provided
  const mockCartItems = [
    {
      id: 1,
      name: 'Banarasi Silk Saree - Royal Blue',
      color: 'Royal Blue',
      price: 12999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Kanjivaram Silk Saree - Maroon',
      color: 'Maroon',
      price: 8999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop'
    }
  ];

  const items = cartItems.length > 0 ? cartItems : mockCartItems;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gstRate = 0.18; // 18% GST
  const gstAmount = Math.round(subtotal * gstRate);
  const total = subtotal + deliveryCharges + codCharges + gstAmount;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="ShoppingBag" size={20} className="mr-2" />
        Order Summary
      </h3>

      {/* Items List */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary text-sm truncate">
                {item.name}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <span>{item.color}</span>
                <span>•</span>
                <span>Qty: {item.quantity}</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-text-primary text-sm">
                {formatPrice(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border mb-4"></div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-text-secondary text-sm">
          <span>Subtotal ({items.length} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-text-secondary text-sm">
          <span>Delivery Charges</span>
          <span className={deliveryCharges === 0 ? 'text-accent font-medium' : ''}>
            {deliveryCharges === 0 ? 'FREE' : formatPrice(deliveryCharges)}
          </span>
        </div>
        
        {codCharges > 0 && (
          <div className="flex justify-between text-text-secondary text-sm">
            <span>COD Charges</span>
            <span>{formatPrice(codCharges)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-text-secondary text-sm">
          <span>GST (18%)</span>
          <span>{formatPrice(gstAmount)}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold text-text-primary">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Savings Badge */}
      {deliveryCharges === 0 && (
        <div className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Gift" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent-800">
              You saved delivery charges!
            </span>
          </div>
        </div>
      )}

      {/* Security Badge */}
      <div className="mt-4 p-3 bg-surface-50 border border-border rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium text-text-primary">100% Secure Checkout</p>
            <p>SSL encrypted & PCI compliant</p>
          </div>
        </div>
      </div>

      {/* Return Policy */}
      <div className="mt-4 p-3 bg-surface-50 border border-border rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={16} className="text-secondary" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium text-text-primary">Easy Returns</p>
            <p>7-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;