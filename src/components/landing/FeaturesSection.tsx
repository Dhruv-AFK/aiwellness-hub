
import React from 'react';
import { Stethoscope, Brain, ShoppingBag, Video, Bot, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <div 
    className="health-card h-full flex flex-col items-start"
    style={{ 
      animationDelay: `${delay * 0.1}s`,
    }}
    data-animate="slide-up"
  >
    <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Stethoscope size={24} />,
      title: "AI Diagnostics",
      description: "Advanced diagnostic tools using AI to analyze your health parameters and provide insights based on Ayurvedic principles.",
    },
    {
      icon: <Bot size={24} />,
      title: "Health Assistant",
      description: "24/7 AI-powered health assistant that answers your questions and provides personalized wellness recommendations.",
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Personalized Products",
      description: "Discover Ayurvedic products tailored to your unique health profile and wellness goals.",
    },
    {
      icon: <Video size={24} />,
      title: "Doctor Consultations",
      description: "Connect with certified Ayurvedic practitioners and healthcare professionals through video consultations.",
    },
    {
      icon: <Brain size={24} />,
      title: "Smart Health Insights",
      description: "Gain deeper understanding of your health patterns with AI-powered analytics and visualization.",
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy Focused",
      description: "Your health data is encrypted and securely stored with industry-leading privacy measures.",
    },
  ];

  return (
    <section className="section-padding bg-muted/30 dark:bg-zinc-900/50" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Holistic Healthcare <span className="text-gradient">Reimagined</span> With AI
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the perfect blend of ancient wisdom and modern technology,
            designed to provide personalized healthcare solutions for your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
