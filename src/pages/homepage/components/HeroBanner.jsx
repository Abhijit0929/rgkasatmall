import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: "Exquisite Bridal Collection",
      subtitle: "Discover timeless elegance for your special day",
      description: "Handcrafted sarees with intricate embroidery and premium fabrics",
      image: "https://plus.unsplash.com/premium_photo-1724762178418-c25eb7c81307?q=80&w=974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "Shop Bridal Sarees",
      ctaLink: "/product-catalog?category=bridal",
      offer: "Up to 30% Off",
      bgGradient: "from-primary-900 via-primary-800 to-primary-700"
    },
    {
      id: 2,
      title: "Festival Special Collection",
      subtitle: "Celebrate traditions with vibrant colors",
      description: "Premium silk sarees perfect for festivals and celebrations",
      image: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "Explore Festival Wear",
      ctaLink: "/product-catalog?category=festival",
      offer: "Free Shipping",
      bgGradient: "from-secondary-800 via-secondary-700 to-secondary-600"
    },
    {
      id: 3,
      title: "Contemporary Elegance",
      subtitle: "Modern designs with traditional charm",
      description: "Designer sarees for the contemporary Indian woman",
      image: "https://images.unsplash.com/photo-1614951841462-92cb7e25f7fb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "Shop Designer Collection",
      ctaLink: "/product-catalog?category=designer",
      offer: "New Arrivals",
      bgGradient: "from-accent-800 via-accent-700 to-accent-600"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = heroSlides[currentSlide];

return (
  <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-surface-100">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <Image
        src={currentSlideData.image}
        alt={currentSlideData.title}
        className="w-full h-full object-cover transition-all duration-700"
      />
      {/* 
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.bgGradient} opacity-75`} />
      */}
    </div>


      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Offer Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4 animate-fade-in">
              <Icon name="Sparkles" size={16} className="mr-2" />
              {currentSlideData.offer}
            </div>

            {/* Main Content */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                {currentSlideData.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 font-medium">
                {currentSlideData.subtitle}
              </p>
              
              <p className="text-base text-gray-300 max-w-lg">
                {currentSlideData.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to={currentSlideData.ctaLink}>
                  <Button
                    variant="primary"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    {currentSlideData.ctaText}
                  </Button>
                </Link>
                
                <Link to="/product-catalog">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Eye"
                    iconPosition="left"
                    className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-black"
                  >
                    View All Collections
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110' :'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;