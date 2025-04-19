
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins, FileText, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FundRequest from '@/components/fundraise/FundRequest';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

const FundRaise = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("browse");
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam === 'create') {
      setActiveTab('create');
    }
  }, [location]);
  
  const fundRequests = [
    {
      id: "fr1",
      name: "John Doe",
      title: "Kidney Transplant Surgery",
      description: "I need help funding my upcoming kidney transplant surgery. I've been on dialysis for 3 years and finally found a donor match.",
      amountNeeded: 5,
      amountRaised: 3.2,
      daysLeft: 15,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "fr2",
      name: "Jane Smith",
      title: "Cancer Treatment Support",
      description: "Diagnosed with stage 2 breast cancer, I need support for chemotherapy and related expenses not covered by insurance.",
      amountNeeded: 8,
      amountRaised: 4.75,
      daysLeft: 23,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "fr3",
      name: "Michael Johnson",
      title: "Physical Therapy After Accident",
      description: "After a severe car accident, I need extensive physical therapy. My insurance only covers a portion of the treatments.",
      amountNeeded: 3,
      amountRaised: 1.8,
      daysLeft: 30,
      verifiedReport: true,
      image: "https://images.unsplash.com/photo-1494774157155-7e04a4b4caab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4 animate-fade-in">
            Community Support
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Medical Fund</span> Raising
          </h1>
          <p className="text-lg text-muted-foreground">
            Support fellow community members with medical needs using ETH tokens
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 justify-center items-start mb-12">
          <Card className="w-full max-w-xs bg-secondary/5 border-secondary/20">
            <CardHeader className="space-y-1 text-center">
              <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <HandCoins className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Direct Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm">Send ETH tokens directly to those in need, with no middlemen or fees</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs bg-secondary/5 border-secondary/20">
            <CardHeader className="space-y-1 text-center">
              <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Verified Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm">Verify medical needs with NFT medical reports for transparency</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs bg-secondary/5 border-secondary/20">
            <CardHeader className="space-y-1 text-center">
              <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <ShieldCheck className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Blockchain Security</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm">Every transaction is secured on ETH Chain with full transparency</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto mb-10">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Requests</TabsTrigger>
            <TabsTrigger value="create">Create Request</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundRequests.map((request) => (
                <FundRequest 
                  key={request.id} 
                  request={request} 
                  onDonate={() => handleDonate(request.id)} 
                  onViewReport={() => handleViewReport(request.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <Card className="p-6">
              <CardHeader className="text-center">
                <CardTitle>Create a Fund Request</CardTitle>
                <p className="text-sm text-muted-foreground">
                  This feature will be available soon. Please check back later.
                </p>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );

  function handleDonate(requestId: string) {
    const amount = window.prompt("Enter amount in ETH tokens to donate:");
    if (!amount) return;
    
    setTimeout(() => {
      toast.success("Transaction initiated! Wallet popup should appear.");
      simulateWalletTransaction().then(() => {
        toast.success(`Successfully donated ${amount} ETH tokens!`);
      }).catch(() => {
        toast.error("Transaction was cancelled or failed.");
      });
    }, 500);
  }

  function handleViewReport(requestId: string) {
    toast.info("Opening verified NFT medical report...");
    window.open(`#/report/${requestId}`, "_blank");
  }

  function simulateWalletTransaction(): Promise<void> {
    return new Promise((resolve, reject) => {
      const confirmed = window.confirm("Wallet: Confirm transaction of ETH tokens? This will send tokens from your wallet.");
      setTimeout(() => {
        if (confirmed) {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  }
};

export default FundRaise;
