
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Activity, Watch } from 'lucide-react';

const WatchConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [healthData, setHealthData] = useState({
    heartRate: '--',
    steps: '--',
    calories: '--',
  });

  const connectWatch = () => {
    // Simulate connecting to a smartwatch
    setIsConnected(true);
    
    // Simulate receiving data
    setHealthData({
      heartRate: '72',
      steps: '8,456',
      calories: '1,245',
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Connect Your Smartwatch
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8">
            Sync your wearable device for real-time health monitoring and personalized insights
          </p>
          
          <div className="w-full max-w-md p-6 bg-card rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Watch className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                <Heart className="h-6 w-6 text-rose-500 mb-2" />
                <span className="text-sm text-muted-foreground">Heart Rate</span>
                <span className="text-xl font-bold">{healthData.heartRate}</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                <Activity className="h-6 w-6 text-green-500 mb-2" />
                <span className="text-sm text-muted-foreground">Steps</span>
                <span className="text-xl font-bold">{healthData.steps}</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                <svg className="h-6 w-6 text-amber-500 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" fill="currentColor" />
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" />
                </svg>
                <span className="text-sm text-muted-foreground">Calories</span>
                <span className="text-xl font-bold">{healthData.calories}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              variant={isConnected ? "outline" : "default"}
              onClick={connectWatch}
            >
              {isConnected ? "Connected" : "Connect Device"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchConnect;
