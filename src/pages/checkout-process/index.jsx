import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CheckoutHeader from './components/CheckoutHeader';
import ShippingAddressForm from './components/ShippingAddressForm';
import DeliveryOptionsForm from './components/DeliveryOptionsForm';
import PaymentMethodForm from './components/PaymentMethodForm';
import OrderReviewForm from './components/OrderReviewForm';
import OrderSummary from './components/OrderSummary';
import OrderSuccessModal from './components/OrderSuccessModal';

const CheckoutProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showGuestCheckout, setShowGuestCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    deliveryOption: null,
    paymentMethod: null
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // If not authenticated, show guest checkout option
    if (!authStatus) {
      setShowGuestCheckout(true);
    }
  }, []);

  const handleStepNext = (stepData) => {
    switch (currentStep) {
      case 1:
        setCheckoutData(prev => ({ ...prev, shippingAddress: stepData }));
        setCurrentStep(2);
        break;
      case 2:
        setCheckoutData(prev => ({ ...prev, deliveryOption: stepData }));
        setCurrentStep(3);
        break;
      case 3:
        setCheckoutData(prev => ({ ...prev, paymentMethod: stepData }));
        setCurrentStep(4);
        break;
      case 4:
        // Place order
        setOrderDetails(stepData);
        setShowSuccessModal(true);
        break;
      default:
        break;
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGuestCheckout = () => {
    setShowGuestCheckout(false);
    // Continue with guest checkout
  };

  const handleSignIn = () => {
    // Redirect to authentication page
    window.location.href = '/user-authentication?redirect=/checkout-process';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingAddressForm
            onNext={handleStepNext}
            savedAddresses={[]} // Would come from user context
          />
        );
      case 2:
        return (
          <DeliveryOptionsForm
            onNext={handleStepNext}
            onBack={handleStepBack}
            shippingAddress={checkoutData.shippingAddress}
          />
        );
      case 3:
        return (
          <PaymentMethodForm
            onNext={handleStepNext}
            onBack={handleStepBack}
            orderTotal={21998} // Would be calculated from cart
          />
        );
      case 4:
        return (
          <OrderReviewForm
            onPlaceOrder={handleStepNext}
            onBack={handleStepBack}
            shippingAddress={checkoutData.shippingAddress}
            deliveryOption={checkoutData.deliveryOption}
            paymentMethod={checkoutData.paymentMethod}
            cartItems={[]} // Would come from cart context
          />
        );
      default:
        return null;
    }
  };

  // Guest checkout modal
  if (showGuestCheckout) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="fixed inset-0 bg-text-primary bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-strong max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Sign In to Continue
              </h2>
              <p className="text-text-secondary mb-6">
                Sign in to your account for a faster checkout experience, or continue as a guest.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSignIn}
                  iconName="LogIn"
                >
                  Sign In to Your Account
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleGuestCheckout}
                  iconName="UserX"
                >
                  Continue as Guest
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-surface-50 rounded-lg">
                <p className="text-xs text-text-secondary">
                  <Icon name="Shield" size={14} className="inline mr-1" />
                  Your information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <CheckoutHeader currentStep={currentStep} totalSteps={4} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            customItems={[
              { label: 'Home', path: '/homepage', icon: 'Home' },
              { label: 'Shopping Cart', path: '/shopping-cart', icon: 'ShoppingCart' },
              { label: 'Checkout', path: '/checkout-process', icon: 'CreditCard', isLast: true }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg shadow-soft p-6">
              {renderStepContent()}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={[]} // Would come from cart context
              deliveryCharges={checkoutData.deliveryOption?.price || 0}
              codCharges={checkoutData.paymentMethod?.method?.id === 'cod' ? 50 : 0}
            />
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 text-sm text-text-muted">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} className="text-accent" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={16} className="text-accent" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} className="text-accent" />
              <span>PCI Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        orderDetails={orderDetails}
        onClose={() => {
          setShowSuccessModal(false);
          // Redirect to homepage or order tracking
          window.location.href = '/homepage';
        }}
      />

      {/* Emergency Exit */}
      <div className="fixed bottom-4 left-4 z-40">
        <Link to="/shopping-cart">
          <Button
            variant="ghost"
            iconName="ArrowLeft"
            className="bg-background shadow-medium hover:shadow-strong"
          >
            Back to Cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutProcess;