import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      review: "R.G Kasat has been my go-to destination for sarees for over 10 years. The quality is exceptional, and their collection never fails to impress. I recently bought a Banarasi silk saree for my daughter's wedding, and it was absolutely stunning!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      purchaseType: "Bridal Collection",
      verified: true
    },
    {
      id: 2,
      name: "Meera Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      review: "The customer service is outstanding! The staff helped me choose the perfect saree for my sister's engagement ceremony. The fabric quality and intricate work exceeded my expectations. Highly recommended for anyone looking for authentic Indian sarees.",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      purchaseType: "Designer Sarees",
      verified: true
    },
    {
      id: 3,
      name: "Anjali Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      review: "I've been shopping at R.G Kasat for special occasions, and they never disappoint. Their collection of silk sarees is unmatched. The attention to detail and the traditional craftsmanship is evident in every piece. Worth every penny!",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      purchaseType: "Silk Sarees",
      verified: true
    },
    {
      id: 4,
      name: "Kavitha Nair",
      location: "Kochi, Kerala",
      rating: 5,
      review: "Amazing experience shopping online! The saree I ordered looked exactly like the picture, and the delivery was prompt. The packaging was also very elegant. R.G Kasat has maintained their reputation for quality even in their online store.",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      purchaseType: "Online Purchase",
      verified: true
    },
    {
      id: 5,
      name: "Sunita Gupta",
      location: "Delhi, NCR",
      rating: 5,
      review: "Three generations of our family have been loyal customers of R.G Kasat. The trust and quality they maintain is remarkable. Recently purchased sarees for my daughter-in-law's wedding, and everyone complimented the beautiful selection.",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      purchaseType: "Family Collection",
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section className="py-16 lg:py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Hear from our satisfied customers who have experienced the R.G Kasat difference
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute -top-8 -left-8 w-16 h-16 text-primary-200 opacity-50">
            <Icon name="Quote" size={64} />
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-strong p-8 lg:p-12 relative">
            {/* Rating Stars */}
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={20}
                  className={`${
                    i < currentReview.rating
                      ? 'text-secondary fill-current' :'text-gray-300'
                  } mx-1`}
                />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-lg lg:text-xl text-text-primary text-center leading-relaxed mb-8 font-medium">
              "{currentReview.review}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Customer Image */}
              <div className="relative">
                <Image
                  src={currentReview.image}
                  alt={currentReview.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                />
                {currentReview.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </div>

              {/* Customer Details */}
              <div className="text-center sm:text-left">
                <div className="font-heading font-semibold text-text-primary text-lg">
                  {currentReview.name}
                </div>
                <div className="text-text-secondary text-sm mb-1">
                  {currentReview.location}
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary rounded-full text-xs font-medium">
                  <Icon name="ShoppingBag" size={12} className="mr-1" />
                  {currentReview.purchaseType}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 bg-white shadow-medium rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-200 ${
                index === currentTestimonial
                  ? 'w-8 h-3 bg-primary rounded-full' :'w-3 h-3 bg-gray-300 rounded-full hover:bg-primary-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-text-secondary">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-2">2,500+</div>
            <div className="text-sm text-text-secondary">Happy Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-text-secondary">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-text-secondary">Repeat Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;