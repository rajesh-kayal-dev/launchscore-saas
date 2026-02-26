import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanSearch, Globe, Clock,
  Search, Filter, ArrowUpRight,
  AlertCircle, ChevronRight, Download, Activity
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

const scans = [
  { website: 'mystore.com', score: 89, date: '2 hours ago', duration: '45s', status: 'completed', issues: 3, trend: 'up' },
  { website: 'myblog.com', score: 76, date: '5 hours ago', duration: '38s', status: 'completed', issues: 5, trend: 'down' },
  { website: 'myportfolio.com', score: 92, date: '1 day ago', duration: '52s', status: 'completed', issues: 2, trend: 'up' },
  { website: 'mycompany.com', score: 65, date: '2 days ago', duration: '41s', status: 'completed', issues: 8, trend: 'down' },
  { website: 'mystore.com', score: 85, date: '1 week ago', duration: '47s', status: 'completed', issues: 4, trend: 'stable' }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-yellow-400';
  return 'text-orange-500';
};

const ScansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Enhanced Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            SCAN <span className="text-emerald-500">ARCHIVE</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Deep-audit history and chronological health telemetry.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search logs..."
              className="bg-[#161616] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-64 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-white/5 bg-[#161616] text-white hover:bg-white/10 rounded-xl">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* 2. Tactical Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Scans', value: scans.length, icon: ScanSearch, sub: 'All time' },
          { label: 'Avg. Health', value: '81%', icon: Globe, sub: '+2.4% gain' },
          { label: 'Engine Speed', value: '45.2s', icon: Clock, sub: 'Optimized' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-[#161616] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-16 h-16 text-white" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <stat.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-white italic">{stat.value}</p>
                  <p className="text-emerald-500/60 text-[10px] font-bold">{stat.sub}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Deep-Audit Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-[#161616] border-white/5 overflow-hidden rounded-3xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
              <Activity className="w-4 h-4 text-emerald-500" /> Audit Logs
            </h2>
            <Badge className="bg-white/5 text-gray-400 border-none font-mono">5 Total Entries</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <th className="py-5 px-6">Source Property</th>
                  <th className="py-5 px-6">Health Index</th>
                  <th className="py-5 px-6 text-center">Engine Latency</th>
                  <th className="py-5 px-6">Timestamp</th>
                  <th className="py-5 px-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scans.map((scan, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="hover:bg-emerald-500/[0.02] transition-all cursor-pointer group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#222] border border-white/5 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                          <Globe className="w-4 h-4 text-gray-400 group-hover:text-emerald-400" />
                        </div>
                        <div>
                          <span className="font-bold text-white text-sm block">{scan.website}</span>
                          <span className="text-[10px] text-orange-500/80 font-bold uppercase">{scan.issues} Vulns Found</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between w-28">
                          <span className={`text-lg font-black italic ${getScoreColor(scan.score)}`}>
                            {scan.score}
                          </span>
                          {scan.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <div className="w-28 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${scan.score}%` }}
                            className={`h-full ${getScoreColor(scan.score).replace('text-', 'bg-')}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <Badge variant="outline" className="bg-transparent border-white/10 text-gray-500 font-mono text-[10px]">
                        {scan.duration}
                      </Badge>
                    </td>
                    <td className="py-5 px-6 text-gray-400 text-xs font-medium">
                      {scan.date}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {scan.status}
                        <ChevronRight className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ScansPage;