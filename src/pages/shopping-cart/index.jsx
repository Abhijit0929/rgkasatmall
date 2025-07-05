import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedForLater from './components/SavedForLater';
import RecentlyViewed from './components/RecentlyViewed';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data
  const mockCartItems = [
    {
      id: 1,
      name: "Banarasi Silk Saree with Golden Zari Work",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      price: 8500,
      originalPrice: 12000,
      quantity: 1,
      maxQuantity: 5,
      size: "Free Size",
      color: "Royal Blue",
      fabric: "Pure Silk",
      stockStatus: "in-stock",
      stockCount: 8
    },
    {
      id: 2,
      name: "Handwoven Cotton Saree with Block Print",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      price: 2800,
      originalPrice: 3500,
      quantity: 2,
      maxQuantity: 10,
      size: "Free Size",
      color: "Emerald Green",
      fabric: "Cotton",
      stockStatus: "low-stock",
      stockCount: 3
    },
    {
      id: 3,
      name: "Designer Georgette Saree with Embroidery",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      price: 4200,
      originalPrice: 5500,
      quantity: 1,
      maxQuantity: 7,
      size: "Free Size",
      color: "Maroon",
      fabric: "Georgette",
      stockStatus: "in-stock",
      stockCount: 15
    }
  ];

  const mockSavedItems = [
    {
      id: 4,
      name: "Kanjivaram Silk Saree with Temple Border",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      price: 15000,
      originalPrice: 18000,
      selectedSize: "Free Size",
      selectedColor: "Deep Purple",
      stockStatus: "in-stock"
    },
    {
      id: 5,
      name: "Chiffon Saree with Floral Print",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      price: 3200,
      originalPrice: 4000,
      selectedSize: "Free Size",
      selectedColor: "Pink",
      stockStatus: "low-stock",
      stockCount: 2
    }
  ];

  const mockRecentlyViewed = [
    {
      id: 6,
      name: "Tussar Silk Saree",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      price: 6500,
      originalPrice: 8000,
      rating: 4.5
    },
    {
      id: 7,
      name: "Linen Saree with Zari",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      price: 4800,
      rating: 4.2
    },
    {
      id: 8,
      name: "Net Saree with Sequins",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      price: 5200,
      originalPrice: 6500,
      rating: 4.7
    }
  ];

  const mockSuggestedProducts = [
    {
      id: 9,
      name: "Organza Saree with Embellishments",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      price: 7200,
      originalPrice: 9000,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 10,
      name: "Chanderi Silk Saree",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      price: 5800,
      rating: 4.4,
      reviews: 156
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    const loadCartData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load from localStorage or use mock data
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        } else {
          setCartItems(mockCartItems);
        }
        
        setSavedItems(mockSavedItems);
        setRecentlyViewed(mockRecentlyViewed);
        setSuggestedProducts(mockSuggestedProducts);
      } catch (error) {
        console.error('Error loading cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartCount', cartItems.reduce((sum, item) => sum + item.quantity, 0).toString());
    } else {
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
    }
    
    // Dispatch cart update event
    const event = new CustomEvent('cartUpdated', {
      detail: { count: cartItems.reduce((sum, item) => sum + item.quantity, 0) }
    });
    window.dispatchEvent(event);
  }, [cartItems]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    if (itemToSave) {
      setSavedItems(prevSaved => [...prevSaved, {
        ...itemToSave,
        selectedSize: itemToSave.size,
        selectedColor: itemToSave.color
      }]);
      handleRemoveItem(itemId);
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    if (itemToMove) {
      setCartItems(prevCart => [...prevCart, {
        ...itemToMove,
        quantity: 1,
        maxQuantity: 10,
        size: itemToMove.selectedSize,
        color: itemToMove.selectedColor
      }]);
      setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
    }
  };

  const handleRemoveSavedItem = (itemId) => {
    setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
  };

  const handleApplyPromoCode = async (promoCode) => {
    // Mock promo code validation
    const validPromoCodes = {
      'SAVE10': { discount: 10, message: '10% discount applied!' },
      'FIRST20': { discount: 20, message: '20% discount for first-time buyers!' },
      'FESTIVAL15': { discount: 15, message: '15% festival discount applied!' }
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validPromoCodes[promoCode]) {
      return {
        success: true,
        ...validPromoCodes[promoCode]
      };
    } else {
      return {
        success: false,
        message: 'Invalid promo code. Please try again.'
      };
    }
  };

  const handleProceedToCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.href = '/checkout-process';
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; // Will be updated when promo code is applied
  const shipping = subtotal >= 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal - discount + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-surface-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-surface-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-surface-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb />
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
              Shopping Cart
            </h1>
            {cartItems.length > 0 && (
              <p className="text-text-secondary mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/product-catalog'}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Continue Shopping
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart 
            recentlyViewed={recentlyViewed}
            suggestedProducts={suggestedProducts}
          />
        ) : (
          <>
            {/* Cart Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>

                {/* Security Info */}
                <div className="mt-6 p-4 bg-surface-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" size={20} className="text-success-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        Secure Shopping
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Your payment information is encrypted and secure. We offer easy returns 
                        within 30 days and provide authentic products with quality guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                  onApplyPromoCode={handleApplyPromoCode}
                  onProceedToCheckout={handleProceedToCheckout}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* Saved for Later */}
            <SavedForLater
              items={savedItems}
              onMoveToCart={handleMoveToCart}
              onRemove={handleRemoveSavedItem}
            />

            {/* Recently Viewed */}
            <RecentlyViewed items={recentlyViewed} />
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;