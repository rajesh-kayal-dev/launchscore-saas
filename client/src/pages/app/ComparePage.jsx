import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, TrendingUp, TrendingDown, Search, 
  Zap, ShieldCheck, Globe, Swords, Target, Activity 
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const comparisonData = {
  yourWebsite: { name: 'mystore.com', overallScore: 82, performance: 88, seo: 76, security: 92, accessibility: 70, experience: 84 },
  competitor: { name: 'competitor.com', overallScore: 75, performance: 72, seo: 85, security: 68, accessibility: 75, experience: 78 }
};

const categories = [
  { key: 'performance', label: 'Performance', icon: Zap },
  { key: 'seo', label: 'SEO', icon: Globe },
  { key: 'security', label: 'Security', icon: ShieldCheck },
  { key: 'accessibility', label: 'Accessibility', icon: Activity },
  { key: 'experience', label: 'User Experience', icon: Target }
];

const ComparePage = () => {
  const [competitorUrl, setCompetitorUrl] = useState('competitor.com');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCompare = () => {
    setIsScanning(true);
    setProgress(0);
  };

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 5), 50);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => setIsScanning(false), 500);
    }
  }, [isScanning, progress]);

  const getDifference = (yours, theirs) => yours - theirs;

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            COMPETITIVE <span className="text-emerald-500">RADAR</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Execute a comparative telemetry audit against any global domain.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#111] p-1.5 rounded-2xl border border-white/5">
            <Input
              type="url"
              placeholder="competitor-domain.com"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="bg-transparent border-none text-white focus-visible:ring-0 w-64 h-12 italic"
            />
            <Button 
                onClick={handleCompare}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 rounded-xl h-12 shadow-lg shadow-emerald-500/20"
            >
              {isScanning ? <Activity className="animate-spin w-4 h-4" /> : "Initiate Clash"}
            </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isScanning ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-96 flex flex-col items-center justify-center space-y-6 bg-[#161616] rounded-3xl border border-dashed border-emerald-500/20"
          >
            <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-emerald-500 font-black italic uppercase tracking-widest text-xs animate-pulse">
                Intercepting Competitor Packets... {progress}%
            </p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Overall Telemetry (Car Style Gauges) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                <div className="w-16 h-16 rounded-full bg-[#0f0f0f] border-4 border-white/5 flex items-center justify-center">
                    <Swords className="w-6 h-6 text-emerald-500" />
                </div>
              </div>

              {/* Your Gauge */}
              <Card className="p-8 bg-gradient-to-br from-[#1a1a1a] to-[#111] border-emerald-500/20 flex flex-col items-center">
                <Badge className="bg-emerald-500/10 text-emerald-500 mb-6 uppercase tracking-widest font-black italic">Friendly Infrastructure</Badge>
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                        <motion.circle
                            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                            strokeDasharray="553" initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * comparisonData.yourWebsite.overallScore / 100) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-emerald-500" strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-white italic">{comparisonData.yourWebsite.overallScore}</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Efficiency</span>
                    </div>
                </div>
                <div className="mt-8 flex items-center gap-2 text-emerald-400 font-black italic">
                    <TrendingUp className="w-4 h-4" />
                    +7 PTS DOMINANCE
                </div>
              </Card>

              {/* Competitor Gauge */}
              <Card className="p-8 bg-[#161616] border-white/5 flex flex-col items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <Badge className="bg-white/5 text-gray-400 mb-6 uppercase tracking-widest font-black italic">Target Host: {competitorUrl}</Badge>
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                        <motion.circle
                            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                            strokeDasharray="553" initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * comparisonData.competitor.overallScore / 100) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-gray-500" strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-white italic">{comparisonData.competitor.overallScore}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency</span>
                    </div>
                </div>
                <div className="mt-8 text-gray-500 font-black italic uppercase tracking-widest text-xs">Baseline established</div>
              </Card>
            </div>

            {/* Category Battle-Grid */}
            <Card className="p-8 bg-[#161616] border-white/5 rounded-3xl">
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter mb-8 italic flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" /> Sector Analysis
              </h2>

              <div className="space-y-8">
                {categories.map((category, index) => {
                  const yourScore = comparisonData.yourWebsite[category.key];
                  const compScore = comparisonData.competitor[category.key];
                  const diff = getDifference(yourScore, compScore);
                  const isWinning = diff > 0;

                  return (
                    <motion.div key={category.key} layout className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                            <category.icon className={`w-4 h-4 ${isWinning ? 'text-emerald-500' : 'text-gray-500'}`} />
                          </div>
                          <span className="font-bold text-white uppercase tracking-widest text-xs italic">{category.label}</span>
                        </div>
                        <Badge className={`${isWinning ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400'} border-none font-black italic`}>
                            {isWinning ? 'WIN' : 'LOSS'} {isWinning ? `+${diff}` : diff}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                            {/* Your Bar */}
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${yourScore}%` }}
                                />
                            </div>
                            {/* Comp Bar */}
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden opacity-30">
                                <motion.div 
                                    className="h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${compScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xl font-black text-white italic leading-none">{yourScore}</span>
                            <span className="text-[8px] font-bold text-gray-600 uppercase">VS {compScore}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Strategic Directive */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 rounded-3xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none">
                        <Target className="w-32 h-32 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic mb-6">STRATEGIC <span className="text-emerald-500">DIRECTIVE</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs shrink-0">01</div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Your infrastructure dominates in <span className="text-emerald-500 font-bold italic underline">Performance</span>. 
                                    Maintain current payload optimization to stay {comparisonData.yourWebsite.performance - comparisonData.competitor.performance} points ahead.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs shrink-0">02</div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Critical vulnerability found in competitor <span className="text-emerald-500 font-bold italic underline">Security</span> sector. 
                                    Leverage your SSL handshakes as a competitive trust factor.
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                            <h4 className="text-orange-400 font-black italic uppercase text-xs tracking-widest mb-4">Urgent Vulnerability</h4>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4">
                                Competitor <span className="text-white">SEO</span> strategy is outperforming your current baseline by <span className="text-orange-400">9 points</span>.
                            </p>
                            <Button className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-xl font-bold italic text-xs">
                                Fix SEO Now
                            </Button>
                        </div>
                    </div>
                </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparePage;