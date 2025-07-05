import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Silk Sarees",
      description: "Premium silk collection",
      image: "https://images.unsplash.com/photo-1610189013429-a703f4b245cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNhcmVlfGVufDB8fDB8fHww",
      link: "/product-catalog?category=silk",
      productCount: "150+ Designs",
      featured: true,
      gradient: "from-primary-600 to-primary-800"
    },
    {
      id: 2,
      name: "Cotton Sarees",
      description: "Comfortable daily wear",
      image: "https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhcmVlfGVufDB8fDB8fHww",
      link: "/product-catalog?category=cotton",
      productCount: "200+ Designs",
      featured: false,
      gradient: "from-accent-600 to-accent-800"
    },
    {
      id: 3,
      name: "Designer Sarees",
      description: "Contemporary elegance",
      image: "https://images.unsplash.com/photo-1610030469069-cb6620bea733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHNhcmVlfGVufDB8fDB8fHww",
      link: "/product-catalog?category=designer",
      productCount: "80+ Designs",
      featured: true,
      gradient: "from-secondary-600 to-secondary-800"
    },
    {
      id: 4,
      name: "Bridal Collection",
      description: "Wedding special sarees",
      image: "https://images.unsplash.com/photo-1610189335437-3cbce21d9d5f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/product-catalog?category=bridal",
      productCount: "120+ Designs",
      featured: true,
      gradient: "from-primary-700 to-primary-900"
    },
    {
      id: 5,
      name: "Georgette Sarees",
      description: "Flowing and graceful",
      image: "https://images.unsplash.com/photo-1684961415565-80383f48c0c2?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/product-catalog?category=georgette",
      productCount: "90+ Designs",
      featured: false,
      gradient: "from-accent-700 to-accent-900"
    },
    {
      id: 6,
      name: "Chiffon Sarees",
      description: "Light and elegant",
      image: "https://plus.unsplash.com/premium_photo-1661964243697-734d7bd664ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHNhcmVlfGVufDB8fDB8fHww",
      link: "/product-catalog?category=chiffon",
      productCount: "70+ Designs",
      featured: false,
      gradient: "from-secondary-700 to-secondary-900"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our curated collection of traditional and contemporary sarees, 
            each crafted with attention to detail and quality
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl bg-surface-100 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay 
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} /> */}
                
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    <Icon name="Star" size={14} className="inline mr-1" />
                    Featured
                  </div>
                )}

                {/* Product Count */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {category.productCount}
                </div>
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl lg:text-2xl font-heading font-semibold mb-2 group-hover:text-secondary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4">
                  {category.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-secondary font-medium group-hover:text-white transition-colors duration-300">
                  <span className="mr-2">Explore Collection</span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="transform group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-12">
          <Link to="/product-catalog">
            <button className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 shadow-soft hover:shadow-medium">
              <span className="mr-2">View All Categories</span>
              <Icon name="Grid3X3" size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;