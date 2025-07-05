import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductShowcase = () => {
  const [activeSection, setActiveSection] = useState('trending');
  const scrollContainerRef = useRef(null);

  const productSections = {
    trending: {
      title: "Trending Now",
      subtitle: "Most popular sarees this season",
      products: [
        {
          id: 1,
          name: "Royal Blue Banarasi Silk",
          price: 15999,
          originalPrice: 19999,
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.8,
          reviews: 124,
          isNew: false,
          discount: 20
        },
        {
          id: 2,
          name: "Emerald Green Designer",
          price: 12999,
          originalPrice: 16999,
          image: "https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?q=80&w=409&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.9,
          reviews: 89,
          isNew: true,
          discount: 24
        },
        {
          id: 3,
          name: "Maroon Bridal Collection",
          price: 24999,
          originalPrice: 29999,
          image: "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.7,
          reviews: 156,
          isNew: false,
          discount: 17
        },
        {
          id: 4,
          name: "Pink Georgette Elegance",
          price: 8999,
          originalPrice: 11999,
          image: "https://plus.unsplash.com/premium_photo-1724762182780-000d248f9301?q=80&w=417&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.6,
          reviews: 78,
          isNew: true,
          discount: 25
        },
        {
          id: 5,
          name: "Golden Silk Masterpiece",
          price: 18999,
          originalPrice: 22999,
          image: "https://images.unsplash.com/photo-1610189019383-606d9eaa6766?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.8,
          reviews: 203,
          isNew: false,
          discount: 17
        }
      ]
    },
    seasonal: {
      title: "Seasonal Favorites",
      subtitle: "Perfect for current festivities",
      products: [
        {
          id: 6,
          name: "Festival Red Silk",
          price: 13999,
          originalPrice: 17999,
          image: "https://images.unsplash.com/photo-1609748340878-c690e3e4706b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.7,
          reviews: 92,
          isNew: true,
          discount: 22
        },
        {
          id: 7,
          name: "Orange Festive Wear",
          price: 10999,
          originalPrice: 13999,
          image: "https://images.unsplash.com/photo-1609748341651-42920e667214?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.5,
          reviews: 67,
          isNew: false,
          discount: 21
        },
        {
          id: 8,
          name: "Yellow Celebration Silk",
          price: 16999,
          originalPrice: 20999,
          image: "https://images.unsplash.com/photo-1609748341932-f0206c09412b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.8,
          reviews: 134,
          isNew: true,
          discount: 19
        }
      ]
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const currentSection = productSections[activeSection];

  return (
    <section className="py-12 lg:py-16 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
              {currentSection.title}
            </h2>
            <p className="text-lg text-text-secondary">
              {currentSection.subtitle}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex bg-surface-100 rounded-lg p-1">
            {Object.keys(productSections).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === section
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {productSections[section].title}
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200 z-10"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200 z-10"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentSection.products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200">
                      <Icon name="Heart" size={18} />
                    </button>
                    <Link to={`/product-detail?id=${product.id}`}>
                      <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200">
                        <Icon name="Eye" size={18} />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-secondary fill-current' :'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-text-muted line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8">
          <Link to="/product-catalog">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;