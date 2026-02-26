import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, TrendingUp, Clock, Star, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Textarea } from '../../components/ui/textarea';

// --- DATA DEFINITIONS (Must be above the component) ---

const websites = [
  {
    name: 'mystore.com',
    enabled: true,
    frequency: 'daily',
    status: 'active',
    lastCheck: '2 hours ago',
    apiMonitoring: true,
    apiEndpoint: 'https://mystore.com/api/health'
  },
  {
    name: 'myblog.com',
    enabled: true,
    frequency: 'weekly',
    status: 'active',
    lastCheck: '1 day ago',
    apiMonitoring: false,
    apiEndpoint: ''
  },
  {
    name: 'myportfolio.com',
    enabled: false,
    frequency: 'daily',
    status: 'paused',
    lastCheck: '5 days ago',
    apiMonitoring: false,
    apiEndpoint: ''
  },
  {
    name: 'mycompany.com',
    enabled: true,
    frequency: 'daily',
    status: 'active',
    lastCheck: '3 hours ago',
    apiMonitoring: true,
    apiEndpoint: 'https://mycompany.com/api/status'
  }
];

const initialFeedback = [
  {
    id: 1,
    rating: 5,
    comment: "The monitoring service is fantastic! Caught a major issue early.",
    date: "2 days ago",
    author: "Sarah M."
  },
  {
    id: 2,
    rating: 4,
    comment: "Very helpful for keeping track of multiple websites.",
    date: "5 days ago",
    author: "John D."
  }
];

const generateInitialData = (range) => {
  const dataPoints = range === '24h' ? 24 : range === '7d' ? 7 : 30;
  const data = [];
  for (let i = 0; i < dataPoints; i++) {
    data.push({
      time: range === '24h' ? `${i}:00` : `Day ${i + 1}`,
      responseTime: Math.floor(Math.random() * 200 + 350),
      uptime: 99.5 + Math.random() * 0.5,
    });
  }
  return data;
};

// --- COMPONENT START ---

const MonitoringPage = () => {
  const [monitoringSettings, setMonitoringSettings] = useState(websites);
  const [timeRange, setTimeRange] = useState('24h');
  const [performanceData, setPerformanceData] = useState(generateInitialData('24h'));
  const [currentMetrics, setCurrentMetrics] = useState({
    responseTime: 420,
    uptime: 99.8,
    status: 'healthy'
  });

  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const averageRating = feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Logic Handlers
  const toggleMonitoring = (index) => {
    const updated = [...monitoringSettings];
    updated[index].enabled = !updated[index].enabled;
    updated[index].status = updated[index].enabled ? 'active' : 'paused';
    setMonitoringSettings(updated);
  };

  const toggleApiMonitoring = (index) => {
    const updated = [...monitoringSettings];
    updated[index].apiMonitoring = !updated[index].apiMonitoring;
    setMonitoringSettings(updated);
  };

  const updateFrequency = (index, frequency) => {
    const updated = [...monitoringSettings];
    updated[index].frequency = frequency;
    setMonitoringSettings(updated);
  };

  const handleSubmitFeedback = () => {
    if (newRating === 0 || !newComment.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newFeedback = {
        id: feedbackList.length + 1,
        rating: newRating,
        comment: newComment.trim(),
        date: 'Just now',
        author: 'You'
      };
      setFeedbackList([newFeedback, ...feedbackList]);
      setNewRating(0);
      setNewComment('');
      setSubmitting(false);
    }, 1000);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setPerformanceData(generateInitialData(range));
  };

  // Live Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics({
        responseTime: Math.floor(Math.random() * 150 + 300),
        uptime: 99.7 + Math.random() * 0.3,
        status: Math.random() > 0.95 ? 'slow' : 'healthy'
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="space-y-8 pb-10"
    >
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            SYSTEM <span className="text-emerald-500">SENTINEL</span>
          </h1>
          <p className="text-gray-400 font-medium">Autonomous health verification and uptime telemetry.</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-1.5 px-4 flex gap-2 items-center rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Monitoring Active
        </Badge>
      </div>

      {/* 2. Monitoring Assets List */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-[#161616] border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500" /> Managed Assets
          </h2>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {monitoringSettings.map((website, index) => (
                <motion.div 
                  layout
                  key={website.name}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    website.enabled ? 'bg-[#1a1a1a] border-white/10' : 'bg-[#141414] border-transparent opacity-50'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${website.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                      <div>
                        <h4 className="font-bold text-white">{website.name}</h4>
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{website.lastCheck}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select 
                        value={website.frequency} 
                        onValueChange={(v) => updateFrequency(index, v)} 
                        disabled={!website.enabled}
                      >
                        <SelectTrigger className="w-32 h-9 bg-[#0f0f0f] border-white/5 text-[11px] font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#161616] border-white/10 text-white">
                          <SelectItem value="daily">Daily Scans</SelectItem>
                          <SelectItem value="weekly">Weekly Scans</SelectItem>
                        </SelectContent>
                      </Select>
                      <Switch checked={website.enabled} onCheckedChange={() => toggleMonitoring(index)} />
                    </div>
                  </div>
                  
                  {website.apiEndpoint && (
                    <motion.div 
                      initial={false}
                      animate={{ height: website.enabled ? 'auto' : 0, opacity: website.enabled ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-emerald-400" />
                          <span className="text-xs font-mono text-gray-500">{website.apiEndpoint}</span>
                        </div>
                        <Switch 
                          checked={website.apiMonitoring} 
                          onCheckedChange={() => toggleApiMonitoring(index)} 
                          className="scale-75"
                          disabled={!website.enabled}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* 3. Live Metrics and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-12">
          <Card className="p-6 bg-[#161616] border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white italic">INFRASTRUCTURE <span className="text-emerald-500">TELEMETRY</span></h2>
              <div className="flex bg-[#0f0f0f] p-1 rounded-xl border border-white/5">
                {['24h', '7d', '30d'].map((r) => (
                  <button 
                    key={r} 
                    onClick={() => handleTimeRangeChange(r)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      timeRange === r ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Latency</p>
                <p className="text-3xl font-black text-emerald-400 italic">
                  {currentMetrics.responseTime}<span className="text-sm ml-1">ms</span>
                </p>
              </div>
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Live Uptime</p>
                <p className="text-3xl font-black text-white italic">
                  {currentMetrics.uptime.toFixed(2)}%
                </p>
              </div>
              <div className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] font-black text-gray-500 uppercase mb-2">Node Status</p>
                <Badge className={
                  currentMetrics.status === 'healthy' 
                  ? 'bg-emerald-500/10 text-emerald-400 w-fit' 
                  : 'bg-yellow-500/10 text-yellow-400 w-fit'
                }>
                  {currentMetrics.status === 'healthy' ? 'OPTIMAL' : 'DEGRADED'}
                </Badge>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="monitorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fill="url(#monitorGrad)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 4. Feedback Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-[#161616] border-white/5 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-black text-white italic mb-2">USER <span className="text-emerald-500">VOICE</span></h2>
              <p className="text-gray-500 text-sm mb-6">Aggregate sentiment from our infrastructure partners.</p>
              <div className="flex items-center gap-5 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <p className="text-5xl font-black text-emerald-400 italic">{averageRating.toFixed(1)}</p>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} className={`${s <= Math.round(averageRating) ? 'fill-emerald-400 text-emerald-400' : 'text-gray-700'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Verified Global Ratings</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-emerald-500/10">
                <h4 className="text-white font-bold mb-4">Submit Platform Intel</h4>
                <div className="flex gap-3 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.button 
                      whileHover={{ scale: 1.2 }} 
                      whileTap={{ scale: 0.9 }}
                      key={s} 
                      onMouseEnter={() => setHoverRating(s)} 
                      onMouseLeave={() => setHoverRating(0)} 
                      onClick={() => setNewRating(s)}
                    >
                      <Star size={32} className={`transition-colors ${s <= (hoverRating || newRating) ? 'fill-emerald-400 text-emerald-400' : 'text-gray-700'}`} />
                    </motion.button>
                  ))}
                </div>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe your system experience..."
                  className="bg-[#0f0f0f] border-white/5 text-white mb-4 rounded-xl min-h-[120px] focus:border-emerald-500/50"
                />
                <Button 
                  onClick={handleSubmitFeedback} 
                  disabled={newRating === 0 || !newComment.trim() || submitting}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full h-12 rounded-xl"
                >
                  {submitting ? 'Encrypting & Sending...' : 'Dispatch Platform Feedback'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MonitoringPage;