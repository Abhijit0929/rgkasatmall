import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import StickyAddToCart from './components/StickyAddToCart';
import Icon from '../../components/AppIcon';
import { addToCart } from '../../components/ui/CartBadge';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "Royal Silk Banarasi Saree with Golden Zari Work",
    brand: "Heritage Weaves",
    category: "Banarasi Silk",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    stockCount: 3,
    maxQuantity: 5,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=750&fit=crop",
        tags: ["Front View", "Full Length"]
      },
      {
        url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=750&fit=crop",
        tags: ["Detail View", "Zari Work"]
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=750&fit=crop",
        tags: ["Pallu Design", "Border Detail"]
      },
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=750&fit=crop",
        tags: ["Blouse Piece", "Fabric Texture"]
      }
    ],
    sizes: [
      { value: "free", label: "Free Size", available: true },
      { value: "petite", label: "Petite", available: true },
      { value: "plus", label: "Plus Size", available: false }
    ],
    features: [
      "Handwoven pure silk fabric",
      "Traditional Banarasi zari work",
      "Includes matching blouse piece",
      "Dry clean recommended",
      "Made in Varanasi, India"
    ],
    description: `This exquisite Royal Silk Banarasi Saree represents the pinnacle of Indian textile artistry. Handwoven by master craftsmen in Varanasi, this saree features intricate golden zari work that tells stories of ancient Indian traditions.\n\nThe rich silk fabric drapes beautifully, creating an elegant silhouette that's perfect for weddings, festivals, and special occasions. Each thread is carefully woven to create patterns that have been passed down through generations of skilled artisans.\n\nThe saree comes with a matching blouse piece, allowing you to customize the fit and style according to your preference. The deep, lustrous colors and metallic accents make this piece a timeless addition to any wardrobe.`,
    culturalSignificance: `Banarasi sarees have been a symbol of Indian heritage for over 400 years. Originally created for the Mughal nobility, these sarees represent the perfect fusion of Indian and Persian artistic traditions. The intricate zari work, made with real gold and silver threads, was once reserved for royalty and continues to be a mark of elegance and sophistication.`,
    occasions: ["Weddings", "Festivals", "Religious Ceremonies", "Special Events", "Cultural Programs"],
    specifications: {
      fabric: "Pure Silk",
      work: "Handwoven Zari",
      length: "5.5 meters",
      blousePiece: "0.8 meters",
      weight: "700 grams",
      origin: "Varanasi, India",
      washCare: "Dry Clean Only",
      color: "Deep Maroon with Gold"
    },
    careInstructions: [
      "Dry clean only to preserve the silk and zari work",
      "Store in a cool, dry place away from direct sunlight",
      "Wrap in muslin cloth or cotton fabric for storage",
      "Avoid contact with perfumes and deodorants",
      "Iron on low heat with a cloth barrier",
      "Handle with care to prevent snagging of zari threads"
    ],
    reviews: [
      {
        id: 1,
        userName: "Priya Sharma",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        comment: "Absolutely stunning saree! The quality is exceptional and the zari work is beautiful. Received so many compliments at my sister's wedding.",
        helpful: 12,
        images: []
      },
      {
        id: 2,
        userName: "Meera Patel",rating: 4,date: "1 month ago",
        verified: true,
        comment: "Beautiful saree with rich colors. The silk quality is good but the blouse piece could be a bit longer. Overall satisfied with the purchase.",
        helpful: 8,
        images: []
      },
      {
        id: 3,
        userName: "Anjali Reddy",rating: 5,date: "2 months ago",
        verified: true,
        comment: "This is my third purchase from Heritage Weaves and they never disappoint. The packaging was excellent and the saree is exactly as shown in pictures.",
        helpful: 15,
        images: []
      },
      {
        id: 4,
        userName: "Kavitha Nair",rating: 4,date: "3 months ago",
        verified: true,
        comment: "Good quality saree. The zari work is intricate and the color is vibrant. Delivery was prompt. Would recommend for special occasions.",
        helpful: 6,
        images: []
      }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch product data
    const productId = searchParams.get('id') || '1';
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an API call
        setProduct(mockProduct);
        setError(null);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  const handleAddToCart = (cartData) => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Add to cart logic
    addToCart(cartData?.quantity || quantity);
    
    // Show success message
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleAddToWishlist = (productId) => {
    // Wishlist logic would go here
    console.log('Added to wishlist:', productId);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Add to cart and redirect to checkout
    addToCart(quantity);
    navigate('/checkout-process');
  };

  // Custom breadcrumb for product detail
  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Shop Sarees', path: '/product-catalog', icon: 'ShoppingBag' },
    { label: product?.name || 'Product Details', path: '/product-detail', icon: 'Eye', isLast: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-header-mobile lg:pt-header-desktop">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-square bg-surface-200 rounded-lg"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-16 h-16 bg-surface-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-surface-200 rounded w-3/4"></div>
                  <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                  <div className="h-6 bg-surface-200 rounded w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-surface-200 rounded"></div>
                    <div className="h-4 bg-surface-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-header-mobile lg:pt-header-desktop">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Product Not Found
              </h2>
              <p className="text-text-secondary mb-6">{error}</p>
              <button
                onClick={() => navigate('/product-catalog')}
                className="text-primary hover:underline"
              >
                Browse All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-header-mobile lg:pt-header-desktop">
        {/* Breadcrumb */}
        <div className="bg-surface-50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="order-1">
              <ProductImageGallery 
                images={product.images} 
                productName={product.name}
              />
            </div>

            {/* Product Information */}
            <div className="order-2">
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto">
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-border">
          <RelatedProducts 
            currentProductId={product.id}
            category={product.category}
          />
        </div>

        {/* Sticky Add to Cart (Mobile) */}
        <StickyAddToCart
          product={product}
          selectedSize={selectedSize}
          quantity={quantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
};

export default ProductDetail;