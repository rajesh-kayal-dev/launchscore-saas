import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, ShieldCheck, Zap, Play, Sparkles,
  TrendingUp, ArrowRight, MousePointer2, Info,
  LineChart, Activity, Globe
} from "lucide-react";
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from "../../components/ui/badge";

const ScanResultPage = () => {
  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);

  const steps = [
    "Initializing core audit engine...",
    "Deep-scanning SEO architecture...",
    "Verifying SSL & security protocols...",
    "Benchmarking load performance...",
    "Synthesizing AI business insights...",
    "Generating final report..."
  ];

  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + increment;
        const stepIdx = Math.min(Math.floor((nextValue / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIdx);

        if (nextValue >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setStatus("results");
            animateScore(82);
          }, 500);
          return 100;
        }
        return nextValue;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const animateScore = (target) => {
    let start = 0;
    const scoreInterval = setInterval(() => {
      start += 1;
      if (start > target) {
        setDisplayScore(target);
        clearInterval(scoreInterval);
      } else {
        setDisplayScore(start);
      }
    }, 25);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen text-white">
      <AnimatePresence mode="wait">
        {status === "loading" ? (
          /* --- ADVANCED PROGRESS VIEW --- */
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center"
          >
            <div className="relative mb-12">
              {/* Rotating Outer Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-48 h-48 rounded-full border border-emerald-500/20 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{Math.floor(progress)}%</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Auditing</span>
              </div>
            </div>
            <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">
              SCANNING SYSTEM
            </h2>
            <div className="w-80 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-gray-500 font-mono text-sm tracking-tighter">{steps[currentStep]}</p>
          </motion.div>
        ) : (
          /* --- ADVANCED RESULT VIEW --- */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* 1. HERO SECTION: SCORE & LIVE GRAPH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 bg-[#111] border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Health Index</h3>
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg className="w-44 h-44 transform -rotate-90">
                    <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <motion.circle
                      cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="8" fill="transparent"
                      strokeDasharray={502.6}
                      initial={{ strokeDashoffset: 502.6 }}
                      animate={{ strokeDashoffset: 502.6 - (502.6 * displayScore) / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    />
                  </svg>
                  <div className="absolute text-6xl font-black italic">{displayScore}</div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-1 rounded-full">Optimal</Badge>
              </Card>

              <Card className="lg:col-span-2 bg-[#111] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-500" /> Performance Velocity
                    </h3>
                    <p className="text-sm text-gray-500">Your site stability over the last 30 days</p>
                  </div>
                  <Badge variant="outline" className="border-white/10 text-emerald-400 font-mono">+12.4%</Badge>
                </div>

                {/* Simplified "Graph" Animation */}
                <div className="h-32 flex items-end gap-1 mb-4">
                  {[40, 70, 45, 90, 65, 80, 82].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-white/5'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Current</span>
                </div>
              </Card>
            </div>

            {/* 2. AI INSIGHT PANEL */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-transparent border-emerald-500/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-emerald-500 rounded-3xl rotate-12 flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                    <Sparkles className="text-white w-10 h-10 -rotate-12" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-black italic tracking-tight">AI STRATEGY</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    "Detected <span className="text-emerald-400 font-bold">Unoptimized Media Assets</span>. Automating compression could reduce TTI (Time to Interactive) by <span className="text-white underline underline-offset-4 decoration-emerald-500">1.2 seconds</span>, directly impacting user retention."
                  </p>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-10 py-8 font-black text-lg shadow-xl uppercase tracking-tighter">
                  <Play className="w-5 h-5 mr-3 fill-white" /> Voice Intel
                </Button>
              </Card>
            </motion.div>

            {/* 3. PRIORITY ACTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Asset Crunch", icon: Zap, color: "text-yellow-500", diff: "-420kb" },
                { title: "SSL Armor", icon: ShieldCheck, color: "text-emerald-500", diff: "Active" },
                { title: "Crawler Sync", icon: Globe, color: "text-blue-500", diff: "98%" }
              ].map((item, i) => (
                <Card key={i} className="bg-[#111] border-white/5 p-6 rounded-3xl group hover:bg-emerald-500/5 transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <div className={`p-3 bg-white/5 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{item.diff}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-emerald-400 transition-colors">
                    View Documentation <ArrowRight className="w-3 h-3 ml-2" />
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanResultPage;