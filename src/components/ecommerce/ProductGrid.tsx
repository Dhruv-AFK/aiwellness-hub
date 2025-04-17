
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Filter, Eye, ArrowUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Example product data
const products = [
  {
    id: 1,
    name: "Ayurvedic Immunity Booster",
    description: "Natural herbal supplement to strengthen immunity",
    price: 0.012,
    image: "https://images.unsplash.com/photo-1607004468138-e7e23ea26947?auto=format&fit=crop&q=80&w=400",
    category: "Supplements",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Organic Ashwagandha Powder",
    description: "Pure & organic stress-relief adaptogen",
    price: 0.008,
    image: "https://images.unsplash.com/photo-1617975850214-347b3c24fae3?auto=format&fit=crop&q=80&w=400",
    category: "Herbs",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Ayurvedic Sleep Formula",
    description: "Herbal blend for restful sleep and relaxation",
    price: 0.015,
    image: "https://images.unsplash.com/photo-1611071638866-0239f4ca5ef3?auto=format&fit=crop&q=80&w=400",
    category: "Wellness",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Natural Joint Support",
    description: "Herbal formula for joint health and mobility",
    price: 0.022,
    image: "https://images.unsplash.com/photo-1515364229230-3be77501e97e?auto=format&fit=crop&q=80&w=400",
    category: "Healthcare",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Ayurvedic Skin Glow Oil",
    description: "Natural face oil for radiant, healthy skin",
    price: 0.018,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400",
    category: "Beauty",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Herbal Digestive Support",
    description: "Ayurvedic blend for optimal digestion",
    price: 0.014,
    image: "https://images.unsplash.com/photo-1563432088968-7a75e4bdb8dc?auto=format&fit=crop&q=80&w=400",
    category: "Digestive",
    rating: 4.7,
  },
];

type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | '';
type FilterCategory = string | null;

const ProductGrid = () => {
  const [sortBy, setSortBy] = useState<SortOption>('');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>(null);
  const [cart, setCart] = useState<number[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get all unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => !filterCategory || product.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });
    
  const addToCart = (productId: number) => {
    // Get the product data
    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) return;
    
    // Get current cart from localStorage
    const savedCart = localStorage.getItem('cart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if product already exists
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === productId);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      updatedCart = [
        ...currentCart, 
        {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.image,
          description: productToAdd.description,
          quantity: 1
        }
      ];
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update local state
    setCart([...cart, productId]);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${productToAdd.name} has been added to your cart.`,
    });
  };
  
  const viewCart = () => {
    navigate('/cart');
  };
  
  return (
    <section id="products" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Personalized Products
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8">
            Discover Ayurvedic products tailored to your unique health profile
          </p>
          
          {/* Filters and sort options */}
          <div className="w-full flex flex-wrap gap-4 mb-8 justify-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-background border rounded-md px-3 py-1 text-sm"
                value={filterCategory || ''}
                onChange={(e) => setFilterCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-background border rounded-md px-3 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
            </div>

            {cart.length > 0 && (
              <div className="flex items-center space-x-2 ml-auto">
                <Button variant="outline" size="sm" onClick={viewCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{cart.length} items</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative pb-[56.25%] bg-muted overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Quick action buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-lg font-bold">{product.price} EDU</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-500">★</span>
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => addToCart(product.id)}
                  disabled={cart.includes(product.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
