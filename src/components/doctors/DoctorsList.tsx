
import React, { useState } from 'react';
import { Calendar, Clock, Video, MessageSquare, Star, ChevronRight, MapPin, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  image: string;
  consultationFee: number;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ayush Sharma',
    specialization: 'Ayurvedic Practitioner',
    experience: '12 years',
    rating: 4.9,
    reviews: 128,
    location: 'New Delhi, India',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    consultationFee: 0.02
  },
  {
    id: '2',
    name: 'Dr. Maya Patel',
    specialization: 'Nutrition Specialist',
    experience: '8 years',
    rating: 4.7,
    reviews: 96,
    location: 'Mumbai, India',
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2787&auto=format&fit=crop',
    consultationFee: 0.015
  },
  {
    id: '3',
    name: 'Dr. Raj Mehta',
    specialization: 'Panchakarma Specialist',
    experience: '15 years',
    rating: 4.8,
    reviews: 152,
    location: 'Bangalore, India',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2864&auto=format&fit=crop',
    consultationFee: 0.025
  },
  {
    id: '4',
    name: 'Dr. Priya Verma',
    specialization: 'Yoga Therapist',
    experience: '10 years',
    rating: 4.6,
    reviews: 88,
    location: 'Chennai, India',
    availability: 'Available in 2 days',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2940&auto=format&fit=crop',
    consultationFee: 0.018
  },
];

const AppointmentSlot: React.FC<{ time: string; available: boolean; onClick: () => void; selected: boolean }> = ({
  time,
  available,
  onClick,
  selected
}) => (
  <button
    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
      !available
        ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
        : selected
          ? 'bg-primary text-white'
          : 'bg-white dark:bg-zinc-800 hover:bg-primary/10'
    }`}
    onClick={available ? onClick : undefined}
    disabled={!available}
  >
    {time}
  </button>
);

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const morningSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
  ];
  
  const afternoonSlots = [
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true },
  ];
  
  const handleBookAppointment = async () => {
    if (!selectedSlot) return;
    
    setIsProcessing(true);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask to continue with the booking process.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect to MetaMask.");
      }
      
      const consultationFee = doctor.consultationFee;
      const feeInWei = `0x${(consultationFee * 1e18).toString(16)}`;
      
      // Create transaction parameters
      const transactionParameters = {
        to: '0x0000000000000000000000000000000000000000', // Replace with actual recipient address
        from: accounts[0],
        value: feeInWei,
        gas: '0x5208', // 21000 gas
      };
      
      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      // Success!
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${doctor.name} at ${selectedSlot} has been booked successfully.`,
      });
      
      // Reset state after successful booking
      setSelectedSlot(null);
      setExpanded(false);
      
    } catch (error) {
      console.error("Booking failed:", error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Something went wrong with your booking",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="doctor-card overflow-hidden bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-24 h-24 rounded-xl overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 justify-between">
            <div>
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p className="text-muted-foreground">{doctor.specialization}</p>
            </div>
            
            <div className="flex items-center gap-1">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>{doctor.experience} experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <Calendar size={16} />
              <span>{doctor.availability}</span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1 rounded-full">
              <span className="font-medium">{doctor.consultationFee} EDU</span>
              <span className="text-muted-foreground">per session</span>
            </div>
            
            <Button className="py-2 flex items-center gap-2" variant="default">
              <Video size={16} />
              Video Consult
            </Button>
            
            <Button className="py-2 flex items-center gap-2" variant="outline">
              <MessageSquare size={16} />
              Message
            </Button>
            
            <Button 
              className="py-2 px-3 flex items-center gap-1"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Hide Schedule' : 'View Schedule'}
              <ChevronRight size={16} className={`ml-1 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-6 pt-6 border-t border-border animate-fade-in">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Select Date</h4>
            <div className="flex flex-wrap gap-2">
              {['Today', 'Tomorrow', 'Wed, 15 Jun', 'Thu, 16 Jun', 'Fri, 17 Jun'].map((date, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    index === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 hover:bg-primary/10'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Morning Slots</h4>
            <div className="flex flex-wrap gap-2">
              {morningSlots.map((slot, index) => (
                <AppointmentSlot
                  key={index}
                  time={slot.time}
                  available={slot.available}
                  selected={selectedSlot === slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Afternoon Slots</h4>
            <div className="flex flex-wrap gap-2">
              {afternoonSlots.map((slot, index) => (
                <AppointmentSlot
                  key={index}
                  time={slot.time}
                  available={slot.available}
                  selected={selectedSlot === slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              className={`w-full py-3 ${!selectedSlot ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedSlot || isProcessing}
              onClick={handleBookAppointment}
            >
              {isProcessing 
                ? "Processing Payment..." 
                : `Book Appointment for ${doctor.consultationFee} EDU ${selectedSlot ? `at ${selectedSlot}` : ''}`
              }
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Payment will be processed securely via MetaMask.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDoctors = searchTerm
    ? doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : doctors;
  
  return (
    <section className="section-padding bg-background" id="doctors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-health-green/10 text-health-green text-sm font-medium mb-4">
            Expert Consultations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect With <span className="text-gradient">Ayurvedic</span> Experts
          </h2>
          <p className="text-lg text-muted-foreground">
            Book virtual consultations with certified Ayurvedic practitioners and
            health experts for personalized guidance and treatment plans.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap gap-4 justify-between">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Filter size={18} />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-foreground hover:bg-muted transition-colors flex items-center gap-1">
              <Calendar size={16} />
              Availability
            </button>
            <button className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-foreground hover:bg-muted transition-colors flex items-center gap-1">
              <Star size={16} />
              Rating
            </button>
            <button className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-foreground hover:bg-muted transition-colors flex items-center gap-1">
              <MapPin size={16} />
              Location
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="mx-auto flex items-center gap-2" variant="outline">
            View All Practitioners
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsList;
