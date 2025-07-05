import React from 'react';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import ProductShowcase from './components/ProductShowcase';
import BrandHeritage from './components/BrandHeritage';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import NewsletterSignup from './components/NewsletterSignup';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Featured Categories Section */}
      <CategoryGrid />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Brand Heritage Section */}
      <BrandHeritage />

      {/* Customer Testimonials Section */}
      <TestimonialsCarousel />

      {/* Newsletter Signup Section */}
      <NewsletterSignup />
    </div>
  );
};

export default Homepage;