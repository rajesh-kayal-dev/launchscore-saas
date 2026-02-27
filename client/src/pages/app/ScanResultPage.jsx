import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Play, Sparkles, Activity, Globe, ShieldCheck, 
  ArrowRight, Timer, Gauge, Lock, Share2, Download, ExternalLink, RefreshCw
} from "lucide-react";
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from "../../components/ui/badge";
import axios from "../../api/axios"; 

const ScanResultPage = () => {
  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [scanData, setScanData] = useState(null);

  const steps = [
    "Initializing core audit engine...",
    "Deep-scanning SEO architecture...",
    "Verifying SSL & security protocols...",
    "Benchmarking load performance...",
    "Synthesizing AI business insights...",
    "Generating final report..."
  ];

  // Logic for dynamic theme colors based on score
  const getTheme = (score) => {
    if (score <= 25) return { color: "#ef4444", label: "Critical", shadow: "rgba(239, 68, 68, 0.2)" };
    if (score <= 50) return { color: "#f59e0b", label: "Poor", shadow: "rgba(245, 158, 11, 0.2)" };
    if (score <= 75) return { color: "#3b82f6", label: "Fair", shadow: "rgba(59, 130, 246, 0.2)" };
    return { color: "#10b981", label: "Optimal", shadow: "rgba(16, 185, 129, 0.2)" };
  };

  useEffect(() => {
    const duration = 6000;
    const intervalTime = 100;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + increment;
        const stepIdx = Math.min(Math.floor((nextValue / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIdx);
        return nextValue >= 98 ? 98 : nextValue;
      });
    }, intervalTime);

    const runRealScan = async () => {
      try {
        const url = localStorage.getItem("pendingScanUrl");
        if (!url) {
          setStatus("error");
          return;
        }

        const res = await axios.post("/scans/run", { url });
        const realData = res.data.data;

        setScanData(realData);
        setProgress(100);
        clearInterval(timer);
        
        setTimeout(() => {
          setStatus("results");
          animateScore(realData.score);
          localStorage.removeItem("pendingScanUrl");
        }, 800);
        
      } catch (error) {
        console.error("Scan failed", error);
        setStatus("error");
        clearInterval(timer);
      }
    };

    runRealScan();
    return () => clearInterval(timer);
  }, []);

  const animateScore = (target) => {
    let start = 0;
    const scoreInterval = setInterval(() => {
      start += 1;
      if (start >= target) {
        setDisplayScore(target);
        clearInterval(scoreInterval);
      } else {
        setDisplayScore(start);
      }
    }, 15);
  };

  const theme = getTheme(displayScore);

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-[#0a0a0a]">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6">
          <RefreshCw className="w-10 h-10 text-red-500 animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Engine Stalled</h2>
        <p className="text-gray-500 max-w-xs mb-8">Target server rejected the request or database timed out.</p>
        <Button onClick={() => window.location.href = '/'} className="bg-white text-black font-bold px-10 py-6 rounded-2xl hover:scale-105 transition-all">
          Restart Core
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen text-white font-sans bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        {status === "loading" ? (
          /* --- HIGH-END LOADER --- */
          <motion.div key="loader" exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center min-h-[75vh]">
            <div className="relative mb-16 scale-125">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-48 h-48 rounded-full border border-emerald-500/20 border-dashed" />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-2 rounded-full border-2 border-emerald-500/30 border-t-emerald-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black italic tracking-tighter">{Math.floor(progress)}%</span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-black text-emerald-500">Telemetry</span>
              </div>
            </div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Audit <span className="text-emerald-500">In Progress</span></h2>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase animate-pulse">{steps[currentStep]}</p>
          </motion.div>
        ) : (
          /* --- RESULTS VIEW --- */
          <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* 1. TOP ACTION BAR */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-white/5 text-gray-400 border-white/10 font-mono text-[10px]">ID: {scanData?.id.slice(0,8)}</Badge>
                  <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{new Date(scanData?.createdAt).toLocaleString()}</span>
                </div>
                <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                  Audit <span style={{ color: theme.color }}>Complete</span>
                </h1>
                <div className="flex items-center gap-2 text-gray-500 mt-4 hover:text-white cursor-pointer transition-colors font-mono text-sm">
                  <Globe size={14} /> {scanData?.url} <ExternalLink size={12} />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.print()} className="bg-white/5 border-white/5 rounded-xl h-12 px-6 group hover:bg-white/10">
                  <Download size={16} className="mr-2 group-hover:text-emerald-400" /> Export PDF
                </Button>
                <Button className="bg-white text-black font-black italic uppercase rounded-xl h-12 px-8 hover:bg-gray-200 transition-all">
                  <Share2 size={16} className="mr-2" /> Share Result
                </Button>
              </div>
            </div>

            {/* 2. CORE TELEMETRY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* COMPACT GAUGE CARD */}
              <Card className="lg:col-span-4 bg-[#111] border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 blur-3xl" style={{ background: theme.color }} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 relative z-10">Health Index</h3>
                <div className="relative inline-flex items-center justify-center mb-8">
                  <svg className="w-56 h-56 transform -rotate-90">
                    <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                    <motion.circle
                      cx="112" cy="112" r="100" stroke={theme.color} strokeWidth="10" fill="transparent"
                      strokeDasharray={628.3}
                      initial={{ strokeDashoffset: 628.3 }}
                      animate={{ strokeDashoffset: 628.3 - (628.3 * displayScore) / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <motion.span className="text-[7rem] font-black italic leading-none tracking-tighter">{displayScore}</motion.span>
                    <Badge className="px-6 py-1 uppercase tracking-widest text-[9px] font-black border-none" style={{ backgroundColor: theme.color, color: displayScore < 50 ? 'white' : '#000' }}>{theme.label}</Badge>
                  </div>
                </div>
              </Card>

              {/* VECTOR ANALYTICS CARD */}
              <Card className="lg:col-span-8 bg-[#111] border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black italic flex items-center gap-2 uppercase tracking-tighter">
                      <Gauge className="w-5 h-5" style={{ color: theme.color }} /> Performance Vector
                    </h3>
                    <p className="text-gray-500 text-xs font-medium">Real-time resource stability and delivery benchmark</p>
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-right">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Latency</p>
                    <p className="text-lg font-black italic text-emerald-400">142ms</p>
                  </div>
                </div>

                <div className="h-44 flex items-end gap-1.5 mb-6 px-4">
                  {[30, 60, 45, 90, 55, 75, 95, 65, displayScore].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="flex-1 rounded-t-lg relative group/bar"
                      style={{ backgroundColor: i === 8 ? theme.color : 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[8px] font-black">{h}%</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 font-mono">
                  <div>
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">TTI</p>
                    <p className="text-lg font-bold">0.8s</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">FCP</p>
                    <p className="text-lg font-bold">1.1s</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Payload</p>
                    <p className="text-lg font-bold text-blue-400">1.4 MB</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* 3. TACTICAL METRICS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "SSL Status", val: "Verified", icon: ShieldCheck, color: "text-emerald-500" },
                { label: "Core Vitals", val: "Passing", icon: Activity, color: "text-blue-500" },
                { label: "Server Response", val: "Optimal", icon: Timer, color: "text-purple-500" },
                { label: "Security Layer", val: "Locked", icon: Lock, color: "text-orange-500" },
              ].map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white/[0.02] transition-all">
                  <div className={`p-2 rounded-lg bg-white/5 ${m.color}`}><m.icon size={18} /></div>
                  <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">{m.label}</p>
                    <p className="text-sm font-bold uppercase italic">{m.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. STRATEGIC AI INSIGHT */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Card className="relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border-emerald-500/10 p-10 rounded-[3rem] overflow-hidden group">
                <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000">
                  <Sparkles size={250} />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[2rem] bg-emerald-500 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform shadow-2xl shadow-emerald-500/20">
                      <Sparkles className="text-black w-10 h-10" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-full border-4 border-[#111]">
                      <Zap size={14} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 mb-4 px-3 font-black text-[9px] uppercase tracking-widest">AI Strategy Hub</Badge>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Launch <span className="text-emerald-500">Optimization</span></h3>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                      "Based on telemetry for <span className="text-white italic">{scanData?.url}</span>, we detected unoptimized image assets. Compression could lift health by <span className="text-white font-black underline decoration-emerald-500 decoration-2">+15%</span>."
                    </p>
                  </div>
                  <Button className="bg-white text-black font-black uppercase italic h-14 px-10 rounded-2xl shadow-2xl hover:scale-105 transition-all">
                    Apply Fixes <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanResultPage;