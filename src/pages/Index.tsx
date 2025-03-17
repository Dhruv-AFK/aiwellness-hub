
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ChatInterface from '@/components/ai/ChatInterface';
import HealthDashboard from '@/components/health/HealthDashboard';
import ProductGrid from '@/components/ecommerce/ProductGrid';
import DoctorsList from '@/components/doctors/DoctorsList';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize animation observer
  useEffect(() => {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationType = entry.target.getAttribute('data-animate');
            if (animationType) {
              entry.target.classList.add(`animate-${animationType}`);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((element) => {
      animationObserver.observe(element);
    });

    return () => {
      animationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HealthDashboard />
        <ChatInterface />
        <ProductGrid />
        <DoctorsList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
