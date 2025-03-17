
import React, { useState } from 'react';
import { 
  Watch, 
  Bluetooth, 
  BluetoothOff, 
  BluetoothConnected, 
  BluetoothSearching,
  Activity,
  Heart,
  Timer
} from 'lucide-react';

const WatchConnect: React.FC = () => {
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  
  const handleConnectWatch = () => {
    if (connectionState === 'connected') {
      setConnectionState('disconnected');
      return;
    }
    
    setConnectionState('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionState('connected');
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 2000);
  };
  
  return (
    <section className="section-padding bg-gradient-to-br from-health-blue/5 to-health-purple/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-health-teal/10 text-health-teal text-sm font-medium mb-4">
            Health Monitoring
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect Your <span className="text-gradient">Smart Watch</span> For Better Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Sync your smartwatch data to get real-time health monitoring and personalized Ayurvedic insights 
            based on your activity patterns.
          </p>
        </div>

        <div className="glass-card p-8 relative overflow-hidden" data-animate="fade-in">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-health-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-health-purple/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                  <Watch className="w-16 h-16 text-foreground" />
                </div>
                
                <div className={`absolute -right-2 -bottom-2 p-2 rounded-full ${
                  connectionState === 'connected' ? 'bg-health-green text-white' : 
                  connectionState === 'connecting' ? 'bg-health-amber text-black' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {connectionState === 'connected' && <BluetoothConnected className="w-6 h-6" />}
                  {connectionState === 'connecting' && <BluetoothSearching className="w-6 h-6" />}
                  {connectionState === 'disconnected' && <BluetoothOff className="w-6 h-6" />}
                </div>
              </div>
              
              <button 
                className={`btn-primary flex items-center gap-2 mb-3 ${
                  connectionState === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleConnectWatch}
                disabled={connectionState === 'connecting'}
              >
                {connectionState === 'connected' ? (
                  <>
                    <BluetoothOff className="w-5 h-5" />
                    Disconnect Watch
                  </>
                ) : connectionState === 'connecting' ? (
                  <>
                    <BluetoothSearching className="w-5 h-5" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Bluetooth className="w-5 h-5" />
                    Connect Watch
                  </>
                )}
              </button>
              
              {lastSyncTime && (
                <p className="text-sm text-muted-foreground">
                  Last synced at {lastSyncTime}
                </p>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Real-time Health Monitoring</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-health-blue/10 text-health-blue">
                    <Heart size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Heart Rate</div>
                    <div className="text-xl font-semibold">
                      {connectionState === 'connected' ? '72 BPM' : '--'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-health-purple/10 text-health-purple">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Steps Today</div>
                    <div className="text-xl font-semibold">
                      {connectionState === 'connected' ? '8,521' : '--'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-health-teal/10 text-health-teal">
                    <Timer size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sleep Score</div>
                    <div className="text-xl font-semibold">
                      {connectionState === 'connected' ? '85%' : '--'}
                    </div>
                  </div>
                </div>
              </div>
              
              {connectionState === 'connected' && (
                <div className="mt-6 p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    Based on your sleep and activity patterns, we recommend increasing hydration 
                    and adding evening meditation to your routine.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchConnect;
