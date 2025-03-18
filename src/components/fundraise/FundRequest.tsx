
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, HandCoins, FileText } from 'lucide-react';

interface FundRequestProps {
  request: {
    id: string;
    name: string;
    title: string;
    description: string;
    amountNeeded: number;
    amountRaised: number;
    daysLeft: number;
    verifiedReport: boolean;
    image: string;
  };
  onDonate: () => void;
  onViewReport: () => void;
}

const FundRequest: React.FC<FundRequestProps> = ({ request, onDonate, onViewReport }) => {
  const progressPercentage = (request.amountRaised / request.amountNeeded) * 100;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img src={request.image} alt={request.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{request.title}</CardTitle>
          {request.verifiedReport && (
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>Verified</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm">By {request.name}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-sm line-clamp-3 text-muted-foreground">{request.description}</p>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{request.amountRaised} EDU raised</span>
            <span className="font-medium">{request.amountNeeded} EDU goal</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{request.daysLeft} days left</span>
          <span>{Math.round(progressPercentage)}% funded</span>
        </div>
      </CardContent>
      
      <CardFooter className="grid grid-cols-2 gap-2 pt-0">
        <Button 
          onClick={onViewReport} 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
        >
          <FileText className="mr-1 h-4 w-4" />
          View Report
        </Button>
        <Button 
          onClick={onDonate} 
          variant="default" 
          size="sm" 
          className="w-full text-xs"
        >
          <HandCoins className="mr-1 h-4 w-4" />
          Donate EDU
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FundRequest;
