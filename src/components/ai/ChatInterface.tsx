
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Bot, User, ShoppingCart } from 'lucide-react';
import { cn } from "@/lib/utils";
import MedicalReportUpload from './MedicalReportUpload';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const suggestedQuestions = [
    "What's my health status today?",
    "Can you recommend vitamins for my condition?",
    "Why am I feeling low on energy?",
    "How can I improve my sleep?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load cart count on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCartCount(cartItems.length);
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);
    
    // AI model response simulation
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // If the AI recommended medicines, show them
      if (aiResponse.medicines) {
        setRecommendedMedicines(aiResponse.medicines);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Common symptoms and conditions to detect
    const hasHeadache = lowercaseInput.includes('headache') || lowercaseInput.includes('head pain');
    const hasFever = lowercaseInput.includes('fever') || lowercaseInput.includes('temperature');
    const hasCold = lowercaseInput.includes('cold') || lowercaseInput.includes('cough') || lowercaseInput.includes('congestion');
    const hasSleep = lowercaseInput.includes('sleep') || lowercaseInput.includes('insomnia');
    const hasStomach = lowercaseInput.includes('stomach') || lowercaseInput.includes('digestion');
    const hasStress = lowercaseInput.includes('stress') || lowercaseInput.includes('anxiety');
    const hasEnergy = lowercaseInput.includes('energy') || lowercaseInput.includes('tired') || lowercaseInput.includes('fatigue');
    
    let responseText = '';
    let medicines = null;
    
    // Generate appropriate response based on detected conditions
    if (hasHeadache) {
      responseText = "Based on your description, you seem to be experiencing headache symptoms. This could be due to stress, dehydration, lack of sleep, or eye strain. I recommend taking a break from screens, drinking water, and resting in a quiet, dark room. If headaches persist for more than 3 days, please consult a doctor.";
      medicines = [
        {
          id: 101,
          name: "Acetaminophen 500mg",
          description: "Pain reliever for mild to moderate headaches",
          price: 0.004,
          image: "https://images.unsplash.com/photo-1584308572733-34ba083c3a06?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 102,
          name: "Ibuprofen 200mg",
          description: "Anti-inflammatory pain reliever",
          price: 0.005,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasFever) {
      responseText = "Fever is usually a sign that your body is fighting an infection. Make sure to rest, stay hydrated, and take appropriate medication to manage your temperature. If your fever exceeds 103°F (39.4°C) or lasts more than three days, seek medical attention.";
      medicines = [
        {
          id: 103,
          name: "Acetaminophen 500mg",
          description: "Fever reducer",
          price: 0.004,
          image: "https://images.unsplash.com/photo-1584308572733-34ba083c3a06?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 104,
          name: "Fever Cooling Patches",
          description: "Helps reduce body temperature",
          price: 0.006,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasCold) {
      responseText = "Cold symptoms typically include coughing, sneezing, congestion, and sometimes a mild fever. Rest, stay hydrated, and use over-the-counter medications to manage symptoms. If symptoms worsen or last more than 10 days, you may need medical attention.";
      medicines = [
        {
          id: 105,
          name: "Cold & Flu Relief",
          description: "Multi-symptom cold and flu relief",
          price: 0.008,
          image: "https://images.unsplash.com/photo-1584308572733-34ba083c3a06?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 106,
          name: "Throat Lozenges",
          description: "Soothes sore throat and cough",
          price: 0.003,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasSleep) {
      responseText = "Improving sleep quality starts with good sleep hygiene. Maintain a consistent sleep schedule, create a relaxing bedtime routine, limit screen time before bed, and ensure your sleeping environment is comfortable. Consider natural sleep aids before prescription options.";
      medicines = [
        {
          id: 107,
          name: "Melatonin 5mg",
          description: "Natural sleep aid supplement",
          price: 0.005,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 108,
          name: "Magnesium Glycinate",
          description: "Promotes muscle relaxation and sleep",
          price: 0.006,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasStomach) {
      responseText = "Digestive issues can be caused by diet, stress, or underlying conditions. Stay hydrated, eat smaller meals, and avoid trigger foods. Probiotics may help maintain gut health. If symptoms persist or include severe pain, consult with a healthcare provider.";
      medicines = [
        {
          id: 109,
          name: "Probiotic Complex",
          description: "Supports digestive health",
          price: 0.009,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 110,
          name: "Antacid Tablets",
          description: "Relieves heartburn and indigestion",
          price: 0.004,
          image: "https://images.unsplash.com/photo-1584308572733-34ba083c3a06?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasStress) {
      responseText = "Managing stress is essential for overall well-being. Try relaxation techniques like deep breathing, meditation, or yoga. Regular physical activity, adequate sleep, and healthy eating can also help reduce stress levels. Consider talking to a mental health professional if stress becomes overwhelming.";
      medicines = [
        {
          id: 111,
          name: "Magnesium Complex",
          description: "Helps with stress and relaxation",
          price: 0.007,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 112,
          name: "L-Theanine",
          description: "Promotes calmness without drowsiness",
          price: 0.008,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else if (hasEnergy) {
      responseText = "Low energy levels can be caused by poor sleep, inadequate nutrition, dehydration, stress, or underlying medical conditions. Try to improve your sleep quality, stay hydrated, eat a balanced diet rich in vitamins and minerals, and engage in regular physical activity. B vitamins and iron supplements may help boost energy.";
      medicines = [
        {
          id: 113,
          name: "B-Complex Vitamins",
          description: "Supports energy metabolism",
          price: 0.006,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 114,
          name: "Iron + Vitamin C",
          description: "Helps with energy and oxygen transport",
          price: 0.007,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        }
      ];
    } else {
      responseText = "Thank you for your question. Based on the information you've provided, I'd recommend focusing on maintaining a balanced lifestyle with regular exercise, proper nutrition, adequate hydration, and sufficient rest. If you have specific health concerns, please provide more details so I can offer more personalized guidance.";
    }
    
    return {
      text: responseText,
      medicines: medicines
    };
  };

  const handleReportAnalysis = (analysis: string) => {
    // Add a system message about the upload
    const uploadMessage: Message = {
      id: Date.now().toString(),
      text: "Medical report uploaded for analysis...",
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, uploadMessage]);
    setIsTyping(true);
    
    // Extract recommended medicines from the analysis
    if (analysis.includes("Recommended Medicines:")) {
      // Create sample medicine data
      const medicines: Medicine[] = [
        {
          id: 101,
          name: "Omega-3 Fish Oil Capsules",
          description: "1000mg - Take 1 daily with meal",
          price: 0.008,
          image: "https://images.unsplash.com/photo-1584308572733-34ba083c3a06?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 102,
          name: "Vitamin D3",
          description: "2000 IU - Take 1 daily with breakfast",
          price: 0.006,
          image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 103,
          name: "Plant Sterols Complex",
          description: "For cholesterol management",
          price: 0.012,
          image: "https://images.unsplash.com/photo-1550572017-69b12867229f?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 104,
          name: "CoQ10",
          description: "100mg - Support heart health",
          price: 0.015,
          image: "https://images.unsplash.com/photo-1619566758708-3b8aac3274e6?auto=format&fit=crop&q=80&w=400"
        }
      ];
      
      setRecommendedMedicines(medicines);
    }
    
    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: analysis,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const addToCart = (medicine: Medicine) => {
    // Get existing cart
    const savedCart = localStorage.getItem('cart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === medicine.id);
    
    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Item doesn't exist, add it
      cartItems.push({
        ...medicine,
        quantity: 1
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartCount(cartItems.length);
    
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart`,
    });
  };

  return (
    <section className="section-padding bg-background" id="assistant">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            AI Health Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Personal <span className="text-gradient">AI Health</span> Guide
          </h2>
          <p className="text-lg text-muted-foreground">
            Get instant health insights, personalized recommendations, and answers to all your wellness questions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden">
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-white/20 mr-3">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-medium">MedAI Health Assistant</h3>
                  <p className="text-sm text-primary-foreground/80">Always online</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MedicalReportUpload onAnalysisComplete={handleReportAnalysis} />
                
                <Link to="/cart">
                  <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20 relative">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="h-96 overflow-y-auto p-6 bg-muted/20 dark:bg-zinc-800/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[85%] mb-4",
                    message.sender === 'user' ? "ml-auto" : "mr-auto"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={16} className="text-primary-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "rounded-2xl p-4",
                        message.sender === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-background dark:bg-zinc-800 text-foreground rounded-tl-none shadow-sm"
                      )}
                    >
                      <p>{message.text}</p>
                      <div 
                        className={cn(
                          "text-xs mt-1",
                          message.sender === 'user' 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User size={16} className="text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Recommended Medicines Section */}
              {recommendedMedicines.length > 0 && (
                <div className="max-w-full mr-auto mb-6 bg-background dark:bg-zinc-800 rounded-xl shadow-sm p-4">
                  <h3 className="font-medium mb-3">Recommended Medicines Based on Your Symptoms</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendedMedicines.map(medicine => (
                      <div key={medicine.id} className="flex border rounded-lg overflow-hidden bg-card">
                        <div className="w-16 h-16 bg-muted flex-shrink-0">
                          <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-medium line-clamp-1">{medicine.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">{medicine.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs font-semibold">{medicine.price} ETH</span>
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="h-7 text-xs px-2"
                              onClick={() => addToCart(medicine)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {isTyping && (
                <div className="max-w-[85%] mr-auto mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={16} className="text-primary-foreground" />
                    </div>
                    
                    <div className="bg-background dark:bg-zinc-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested questions */}
            <div className="px-6 py-3 border-t border-border overflow-x-auto whitespace-nowrap">
              <div className="flex gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm whitespace-nowrap hover:bg-muted/70 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors">
                  <Plus size={20} />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your health question..."
                    className="w-full px-4 py-3 bg-muted/50 dark:bg-zinc-800/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <button 
                  className="p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                  aria-label="Voice input"
                >
                  <Mic size={20} />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    inputText.trim()
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
