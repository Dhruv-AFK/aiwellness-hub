
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Bot, User } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "What's my health status today?",
    "Can you recommend foods for my dosha?",
    "Why am I feeling low on energy?",
    "How can I improve my sleep?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    // Simple simulation of AI responses
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('health') || lowercaseInput.includes('status')) {
      return "Based on your recent vitals and activity patterns, you're maintaining good health. Your heart rate variability has improved by 8% this week, suggesting better stress management. I recommend continuing your meditation practice and perhaps adding 10 minutes of yoga in the morning.";
    } else if (lowercaseInput.includes('dosha') || lowercaseInput.includes('food')) {
      return "Your Ayurvedic profile suggests a predominant Pitta dosha. For balance, I recommend cooling foods like cucumber, coconut water, and mint tea. Reduce spicy foods and caffeine. Would you like a personalized meal plan based on this?";
    } else if (lowercaseInput.includes('energy') || lowercaseInput.includes('tired')) {
      return "Your energy dip could be related to your recent sleep patterns and slightly elevated stress levels. Consider adjusting your bedtime ritual and adding adaptogenic herbs like Ashwagandha to your regimen. I can suggest a specific supplement from our store if you're interested.";
    } else if (lowercaseInput.includes('sleep')) {
      return "Your sleep quality shows room for improvement. Consider establishing a consistent sleep schedule, limiting screen time before bed, and creating a calming bedtime routine. Our analysis suggests that a 10:30 PM bedtime would align best with your natural circadian rhythm.";
    } else {
      return "Thank you for your question. Based on your health profile, I would recommend focusing on balanced nutrition, regular exercise, and stress management techniques. Is there a specific aspect of your wellness journey you'd like more personalized guidance on?";
    }
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

  return (
    <section className="section-padding bg-background" id="assistant">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            AI Health Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Personal <span className="text-gradient">AI Wellness</span> Guide
          </h2>
          <p className="text-lg text-muted-foreground">
            Get instant health insights, personalized recommendations, and answers to all your wellness questions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden">
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center">
              <div className="p-2 rounded-full bg-white/20 mr-3">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-medium">AyurAI Health Assistant</h3>
                <p className="text-sm text-primary-foreground/80">Always online</p>
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
