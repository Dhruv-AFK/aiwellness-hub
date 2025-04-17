import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2, ArrowRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const initialCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(initialCart);
  }, []);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleMetaMaskCheckout = async () => {
    setIsProcessing(true);
    
    if (!window.ethereum) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to continue with the checkout process.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect to MetaMask.");
      }
      
      const total = calculateTotal();
      const totalInWei = `0x${(total * 1e18).toString(16)}`;
      
      const transactionParameters = {
        to: '0x0000000000000000000000000000000000000000',
        from: accounts[0],
        value: totalInWei,
        gas: '0x5208',
      };
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      toast({
        title: "Payment successful!",
        description: `Transaction hash: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`,
      });
      
      setCartItems([]);
      localStorage.removeItem('cart');
      
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error("Transaction failed:", error);
      toast({
        title: "Transaction failed",
        description: error instanceof Error ? error.message : "Something went wrong with your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Your Cart
          </h1>
          
          {cartItems.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Your cart is empty</h2>
                  <p className="text-muted-foreground mb-4">
                    Browse our products and add items to your cart.
                  </p>
                  <Link to="/#products">
                    <Button>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-[1fr_350px]">
              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Items ({cartItems.length})</CardTitle>
                      <CardDescription>Review your items before checkout</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Clear Cart
                    </Button>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex flex-col sm:flex-row py-4 px-6 gap-4">
                          <div className="w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="flex items-center justify-between mt-2 gap-2">
                              <div className="flex items-center">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 rounded-r-none p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="px-4 h-8 border-y flex items-center justify-center">
                                  {item.quantity}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 rounded-l-none p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right font-medium">
                            {item.price.toFixed(3)} BASE
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{calculateTotal().toFixed(3)} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas Fees (estimated)</span>
                      <span>0.001 ETH</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{(calculateTotal() + 0.001).toFixed(3)} ETH</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button 
                      className="w-full flex items-center gap-2 animate-pulse" 
                      size="lg"
                      onClick={handleMetaMaskCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Checkout with MetaMask"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Alert className="bg-muted/50 border border-primary/20">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <AlertTitle>Secure Transaction</AlertTitle>
                      <AlertDescription className="text-sm">
                        Your payment will be processed securely via MetaMask on Base Sepolia.
                      </AlertDescription>
                    </Alert>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
