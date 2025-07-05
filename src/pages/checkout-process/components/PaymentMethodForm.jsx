import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodForm = ({ onNext, onBack, orderTotal }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay accepted',
      icon: 'CreditCard',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using Google Pay, PhonePe, Paytm',
      icon: 'Smartphone',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: 'Building'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm, Amazon Pay, Mobikwik',
      icon: 'Wallet'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: 'Banknote'
    }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
    'Canara Bank', 'Union Bank of India', 'Indian Bank'
  ];

  const wallets = [
    'Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge', 'Ola Money'
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const newErrors = {};

    if (!cardDetails.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDetails.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!cardDetails.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format';
    }

    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardDetails.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUPI = () => {
    const newErrors = {};
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

    if (!upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!upiRegex.test(upiId)) {
      newErrors.upiId = 'Invalid UPI ID format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;

    if (selectedMethod?.id === 'card') {
      isValid = validateCard();
    } else if (selectedMethod?.id === 'upi') {
      isValid = validateUPI();
    }

    if (isValid && selectedMethod) {
      onNext({
        method: selectedMethod,
        details: selectedMethod.id === 'card' ? cardDetails : 
                selectedMethod.id === 'upi' ? { upiId } : {}
      });
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod?.id) {
      case 'card':
        return (
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface-50">
            <h4 className="font-medium text-text-primary mb-4">
              Enter Card Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Card Number *
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    cardNumber: formatCardNumber(e.target.value)
                  }))}
                  className={errors.cardNumber ? 'border-error' : ''}
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-error text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Cardholder Name *
                </label>
                <Input
                  type="text"
                  placeholder="Name as on card"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    cardholderName: e.target.value
                  }))}
                  className={errors.cardholderName ? 'border-error' : ''}
                />
                {errors.cardholderName && (
                  <p className="text-error text-sm mt-1">{errors.cardholderName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Expiry Date *
                </label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    expiryDate: formatExpiryDate(e.target.value)
                  }))}
                  className={errors.expiryDate ? 'border-error' : ''}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-error text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  CVV *
                </label>
                <Input
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    cvv: e.target.value.replace(/\D/g, '')
                  }))}
                  className={errors.cvv ? 'border-error' : ''}
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-error text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface-50">
            <h4 className="font-medium text-text-primary mb-4">
              Enter UPI Details
            </h4>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                UPI ID *
              </label>
              <Input
                type="text"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className={errors.upiId ? 'border-error' : ''}
              />
              {errors.upiId && (
                <p className="text-error text-sm mt-1">{errors.upiId}</p>
              )}
              <p className="text-text-muted text-xs mt-1">
                Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
              </p>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface-50">
            <h4 className="font-medium text-text-primary mb-4">
              Select Your Bank
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {banks.map((bank) => (
                <label key={bank} className="flex items-center space-x-2 p-2 hover:bg-surface-100 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="bank"
                    value={bank}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{bank}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface-50">
            <h4 className="font-medium text-text-primary mb-4">
              Select Wallet
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {wallets.map((wallet) => (
                <label key={wallet} className="flex items-center space-x-2 p-2 hover:bg-surface-100 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="wallet"
                    value={wallet}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{wallet}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="mt-4 p-4 border border-border rounded-lg bg-surface-50">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">
                  Cash on Delivery
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Pay in cash when your order is delivered</li>
                  <li>• Additional ₹50 COD charges apply</li>
                  <li>• Please keep exact change ready</li>
                  <li>• Available for orders up to ₹50,000</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Payment Method
        </h2>
        <p className="text-text-secondary">
          Choose how you'd like to pay for your order
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
              selectedMethod?.id === method.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
            }`}
            onClick={() => setSelectedMethod(method)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedMethod?.id === method.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-200 text-text-muted'
                }`}>
                  <Icon name={method.icon} size={20} />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-text-primary">
                      {method.name}
                    </h3>
                    {method.popular && (
                      <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">
                    {method.description}
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod?.id === method.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedMethod?.id === method.id && (
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                )}
              </div>
            </div>

            {selectedMethod?.id === method.id && renderPaymentForm()}
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-accent mt-0.5" />
          <div className="text-sm text-accent-800">
            <p className="font-medium mb-1">Secure Payment</p>
            <p className="text-xs">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
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
          Back to Delivery
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!selectedMethod}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodForm;