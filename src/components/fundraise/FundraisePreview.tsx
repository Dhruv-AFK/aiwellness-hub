
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins, HeartHandshake, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FundRequest from './FundRequest';

const FundraisePreview = () => {
  // Preview data for the homepage
  const previewRequests = [
    {
      id: "fr1",
      name: "John Doe",
      title: "Kidney Transplant Surgery",
      description: "I need help funding my upcoming kidney transplant surgery. I've been on dialysis for 3 years and finally found a donor match.",
      amountNeeded: 5000,
      amountRaised: 3200,
      daysLeft: 15,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "fr2",
      name: "Jane Smith",
      title: "Cancer Treatment Support",
      description: "Diagnosed with stage 2 breast cancer, I need support for chemotherapy and related expenses not covered by insurance.",
      amountNeeded: 8000,
      amountRaised: 4750,
      daysLeft: 23,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "fr3",
      name: "Michael Johnson",
      title: "Physical Therapy After Accident",
      description: "After a severe car accident, I need extensive physical therapy. My insurance only covers a portion of the treatments.",
      amountNeeded: 3000,
      amountRaised: 1800,
      daysLeft: 30,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1494774157155-7e04a4b4caab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  return (
    <section className="py-16 px-6 md:py-24 bg-muted/30" id="fundraise-preview">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Community Support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Support Medical Needs with <span className="text-gradient">EDU Tokens</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Help fellow community members with their medical expenses or create your own fund request
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {previewRequests.map((request) => (
            <FundRequest 
              key={request.id} 
              request={request} 
              onDonate={() => handlePreviewDonate(request.id)} 
              onViewReport={() => handlePreviewViewReport(request.id)}
            />
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
          <Link to="/fundraise" className="btn-primary flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            View All Requests
          </Link>
          <Link to="/fundraise?tab=create" className="btn-outline flex items-center gap-2">
            <HeartHandshake className="h-5 w-5" />
            Create Fund Request
          </Link>
        </div>
      </div>
    </section>
  );

  function handlePreviewDonate(requestId: string) {
    window.location.href = "/fundraise";
  }

  function handlePreviewViewReport(requestId: string) {
    window.location.href = "/fundraise";
  }
};

export default FundraisePreview;
