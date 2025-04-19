import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Wallet, ShoppingCart, HandCoins } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { 
    label: 'Services', 
    href: '#services',
    children: [
      { label: 'AI Diagnostics', href: '#diagnostics' },
      { label: 'Health Assistant', href: '#assistant' },
      { label: 'Consultations', href: '#doctors' },
    ]
  },
  { label: 'Products', href: '#products' },
  { label: 'Fundraise', href: '/fundraise' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      setCartItemsCount(cartItems.length);
    };
    
    updateCartCount();
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setWalletAddress(account);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14A34' }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x14A34',
                  chainName: 'Base Sepolia',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://sepolia.base.org'],
                  blockExplorerUrls: ['https://sepolia-explorer.base.org'],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const formatWalletAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        scrolled ? "py-3 backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 shadow-md" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-health-blue to-health-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-foreground">MedAI</span>
        </a>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.href.startsWith('/') ? item.href : '#'}
                className="px-4 py-2 rounded-full text-foreground hover:bg-muted transition-colors duration-200 flex items-center"
                onClick={() => item.children && setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label === 'Fundraise' && <HandCoins className="mr-2 h-4 w-4" />}
                {item.label}
                {item.children && (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </Link>
              
              {item.children && (
                <div className="absolute left-0 mt-1 w-48 rounded-xl bg-white dark:bg-zinc-900 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={walletAddress ? undefined : connectWallet}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm bg-muted hover:bg-muted/80 transition-colors"
            title={walletAddress || "Connect MetaMask to Base Sepolia"}
          >
            <Wallet className="h-4 w-4" />
            <span className="max-w-[100px] truncate">
              {walletAddress ? formatWalletAddress(walletAddress) : "Connect Wallet"}
            </span>
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <a href="#get-started" className="hidden md:block btn-primary">
            Get Started
          </a>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white dark:bg-zinc-900 transition-transform duration-300 pt-24 px-6 pb-6",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.href.startsWith('/') ? item.href : '#'}
                className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                onClick={() => {
                  if (!item.children) setIsOpen(false);
                  else setOpenDropdown(openDropdown === item.label ? null : item.label);
                }}
              >
                <div className="flex justify-between items-center">
                  {item.label === 'Fundraise' && <HandCoins className="mr-2 h-4 w-4" />}
                  {item.label}
                  {item.children && (
                    <ChevronDown className={cn(
                      "transition-transform duration-200",
                      openDropdown === item.label ? "rotate-180" : ""
                    )} />
                  )}
                </div>
              </Link>
              
              {item.children && openDropdown === item.label && (
                <div className="mt-1 pl-4 border-l-2 border-muted space-y-2">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block py-2 px-4 text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <button
            onClick={walletAddress ? undefined : connectWallet}
            className="flex items-center gap-2 py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Wallet className="h-5 w-5" />
            <span>
              {walletAddress ? formatWalletAddress(walletAddress) : "Connect Wallet"}
            </span>
          </button>
          
          <Link
            to="/cart"
            className="flex items-center gap-2 py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
          </Link>
          
          <a
            href="#get-started"
            className="mt-4 btn-primary text-center"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
