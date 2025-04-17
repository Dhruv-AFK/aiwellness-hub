
import React from 'react';
import { Heart, Activity, Thermometer, Droplets, Brain, TrendingUp, Clock, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const healthData = [
  { name: 'Mon', heartRate: 72, stress: 20, energy: 80 },
  { name: 'Tue', heartRate: 68, stress: 30, energy: 75 },
  { name: 'Wed', heartRate: 74, stress: 25, energy: 85 },
  { name: 'Thu', heartRate: 76, stress: 40, energy: 65 },
  { name: 'Fri', heartRate: 70, stress: 35, energy: 70 },
  { name: 'Sat', heartRate: 65, stress: 15, energy: 90 },
  { name: 'Sun', heartRate: 68, stress: 18, energy: 88 },
];

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
  bgColor: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  unit,
  color,
  bgColor,
  trend,
  trendValue,
}) => {
  return (
    <div className="health-card h-full" data-animate="scale">
      <div className="flex items-start justify-between">
        <div>
          <div className={`p-3 rounded-xl ${bgColor} ${color} mb-4`}>
            {icon}
          </div>
          <div className="text-muted-foreground text-sm mb-2">{label}</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl md:text-3xl font-bold">{value}</div>
            <div className="text-muted-foreground text-sm mb-1">{unit}</div>
          </div>
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            trend === 'up' ? "bg-health-green/10 text-health-green" :
            trend === 'down' ? "bg-destructive/10 text-destructive" :
            "bg-muted text-muted-foreground"
          )}>
            {trend === 'up' && <TrendingUp size={12} />}
            {trend === 'down' && <TrendingUp size={12} className="rotate-180" />}
            {trend === 'stable' && <TrendingUp size={12} className="rotate-90" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};

const HealthDashboard: React.FC = () => {
  return (
    <section className="section-padding bg-background" id="diagnostics">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            AI Diagnostics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your <span className="text-gradient">Health Metrics</span> At A Glance
          </h2>
          <p className="text-lg text-muted-foreground">
            Monitor your vital signs, track your progress, and receive personalized insights
            powered by AI and Ayurvedic principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Heart size={24} />}
            label="Heart Rate"
            value="72"
            unit="bpm"
            color="text-health-blue"
            bgColor="bg-health-blue/10"
            trend="down"
            trendValue="3%"
          />
          <MetricCard
            icon={<Brain size={24} />}
            label="Stress Level"
            value="18"
            unit="%"
            color="text-health-purple"
            bgColor="bg-health-purple/10"
            trend="down"
            trendValue="7%"
          />
          <MetricCard
            icon={<Zap size={24} />}
            label="Energy"
            value="85"
            unit="%"
            color="text-health-amber"
            bgColor="bg-health-amber/10"
            trend="up"
            trendValue="5%"
          />
          <MetricCard
            icon={<Clock size={24} />}
            label="Sleep"
            value="7.2"
            unit="hrs"
            color="text-health-teal"
            bgColor="bg-health-teal/10"
            trend="up"
            trendValue="12%"
          />
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Weekly Health Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={healthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#0EA5E9" 
                  fillOpacity={1} 
                  fill="url(#colorHeartRate)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorStress)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#F59E0B" 
                  fillOpacity={1} 
                  fill="url(#colorEnergy)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="health-card">
            <h3 className="text-xl font-bold mb-6">Personalized Health Tips</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-health-blue/10 text-health-blue h-fit">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Increase Physical Activity</h4>
                  <p className="text-muted-foreground text-sm">
                    Adding 15 minutes of morning yoga can significantly improve your energy levels.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-health-green/10 text-health-green h-fit">
                  <Thermometer size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Balance Your Diet</h4>
                  <p className="text-muted-foreground text-sm">
                    Include more warming spices like ginger and cinnamon to balance your health.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-health-amber/10 text-health-amber h-fit">
                  <Droplets size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Hydration Reminder</h4>
                  <p className="text-muted-foreground text-sm">
                    Your hydration levels are below optimal. Aim for 2.5L of water daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to conditionally join classNames
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default HealthDashboard;
