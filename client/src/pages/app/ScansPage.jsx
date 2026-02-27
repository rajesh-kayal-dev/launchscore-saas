import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanSearch, Globe, Clock, Search, Trash2, 
  Download, Activity, ChevronRight, ArrowUpRight
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import axios from "../../api/axios";

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-yellow-400';
  return 'text-orange-500';
};

const ScansPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Dynamic Data from Backend
  const fetchArchive = async () => {
    try {
      const res = await axios.get(`/scans/archive?search=${searchTerm}`);
      setScans(res.data.data);
    } catch (err) {
      console.error("Archive sync failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Debounced Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchArchive();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 3. Delete Functionality
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent navigating to report when deleting
    if (!window.confirm("Permanently delete this audit log?")) return;
    try {
      await axios.delete(`/scans/${id}`);
      setScans((prev) => prev.filter((scan) => scan.id !== id));
    } catch (err) {
      alert("Delete operation failed");
    }
  };

  // 4. Dynamic Stats Calculation
  const avgScore = scans.length > 0 
    ? Math.round(scans.reduce((acc, s) => acc + s.score, 0) / scans.length) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8 pb-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 text-white">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            SCAN <span className="text-emerald-500">ARCHIVE</span>
          </h1>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            Telemetry Feed • Chronological Audit History
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#111] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-64 transition-all font-medium"
            />
          </div>
          <Button variant="outline" className="border-white/5 bg-[#111] text-white hover:bg-white/10 h-10 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest">
            <Download className="w-4 h-4 mr-2 text-emerald-500" /> Export
          </Button>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Logs', value: scans.length, icon: ScanSearch, trend: 'Historical' },
          { label: 'Account Mean', value: `${avgScore}%`, icon: Globe, trend: '+2.4% gain' },
          { label: 'Engine Speed', value: '45.2s', icon: Activity, trend: 'Optimized' }
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5 bg-[#111] border-white/5 relative overflow-hidden group rounded-2xl border-b-2 border-b-emerald-500/10 hover:border-b-emerald-500/40 transition-all">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <stat.icon className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                  <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Audit Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="bg-[#111] border-white/5 overflow-hidden rounded-[2rem]">
          <div className="p-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <h2 className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-widest italic">
              <Activity className="w-3 h-3 text-emerald-500" /> Master Audit Stream
            </h2>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-mono text-[10px] uppercase font-black">
              {scans.length} Entries Detected
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  <th className="py-4 px-6">Source Domain</th>
                  <th className="py-4 px-6">Health Index</th>
                  <th className="py-4 px-6">Timestamp</th>
                  <th className="py-4 px-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium text-white">
                <AnimatePresence mode="popLayout">
                  {scans.map((scan) => (
                    <motion.tr
                      key={scan.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => navigate(`/app/report/${scan.id}`)}
                      className="hover:bg-white/[0.01] transition-all group cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-emerald-400 transition-colors">
                            <Globe size={14} />
                          </div>
                          <div>
                            <span className="text-gray-200 font-bold block">{scan.url}</span>
                            <span className="text-[8px] text-emerald-500/50 font-black uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                              View Report <ArrowUpRight className="inline w-2 h-2" />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-sm font-black italic ${getScoreColor(scan.score)}`}>
                            {scan.score}
                          </span>
                          <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${scan.score}%` }}
                              className={`h-full ${getScoreColor(scan.score).replace('text-', 'bg-')}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-mono text-[10px] uppercase">
                        {new Date(scan.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={(e) => handleDelete(e, scan.id)}
                            className="p-2 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[9px] uppercase tracking-widest">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            Completed
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {/* Empty State */}
            {!loading && scans.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">
                  No Data Streams Detected
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ScansPage;