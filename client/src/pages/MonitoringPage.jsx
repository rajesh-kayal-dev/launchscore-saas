import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, CheckCircle2, TrendingUp, Clock, Users,
  Eye, MousePointer, Timer, Star, Send
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Textarea } from '../components/ui/textarea';

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
    comment: "The monitoring service is fantastic! Caught a major issue before our customers noticed it.",
    date: "2 days ago",
    author: "Sarah M."
  },
  {
    id: 2,
    rating: 4,
    comment: "Very helpful for keeping track of multiple websites. The alerts are timely and accurate.",
    date: "5 days ago",
    author: "John D."
  },
  {
    id: 3,
    rating: 5,
    comment: "Clean interface and reliable monitoring. Exactly what we needed for our business.",
    date: "1 week ago",
    author: "Emily R."
  }
];

// Helper function
const generateInitialData = (range) => {
  const dataPoints = range === '24h' ? 24 : range === '7d' ? 7 : 30;
  const data = [];

  for (let i = 0; i < dataPoints; i++) {
    data.push({
      time: range === '24h' ? `${i}:00` : `Day ${i + 1}`,
      responseTime: Math.floor(Math.random() * 200 + 350),
      performanceScore: Math.floor(Math.random() * 15 + 80),
      uptime: 99.5 + Math.random() * 0.5,
    });
  }
  return data;
};

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

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prevData => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          responseTime: Math.floor(Math.random() * 200 + 350),
          uptime: 99.5 + Math.random() * 0.5,
        };
        return newData;
      });

      setCurrentMetrics({
        responseTime: Math.floor(Math.random() * 200 + 350),
        uptime: 99.5 + Math.random() * 0.5,
        status: Math.random() > 0.9 ? 'slow' : 'healthy'
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      healthy: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Healthy', pulse: true },
      slow: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Slow', pulse: false },
      down: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Down', pulse: false }
    };
    return variants[status] || variants.healthy;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Monitoring</h1>
        <p className="text-gray-400">Automatically check your websites for issues</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <div className="flex items-start gap-4 text-white">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Automatic Health Monitoring</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enable monitoring to automatically scan your websites and receive alerts when issues are detected.
                Choose between daily or weekly scans based on your needs.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white text-white">Website Monitoring</h2>
          <div className="space-y-4">
            {monitoringSettings.map((website, index) => (
              <div key={website.name} className="p-5 bg-[#141414] rounded-xl border border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{website.name}</h3>
                      <Badge className={website.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20'}>
                        {website.status === 'active' ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">Last check: {website.lastCheck}</p>
                  </div>

                  <div className="w-48">
                    <Select value={website.frequency} onValueChange={(val) => updateFrequency(index, val)} disabled={!website.enabled}>
                      <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Scans</SelectItem>
                        <SelectItem value="weekly">Weekly Scans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch checked={website.enabled} onCheckedChange={() => toggleMonitoring(index)} />
                  </div>
                </div>

                {website.apiEndpoint && (
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-white">Monitor API Health</h4>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">{website.apiEndpoint}</p>
                    </div>
                    <Switch checked={website.apiMonitoring} onCheckedChange={() => toggleApiMonitoring(index)} disabled={!website.enabled} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <p className="text-gray-400 text-sm mb-2">Active Monitors</p>
          <p className="text-4xl font-bold text-emerald-400">{monitoringSettings.filter(w => w.enabled).length}</p>
        </Card>
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <p className="text-gray-400 text-sm mb-2">Checks This Week</p>
          <p className="text-4xl font-bold text-white">28</p>
        </Card>
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <p className="text-gray-400 text-sm mb-2">Issues Detected</p>
          <p className="text-4xl font-bold text-orange-400">3</p>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Live Performance Monitoring</h2>
            <div className="flex gap-2">
              {['24h', '7d', '30d'].map((r) => (
                <Button key={r} onClick={() => handleTimeRangeChange(r)} variant={timeRange === r ? "default" : "outline"} size="sm">
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[#141414] rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Response Time</p>
              <p className="text-3xl font-bold text-emerald-400">{currentMetrics.responseTime}ms</p>
            </div>
            <div className="p-4 bg-[#141414] rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Uptime</p>
              <p className="text-3xl font-bold text-emerald-400">{currentMetrics.uptime.toFixed(1)}%</p>
            </div>
            <div className="p-4 bg-[#141414] rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <Badge className={getStatusBadge(currentMetrics.status).color}>
                {getStatusBadge(currentMetrics.status).label}
              </Badge>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="responseTime" stroke="#10b981" fillOpacity={1} fill="url(#colorResponse)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white text-white">User Experience Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
            <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-3">Average Rating</p>
              <div className="flex items-end gap-4">
                <p className="text-6xl font-bold text-emerald-400">{averageRating.toFixed(1)}</p>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-6 h-6 ${s <= Math.round(averageRating) ? 'fill-emerald-400 text-emerald-400' : 'text-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-emerald-500/20 mb-6">
            <h3 className="font-semibold text-white mb-4 text-white">Share Your Experience</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setNewRating(s)}>
                  <Star className={`w-8 h-8 ${s <= (hoverRating || newRating) ? 'fill-emerald-400 text-emerald-400' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Your feedback..."
              className="mb-4 bg-[#0f0f0f] text-white"
            />
            <Button onClick={handleSubmitFeedback} disabled={newRating === 0 || !newComment.trim() || submitting}>
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default MonitoringPage;