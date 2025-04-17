
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Brain, Activity } from 'lucide-react';

const HeroSection: React.FC = () => {
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingIconsRef.current) return;
      
      const icons = floatingIconsRef.current.querySelectorAll('.floating-icon');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      icons.forEach((icon, index) => {
        const speed = (index + 1) * 0.03;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        (icon as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20" id="home">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-70" />
      
      {/* Gradient orbs */}
      <div className="absolute w-80 h-80 rounded-full bg-health-blue/20 blur-3xl top-20 -left-20" />
      <div className="absolute w-80 h-80 rounded-full bg-health-purple/20 blur-3xl bottom-20 right-20" />
      
      {/* Floating Icons */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-icon absolute top-[20%] left-[15%] p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <Heart size={24} className="text-health-blue" />
        </div>
        <div className="floating-icon absolute top-[30%] right-[10%] p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <Brain size={24} className="text-health-purple" />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[10%] p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <Activity size={24} className="text-health-amber" />
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6 animate-slide-up">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Reimagine Healthcare with AI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your <span className="text-gradient">Personalized</span> <br />
              AI Health Companion
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Experience the convergence of medical expertise and cutting-edge AI technology for personalized healthcare.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#get-started" className="btn-primary flex items-center gap-2">
                Get Started
                <ArrowRight size={18} />
              </a>
              <a href="#learn-more" className="btn-outline">
                Learn More
              </a>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-health-blue flex items-center justify-center text-white font-bold text-sm border-2 border-background">A</div>
                <div className="w-10 h-10 rounded-full bg-health-purple flex items-center justify-center text-white font-bold text-sm border-2 border-background">B</div>
                <div className="w-10 h-10 rounded-full bg-health-green flex items-center justify-center text-white font-bold text-sm border-2 border-background">C</div>
                <div className="w-10 h-10 rounded-full bg-health-amber flex items-center justify-center text-white font-bold text-sm border-2 border-background">D</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">10,000+</span> health enthusiasts
              </p>
            </div>
          </div>
          
          {/* Right Content - Hero Image/Animation */}
          <div className="md:w-1/2 flex justify-center animate-slide-left">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-health-blue via-health-purple to-health-teal p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-health-blue to-health-purple opacity-20 animate-pulse-slow"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gradient font-bold text-5xl md:text-6xl">AI</div>
                    </div>
                    
                    {/* Orbiting Elements */}
                    <div className="absolute w-full h-full animate-spin-slow">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-lg">
                        <Heart size={24} className="text-health-blue" />
                      </div>
                    </div>
                    <div className="absolute w-full h-full animate-spin-slow" style={{animationDelay: '-2s'}}>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-lg">
                        <Brain size={24} className="text-health-purple" />
                      </div>
                    </div>
                    <div className="absolute w-full h-full animate-spin-slow" style={{animationDelay: '-4s'}}>
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-lg">
                        <Activity size={24} className="text-health-amber" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-light">
        <div className="w-8 h-12 rounded-full border-2 border-foreground/30 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-foreground/30 rounded-full animate-slide-down"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
