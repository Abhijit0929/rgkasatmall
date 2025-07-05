import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BrandHeritage = () => {
  const heritageStats = [
    {
      icon: "Calendar",
      value: "50+",
      label: "Years of Excellence",
      description: "Serving customers since 1974"
    },
    {
      icon: "Users",
      value: "10,000+",
      label: "Happy Customers",
      description: "Trusted by families across India"
    },
    {
      icon: "Award",
      value: "25+",
      label: "Awards Won",
      description: "Recognition for quality and service"
    },
    {
      icon: "MapPin",
      value: "15+",
      label: "Store Locations",
      description: "Across major Indian cities"
    }
  ];

  const craftmanshipFeatures = [
    {
      icon: "Scissors",
      title: "Handcrafted Excellence",
      description: "Each saree is meticulously crafted by skilled artisans using traditional techniques passed down through generations."
    },
    {
      icon: "Gem",
      title: "Premium Materials",
      description: "We source the finest silk, cotton, and other premium fabrics directly from renowned textile centers across India."
    },
    {
      icon: "Palette",
      title: "Authentic Designs",
      description: "Our designs celebrate India's rich textile heritage while incorporating contemporary elements for modern appeal."
    },
    {
      icon: "Shield",
      title: "Quality Assurance",
      description: "Every saree undergoes rigorous quality checks to ensure it meets our high standards of excellence."
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Our Heritage Story
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            For over five decades, R.G Kasat has been synonymous with quality, tradition, and elegance. 
            Our journey began with a simple vision: to bring the finest Indian textiles to discerning customers.
          </p>
        </div>

        {/* Heritage Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {heritageStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-surface-50 rounded-2xl hover:bg-surface-100 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size={24} className="text-primary-foreground" />
              </div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-text-primary mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Main Heritage Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Heritage Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-strong">
              <Image
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nowLXGjCIFbbzgVsZ07UwNYKhhfTDWPcq4PPUNq7Isb8HhBd8Z4d6hEiiblDE0MLyHZgAHlJsiEjxGY_7VVkYaHt0qtwWxBW-HaImZCFidxqfqXFjx5TKiiBJ6Xxms557Sb0U1-=s680-w680-h510-rw"
                alt="R.G Kasat Heritage - Traditional saree weaving"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Floating Heritage Badge */}
            <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-strong">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold">Est.</div>
                <div className="text-3xl font-heading font-bold">1974</div>
              </div>
            </div>
          </div>

          {/* Heritage Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary rounded-full text-sm font-medium">
              <Icon name="Crown" size={16} className="mr-2" />
              Legacy of Excellence
            </div>

            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
              Weaving Dreams Since 1974
            </h3>

            <div className="space-y-4 text-text-secondary">
              <p>
                Founded by Shri R.G Kasat with a passion for preserving India's rich textile heritage, 
                our journey began in a small shop in the heart of the textile district. What started 
                as a dream to share authentic Indian sarees has grown into a trusted name across the country.
              </p>
              
              <p>
                Today, we continue to honor our founder's vision by maintaining the highest standards 
                of quality and authenticity. Every saree in our collection tells a story of skilled 
                craftsmanship, cultural heritage, and timeless elegance.
              </p>
              
              <p>
                From traditional handloom weaves to contemporary designer pieces, we bridge the gap 
                between heritage and modernity, ensuring that every woman finds her perfect saree 
                that celebrates her unique style and grace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
              >
                Read Our Story
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="MapPin"
                iconPosition="left"
              >
                Visit Our Stores
              </Button>
            </div>
          </div>
        </div>

        {/* Craftsmanship Features */}
        <div className="bg-surface-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
              The Art of Craftsmanship
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our saree creation process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftmanshipFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon} size={24} className="text-primary-foreground" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-3">
                  {feature.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHeritage;