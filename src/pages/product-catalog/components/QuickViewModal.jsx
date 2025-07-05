import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const mockImages = [
    product.image,
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop"
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    onAddToCart?.({
      ...product,
      selectedSize,
      quantity
    });
    
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const discount = calculateDiscount();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text-primary bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Close quick view"
        >
          <Icon name="X" size={20} className="text-text-muted" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh]">
          {/* Image Section */}
          <div className="relative bg-surface-50 p-6">
            {/* Main Image */}
            <div className="aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-surface-100">
              <Image
                src={mockImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {discount > 0 && (
                  <div className="bg-error text-error-foreground text-xs font-semibold px-2 py-1 rounded-md">
                    {discount}% OFF
                  </div>
                )}
                {product.isNew && (
                  <div className="bg-success text-success-foreground text-xs font-semibold px-2 py-1 rounded-md">
                    NEW
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {mockImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-primary' :'border-border hover:border-primary-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <p className="text-sm text-text-muted mb-2 capitalize">
                  {product.category}
                </p>
                <h2 className="text-2xl font-semibold text-text-primary mb-3">
                  {product.name}
                </h2>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-secondary fill-current' :'text-surface-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-muted">
                      {product.rating} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-text-primary mb-2">Description</h3>
                <p className="text-text-secondary leading-relaxed">
                  {product.description || `Elegant ${product.category} saree crafted with premium materials. Perfect for special occasions and celebrations. Features intricate designs and comfortable fabric that drapes beautifully.`}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-surface-100 text-text-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <h3 className="font-medium text-text-primary mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium text-text-primary mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  product.inStock ? 'bg-success' : 'bg-error'
                }`} />
                <span className={`text-sm font-medium ${
                  product.inStock ? 'text-success' : 'text-error'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize}
                  className="w-full"
                  iconName="ShoppingCart"
                  iconSize={18}
                >
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    iconName="Heart"
                    iconSize={16}
                  >
                    Add to Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    iconName="Share2"
                    iconSize={16}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;