
import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight, Filter, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Ashwagandha Capsules',
    description: 'Organic stress-relief and immunity booster capsules',
    price: 29.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565071559227-20451284a65e?q=80&w=2940&auto=format&fit=crop',
    category: 'Supplements',
    tag: 'Best Seller'
  },
  {
    id: '2',
    name: 'Turmeric Latte Mix',
    description: 'Anti-inflammatory golden milk powder blend',
    price: 19.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f6?q=80&w=2787&auto=format&fit=crop',
    category: 'Foods'
  },
  {
    id: '3',
    name: 'Amla Berry Extract',
    description: 'Vitamin C rich immunity booster',
    price: 24.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2301&auto=format&fit=crop',
    category: 'Supplements',
    tag: 'New'
  },
  {
    id: '4',
    name: 'Meditation Cushion Set',
    description: 'Ergonomic cushion for proper meditation posture',
    price: 59.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2940&auto=format&fit=crop',
    category: 'Lifestyle'
  },
  {
    id: '5',
    name: 'Ayurvedic Face Oil',
    description: 'Balancing facial oil with neem and turmeric',
    price: 34.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2942&auto=format&fit=crop',
    category: 'Skincare'
  },
  {
    id: '6',
    name: 'Triphala Supplement',
    description: 'Digestive health and detoxification support',
    price: 22.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2940&auto=format&fit=crop',
    category: 'Supplements'
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="product-card relative overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-animate="scale"
    >
      {product.tag && (
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-medium ${
          product.tag === 'Best Seller' 
            ? 'bg-health-amber text-black'
            : 'bg-health-blue text-white'
        }`}>
          {product.tag}
        </div>
      )}
      
      <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Heart size={16} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 pt-4 flex flex-col">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(product.rating) ? "text-health-amber fill-health-amber" : "text-muted"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="font-bold text-lg">${product.price}</div>
          <button className="btn-primary py-2 px-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const categories = ['All', 'Supplements', 'Foods', 'Skincare', 'Lifestyle'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section className="section-padding bg-muted/30 dark:bg-zinc-900/50" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-health-amber/10 text-health-amber text-sm font-medium mb-4">
            Personalized Products
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ayurvedic <span className="text-gradient">Essentials</span> For You
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover premium quality Ayurvedic products tailored to your specific health needs,
            curated by our AI based on your unique constitution.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-zinc-800 text-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <button className="p-2.5 rounded-full bg-white dark:bg-zinc-800 text-foreground hover:bg-muted transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View All Products
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
