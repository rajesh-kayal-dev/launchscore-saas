import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Key, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';

const SettingsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-10 max-w-5xl mx-auto w-full pb-20"
    >
      {/* 1. Header Alignment */}
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
          Account <span className="text-emerald-500">Settings</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Configure your workspace identity and security protocols.</p>
      </div>

      {/* 2. Profile Settings */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-[#161616] border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <User size={120} className="text-white" />
          </div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <User className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Identity Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <Input 
                defaultValue="John Doe" 
                className="bg-[#0f0f0f] border-white/5 text-white h-12 rounded-xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 transition-all font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <Input 
                type="email" 
                defaultValue="john@example.com" 
                className="bg-[#0f0f0f] border-white/5 text-white h-12 rounded-xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 transition-all font-medium" 
              />
            </div>
            <div className="md:col-span-2 pt-2">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest italic px-10 h-12 rounded-xl shadow-lg shadow-emerald-500/10 transition-all">
                Save Profile
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 3. NEW: Security & Password Module */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-[#161616] border-white/5 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Shield className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Security Hardening</h2>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Password Change Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-white">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-[#0f0f0f] border-white/5 text-white h-12 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/50 transition-all" 
                />
              </div>
              <div className="space-y-2 text-white">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-[#0f0f0f] border-white/5 text-white h-12 rounded-xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 transition-all" 
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-[#1a1a1a] rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500 font-medium">Add an extra layer of terminal security</p>
                </div>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <Button className="bg-white hover:bg-orange-500 hover:text-white text-black font-black uppercase tracking-widest italic px-10 h-12 rounded-xl transition-all">
              Update Security Keys
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* 4. Notification Settings */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-[#161616] border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Bell className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Alert Preferences</h2>
          </div>

          <div className="space-y-4">
            {[
              { title: "Email Notifications", sub: "Receive scan results via email", active: true },
              { title: "Alert Notifications", sub: "Get notified about critical issues", active: true },
              { title: "Weekly Summary", sub: "Receive weekly performance reports", active: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div>
                  <p className="font-bold text-white text-sm leading-none mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
                </div>
                <Switch defaultChecked={item.active} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* 5. Billing Aligned Layout */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-[#161616] border-white/5 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CreditCard className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Billing & Ops</h2>
          </div>

          <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-3xl mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <Badge className="bg-emerald-500 text-black font-black uppercase tracking-tighter mb-2 border-none">Active Tier</Badge>
                <p className="text-4xl font-black text-white italic tracking-tight">FREE <span className="text-emerald-500/50 font-medium">OPS</span></p>
                <p className="text-sm text-emerald-500/70 font-medium mt-1 uppercase tracking-widest">Up to 5 properties monitored</p>
              </div>
              <Button className="bg-white hover:bg-emerald-400 text-black font-black italic rounded-2xl h-14 px-10 shadow-2xl transition-all uppercase tracking-widest">
                Upgrade to Pro
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
                { label: "Assets Used", value: "4/5" },
                { label: "Scan Count", value: "12 Monthly" },
                { label: "Global Nodes", value: "Standard" }
            ].map((stat, i) => (
                <div key={i} className="flex flex-col border-l border-white/5 pl-6">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                    <span className="text-white font-bold text-2xl italic">{stat.value}</span>
                </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;