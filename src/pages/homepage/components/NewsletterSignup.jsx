import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: "Sparkles",
      title: "Exclusive Offers",
      description: "Get first access to sales and special discounts"
    },
    {
      icon: "Bell",
      title: "New Arrivals",
      description: "Be the first to know about our latest collections"
    },
    {
      icon: "Calendar",
      title: "Festival Updates",
      description: "Seasonal collections and festival special offers"
    },
    {
      icon: "Gift",
      title: "Special Events",
      description: "Invitations to exclusive fashion shows and events"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-strong p-8 lg:p-12">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-white" />
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
              Welcome to Our Family!
            </h2>
            
            <p className="text-lg text-text-secondary mb-8">
              Thank you for subscribing to our newsletter. You'll receive exclusive updates, 
              offers, and the latest from R.G Kasat Saree Mall directly in your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                iconName="ShoppingBag"
                iconPosition="left"
                onClick={() => window.location.href = '/product-catalog'}
              >
                Start Shopping
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Newsletter Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-6">
              <Icon name="Mail" size={16} className="mr-2" />
              Stay Connected
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-6">
              Join Our Newsletter
            </h2>

            <p className="text-lg text-text-secondary mb-8">
              Subscribe to receive exclusive offers, new collection updates, and styling tips 
              directly in your inbox. Be part of the R.G Kasat family and never miss out on 
              our latest saree collections.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-3xl shadow-strong p-8 lg:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Subscribe Now
              </h3>
              <p className="text-text-secondary">
                Get exclusive access to our latest collections and offers
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
                {error && (
                  <p className="text-error text-sm mt-2 flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                iconName={isLoading ? undefined : "Send"}
                iconPosition="right"
                className="w-full"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>

              <p className="text-xs text-text-muted text-center">
                By subscribing, you agree to our Privacy Policy and Terms of Service. 
                You can unsubscribe at any time.
              </p>
            </form>

            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center">
                  <Icon name="Users" size={16} className="mr-1" />
                  <span>5,000+ subscribers</span>
                </div>
                <div className="w-1 h-1 bg-text-muted rounded-full" />
                <div className="flex items-center">
                  <Icon name="Star" size={16} className="mr-1 text-secondary" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-muted mb-6">
            Trusted by thousands of customers across India
          </p>
          
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-accent" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-secondary" />
              <span className="text-sm font-medium">Instant Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={20} className="text-primary" />
              <span className="text-sm font-medium">No Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;