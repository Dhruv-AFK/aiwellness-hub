import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FileText, Upload } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(30, "Please provide a detailed description (min 30 characters)"),
  amountNeeded: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Please enter a valid amount"
  ),
  daysNeeded: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 60,
    "Duration must be between 1 and 60 days"
  ),
});

interface FundRequestFormProps {
  onSubmit: (data: any) => void;
}

const FundRequestForm: React.FC<FundRequestFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amountNeeded: "",
      daysNeeded: "",
    },
  });

  const [reportUploaded, setReportUploaded] = React.useState(false);
  const [imageUploaded, setImageUploaded] = React.useState(false);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageUploaded(true);
      toast.success("Cover image uploaded successfully");
    }
  }

  function handleReportUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setReportUploaded(true);
      setTimeout(() => {
        toast.success("Medical report uploaded and verified as NFT");
      }, 1500);
    }
  }

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    if (!reportUploaded) {
      toast.error("Please upload a medical report for verification");
      return;
    }
    if (!imageUploaded) {
      toast.error("Please upload a cover image");
      return;
    }
    
    onSubmit({
      ...values,
      amountNeeded: Number(values.amountNeeded),
      daysNeeded: Number(values.daysNeeded),
    });
    
    form.reset();
    setReportUploaded(false);
    setImageUploaded(false);
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Create a Fund Request</h2>
        <p className="text-muted-foreground">Fill out the details to create your fund request. Medical reports will be verified and minted as an NFT for transparency.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Help for heart surgery" {...field} />
                </FormControl>
                <FormDescription>
                  A clear, specific title for your funding request
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your medical condition, the treatment needed, and how the funds will be used..." 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Provide detailed information about your medical needs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="amountNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Needed (EDU tokens)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="e.g., 5000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Total EDU tokens needed for your medical expenses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="daysNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funding Duration (days)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="60" placeholder="e.g., 30" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of days your request will be active (max 60)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="coverImage" 
                  type="file" 
                  accept="image/*" 
                  className="cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a relevant image for your fund request
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medicalReport" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Medical Report
              </Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="medicalReport" 
                  type="file" 
                  accept=".pdf,.jpg,.png,.doc,.docx" 
                  className="cursor-pointer bg-secondary/10 border-secondary/20 text-secondary"
                  onChange={handleReportUpload}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Upload your medical report for verification (will be minted as an NFT)
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Create Fund Request
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default FundRequestForm;
