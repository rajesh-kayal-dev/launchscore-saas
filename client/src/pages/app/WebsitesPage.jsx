import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, Users, Zap, Gauge, Globe, AlertCircle, Badge } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const WebsitesPage = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  // Live Data States
  const [liveUsers, setLiveUsers] = useState(0);
  const [needleRotation, setNeedleRotation] = useState(-90); // Start at 0 on gauge

  // Handle Scan Initiation
  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url) return;
    setIsAnalyzing(true);
    setShowDashboard(false);
    setProgress(0);
  };

  // 1. Progress Logic
  useEffect(() => {
    if (isAnalyzing && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 2), 40);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowDashboard(true);
        setLiveUsers(Math.floor(Math.random() * 1000) + 500);
      }, 600);
    }
  }, [isAnalyzing, progress]);

  // 2. Live "Up/Down" User Counter & Speedometer Jitter
  useEffect(() => {
    if (showDashboard) {
      const interval = setInterval(() => {
        // Randomly fluctuate users
        setLiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));

        // Randomly move the "Live Kata" (Needle) slightly to look active
        const baseRotation = 45; // Represents the "Result" speed
        const jitter = (Math.random() - 0.5) * 5;
        setNeedleRotation(baseRotation + jitter);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showDashboard]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-white tracking-tighter"
        >
          CORE <span className="text-emerald-500">VITAL</span> AUDIT
        </motion.h1>
        <p className="text-gray-500 font-medium">Inject a URL to perform a high-frequency infrastructure stress test.</p>
      </div>

      {/* Futuristic Input */}
      <Card className="p-1.5 bg-[#111] border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-500" />
              <div className="h-4 w-[1px] bg-white/20" />
            </div>
            <input
              type="text"
              placeholder="https://engine-test.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent py-6 pl-20 pr-6 text-white placeholder:text-gray-700 focus:outline-none text-xl font-mono"
            />
          </div>
          <Button
            type="submit"
            disabled={isAnalyzing}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-12 h-16 rounded-2xl transition-all uppercase tracking-widest italic"
          >
            {isAnalyzing ? "Ignition..." : "Start Engine"}
          </Button>
        </form>
      </Card>

      {/* Analysis Loading Screen */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center justify-center space-y-8"
          >
            <div className="w-full max-w-md h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-8 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">
              <span className={progress > 20 ? "opacity-100" : "opacity-20"}>Headers</span>
              <span className={progress > 50 ? "opacity-100" : "opacity-20"}>Payload</span>
              <span className={progress > 80 ? "opacity-100" : "opacity-20"}>Latency</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Dashboard Result UI */}
      {showDashboard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Car Speedometer (Live Needle) */}
          <Card className="md:col-span-7 bg-[#161616] border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col items-center">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">System Velocity (RPM)</p>

            <div className="relative w-64 h-32 overflow-hidden">
              {/* Gauge Background */}
              <div className="absolute inset-0 border-[12px] border-white/5 rounded-t-full border-b-0" />
              <div className="absolute inset-0 border-[12px] border-emerald-500/20 rounded-t-full border-b-0 mask-half" />

              {/* Tick Marks */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute bottom-0 left-1/2 w-1 h-4 bg-white/20 origin-bottom" style={{ transform: `rotate(${(i * 36) - 90}deg) translateY(-110px)` }} />
              ))}

              {/* Live Needle (Kata) */}
              <motion.div
                className="absolute bottom-0 left-1/2 w-1.5 h-28 bg-emerald-500 origin-bottom rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]"
                animate={{ rotate: needleRotation }}
                transition={{ type: "spring", stiffness: 50 }}
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#161616]" />
            </div>

            <div className="mt-6 text-center">
              <span className="text-6xl font-black text-white italic">0.8</span>
              <span className="text-emerald-500 font-bold ml-2">SEC</span>
              <p className="text-emerald-500/50 text-xs font-bold mt-2 uppercase tracking-tighter">Response Threshold: Optimal</p>
            </div>
          </Card>

          {/* Right Side Info Stats */}
          <div className="md:col-span-5 space-y-6">
            {/* Live User Counter (Moving Up/Down) */}
            <Card className="bg-[#161616] border-white/5 p-6 rounded-3xl flex items-center justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-20 h-20 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Live Occupancy</p>
                <motion.p
                  key={liveUsers}
                  initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className="text-4xl font-black text-white font-mono"
                >
                  {liveUsers.toLocaleString()}
                </motion.p>
              </div>
              <div className="text-right">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-none animate-pulse">LIVE PULSE</Badge>
              </div>
            </Card>

            <Card className="bg-[#161616] border-white/5 p-6 rounded-3xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Efficiency Rating</p>
                <p className="text-2xl font-black text-white uppercase italic">Grade A+</p>
              </div>
            </Card>

            <Button className="w-full py-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all">
              DOWNLOAD TELEMETRY REPORT
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WebsitesPage;