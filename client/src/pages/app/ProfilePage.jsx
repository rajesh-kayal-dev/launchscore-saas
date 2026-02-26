import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Share2, CreditCard, History, 
  Sparkles, Trophy, Copy, Check, Gift, 
  ArrowRight, Globe, Info, Zap, ShieldCheck
} from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  const stats = {
    tier: "Silver", 
    credits: 5,
    totalScans: 124,
    referralUrl: `https://launchscore.ai/ref/user77`,
    progressToGold: 65 // percentage
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(stats.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-10">
      
      {/* 1. Tactical User Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group overflow-hidden bg-[#161616] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-4xl font-black text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#0f0f0f] p-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                {user?.name || "ME"}
              </h1>
              <Badge className="w-fit mx-auto md:mx-0 bg-emerald-500/10 text-emerald-400 border-none px-3 font-black text-[10px] tracking-widest">
                VERIFIED OPERATOR
              </Badge>
            </div>
            <p className="text-gray-500 font-mono text-sm">{user?.email || "me@gmail.com"}</p>
          </div>

          <div className="flex gap-4">
            <TierCard tier="Silver" active={stats.tier === 'Silver'} Icon={Trophy} />
            <TierCard tier="Gold" active={stats.tier === 'Gold'} Icon={Sparkles} />
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
            <span>Progress to Gold Status</span>
            <span className="text-emerald-500">{stats.progressToGold}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.progressToGold}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* 2. Scan Credits (Tactical Meter) */}
        <Card className="md:col-span-5 bg-[#161616] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center text-center group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={100} className="text-white" />
          </div>
          
          <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.3em] mb-6">Available Scans</p>
          <div className="relative">
            <h2 className="text-8xl font-black text-white italic leading-none">{stats.credits}</h2>
            <div className="absolute -top-2 -right-6 animate-pulse">
                <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
          <p className="text-emerald-500/50 text-[10px] font-bold uppercase mt-4">Current Fuel Level</p>
          
          <Button className="mt-10 bg-white hover:bg-emerald-400 text-black w-full rounded-2xl py-8 font-black uppercase tracking-widest italic shadow-2xl transition-all">
            Replenish Credits
          </Button>
        </Card>

        {/* 3. Referral Engine */}
        <Card className="md:col-span-7 bg-[#161616] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
              <Gift className="w-7 h-7 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-black text-xl text-white italic uppercase tracking-tight">Referral Protocol</h3>
              <p className="text-sm text-gray-500">Secure 5 bonus credits for every agent onboarded.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-[#0f0f0f] border border-white/5 rounded-[1.5rem] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-gray-500 truncate">{stats.referralUrl}</span>
              <Button 
                onClick={handleCopy}
                variant="outline"
                className="shrink-0 h-12 px-6 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all rounded-xl font-bold uppercase text-[10px] tracking-widest"
              >
                {copied ? <><Check className="w-3 h-3 mr-2" /> Link Secured</> : <><Copy className="w-3 h-3 mr-2" /> Copy Link</>}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 text-center">
                    <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Invites Sent</p>
                    <p className="text-xl font-black text-white italic">14</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 text-center">
                    <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Earned Fuel</p>
                    <p className="text-xl font-black text-emerald-500 italic">70</p>
                </div>
            </div>
          </div>
        </Card>

      </div>

      {/* 4. Deep History Logs */}
      <Card className="bg-[#161616] border-white/5 p-8 rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter flex items-center gap-3">
            <History className="w-6 h-6 text-gray-500" /> Operational History
            </h3>
            <Button variant="ghost" className="text-[10px] font-black uppercase text-gray-500 hover:text-white tracking-widest">
                View All Records <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { site: 'mystore.com', date: 'FEB 24, 2026', score: 82, status: 'Optimal' },
            { site: 'test-app.dev', date: 'FEB 20, 2026', score: 64, status: 'Warning' },
            { site: 'vortex-hub.io', date: 'FEB 18, 2026', score: 91, status: 'Excellent' },
          ].map((item, i) => (
            <motion.div 
              whileHover={{ x: 10 }}
              key={i} 
              className="flex items-center justify-between p-5 bg-[#1a1a1a] border border-white/5 rounded-2xl group hover:border-emerald-500/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#0f0f0f] border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <Globe className="w-5 h-5 text-gray-600 group-hover:text-emerald-500" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-tight">{item.site}</p>
                  <p className="text-[10px] text-gray-600 font-bold tracking-widest">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Integrity</p>
                    <Badge className={`bg-transparent border-none p-0 text-xs font-black italic ${item.score > 75 ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {item.status}
                    </Badge>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-white/5 flex items-center justify-center">
                    <p className={`font-black italic text-lg ${item.score > 75 ? 'text-emerald-500' : 'text-orange-500'}`}>{item.score}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

    </div>
  );
};

// Helper Tier Component
const TierCard = ({ tier, active, Icon }) => (
  <div className={`
    flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 transition-all
    ${active 
      ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
      : 'border-white/5 opacity-30 grayscale'
    }
  `}>
    <Icon className={`w-8 h-8 ${active ? 'text-emerald-500' : 'text-gray-600'}`} />
    <span className="text-[10px] font-black mt-2 uppercase tracking-widest">{tier}</span>
  </div>
);

export default ProfilePage;