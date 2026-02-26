import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Activity, Globe, ShieldCheck, Link, 
  Timer, RefreshCw, Gauge, Cpu, Server
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const APIHealthPage = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Live Telemetry States
  const [needleRotation, setNeedleRotation] = useState(-90);
  const [liveThroughput, setLiveThroughput] = useState(0);

  const handleCheckPerformance = (e) => {
    e.preventDefault();
    if (!apiUrl) return;
    
    setIsScanning(true);
    setShowResults(false);
    setProgress(0);
  };

  // 1. Scanning Progress Logic
  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 2), 30);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => {
        setIsScanning(false);
        setShowResults(true);
        setLiveThroughput(Math.floor(Math.random() * 1200) + 800);
      }, 600);
    }
  }, [isScanning, progress]);

  // 2. Live Speedometer Jitter & Throughput Pulse
  useEffect(() => {
    if (showResults) {
      const interval = setInterval(() => {
        // Needle Jitter (Simulating live response variation)
        const baseRotation = 35; // Represents 'Optimal' zone
        const jitter = (Math.random() - 0.5) * 4;
        setNeedleRotation(baseRotation + jitter);

        // Throughput fluctuation
        setLiveThroughput(prev => prev + (Math.random() > 0.5 ? 5 : -5));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showResults]);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-white tracking-tighter"
        >
          API <span className="text-emerald-500">TELEMETRY</span>
        </motion.h1>
        <p className="text-gray-500 font-medium">Inject endpoint URL for high-frequency latency and security auditing.</p>
      </div>

      {/* Futuristic Input Card */}
      <Card className="p-1.5 bg-[#111] border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]">
        <form onSubmit={handleCheckPerformance} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Link className="w-5 h-5 text-emerald-500" />
              <div className="h-4 w-[1px] bg-white/20" />
            </div>
            <input 
              type="text"
              placeholder="https://api.v1.prod-engine.com/health"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full bg-transparent py-6 pl-20 pr-6 text-white placeholder:text-gray-700 focus:outline-none text-xl font-mono"
            />
          </div>
          <Button 
            type="submit"
            disabled={isScanning || !apiUrl}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-12 h-16 rounded-2xl transition-all uppercase tracking-widest italic"
          >
            {isScanning ? "Pinging..." : "Ignite Scan"}
          </Button>
        </form>
      </Card>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isScanning && (
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
            <div className="flex gap-8 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] animate-pulse">
              <span>Handshake</span>
              <span>Payload</span>
              <span>TLS 1.3 Audit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Result */}
      {showResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Latency Speedometer (The Kata) */}
          <Card className="md:col-span-7 bg-[#161616] border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col items-center">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">Response Latency (ms)</p>
            
            <div className="relative w-72 h-36 overflow-hidden">
               {/* Gauge Background */}
               <div className="absolute inset-0 border-[14px] border-white/5 rounded-t-full border-b-0" />
               
               {/* Tick Marks */}
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="absolute bottom-0 left-1/2 w-1 h-4 bg-white/20 origin-bottom" style={{ transform: `rotate(${(i * 36) - 90}deg) translateY(-120px)` }} />
               ))}

               {/* Live Needle */}
               <motion.div 
                  className="absolute bottom-0 left-1/2 w-1.5 h-32 bg-emerald-500 origin-bottom rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]"
                  animate={{ rotate: needleRotation }}
                  transition={{ type: "spring", stiffness: 60 }}
               />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#161616]" />
            </div>
            
            <div className="mt-8 text-center">
              <span className="text-7xl font-black text-white italic">142</span>
              <span className="text-emerald-500 font-bold ml-2 italic">MS</span>
              <div className="mt-4">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-4 py-1 text-xs uppercase font-bold tracking-widest">
                  Status: Optimal
                </Badge>
              </div>
            </div>
          </Card>

          {/* Side Metrics */}
          <div className="md:col-span-5 space-y-6">
            {/* Live Throughput */}
            <Card className="bg-[#161616] border-white/5 p-6 rounded-3xl flex items-center justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Activity className="w-20 h-20 text-white" />
               </div>
               <div>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Live Requests</p>
                 <motion.p 
                  key={liveThroughput}
                  initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className="text-4xl font-black text-white font-mono"
                 >
                   {liveThroughput.toLocaleString()} <span className="text-xs text-gray-500 font-bold">req/s</span>
                 </motion.p>
               </div>
               <div className="text-right z-10">
                  <Badge className="bg-blue-500/10 text-blue-400 border-none animate-pulse">STREAMING</Badge>
               </div>
            </Card>

            {/* Security Audit */}
            <Card className="bg-[#161616] border-white/5 p-6 rounded-3xl flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <div>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">SSL Security</p>
                 <p className="text-2xl font-black text-white italic">A+ TLS 1.3</p>
               </div>
            </Card>

            {/* Performance Node */}
            <Card className="bg-[#161616] border-white/5 p-6 rounded-3xl flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Server className="w-6 h-6 text-purple-400" />
               </div>
               <div>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Global Node</p>
                 <p className="text-2xl font-black text-white italic">US-EAST-1</p>
               </div>
            </Card>
            
            <Button className="w-full py-8 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-2xl text-white hover:text-emerald-400 font-bold transition-all uppercase tracking-widest">
              Export Audit Logs
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default APIHealthPage;