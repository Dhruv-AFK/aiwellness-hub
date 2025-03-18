
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem, 
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { AlertCircle, FileUp, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

interface ReportUploadProps {
  onAnalysisComplete: (analysis: string) => void;
}

const MedicalReportUpload: React.FC<ReportUploadProps> = ({ onAnalysisComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      reportFile: null as unknown as FileList,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const simulateAnalysis = () => {
    setIsUploading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsUploading(false);
      setDialogOpen(false);
      
      // Simulate AI analysis result with medicine recommendations
      const analysisResult = `Based on your uploaded medical report, I notice your cholesterol levels are slightly elevated (LDL: 142 mg/dL). Your blood pressure readings are within normal range, but your vitamin D levels are low at 18 ng/mL.

Recommendations:
1. Consider adding Omega-3 supplements (1000mg daily) to help manage cholesterol
2. Vitamin D3 supplement (2000 IU daily) is recommended
3. Increase intake of foods rich in soluble fiber (oats, beans, fruits)
4. Continue your current exercise regimen which shows positive impact on your metabolic markers

Recommended Medicines:
- Omega-3 Fish Oil Capsules (1000mg) - Take 1 daily with meal
- Vitamin D3 (2000 IU) - Take 1 daily with breakfast
- Plant Sterols Complex - Take as directed for cholesterol management
- CoQ10 (100mg) - Optional supplement to support heart health

Would you like me to add any of these items to your cart?`;
      
      onAnalysisComplete(analysisResult);
    }, 3000);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <FileUp size={18} />
          <span>Upload Medical Report</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Medical Report</DialogTitle>
          <DialogDescription>
            Upload your medical reports for AI analysis and personalized health recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form className="space-y-4 py-2">
            <FormItem>
              <FormLabel>Upload Report</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className={cn(
                      "flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium cursor-pointer",
                      selectedFile ? "file:text-primary" : "file:text-muted-foreground"
                    )}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Accepted formats: PDF, JPEG, PNG, DOC
              </FormDescription>
              <FormMessage />
            </FormItem>
            
            <Alert className="bg-muted/50 border border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertTitle>Privacy Protected</AlertTitle>
              <AlertDescription>
                Your medical data is encrypted and processed securely. We don't store your reports after analysis.
              </AlertDescription>
            </Alert>
          </form>
        </Form>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          {selectedFile && (
            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
              <FileText size={14} />
              <span className="truncate max-w-[180px]">{selectedFile.name}</span>
            </div>
          )}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={simulateAnalysis} 
              disabled={!selectedFile || isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? "Analyzing..." : "Analyze Report"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalReportUpload;
