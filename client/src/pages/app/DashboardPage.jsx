import React from 'react';
import { motion } from "framer-motion";
import { 
  Globe, TrendingUp, Activity, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Zap, ShieldCheck, 
  Search, Filter, MoreHorizontal
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

const stats = [
    { label: 'Total Websites', value: '4', icon: Globe, trend: '+2', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Average Score', value: '82', icon: TrendingUp, trend: '+5%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Recent Scans', value: '12', icon: Activity, trend: '2h ago', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Active Alerts', value: '3', icon: AlertTriangle, trend: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'API Latency', value: '420ms', icon: Zap, trend: '-8%', color: 'text-emerald-400', bg: 'bg-emerald-500/10', isLive: true }
];

const DashboardPage = () => {
    return (
        <div className="space-y-10 pb-12">
            {/* 1. Futuristic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-4xl font-black tracking-tight text-white italic">COMMAND <span className="text-emerald-500">CENTER</span></h1>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse">
                            LIVE PULSE
                        </Badge>
                    </div>
                    <p className="text-gray-500 font-medium">System operational. All 14 global nodes are responding.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 px-6 font-bold">
                        Run Global Scan
                    </Button>
                </div>
            </div>

            {/* 2. Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Card className="group p-5 bg-[#161616] border-white/5 hover:border-emerald-500/30 transition-all cursor-default relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                {stat.isLive && (
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1 bg-emerald-500/40 rounded-full"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                                <span className={`text-[10px] font-bold mb-1 ${stat.trend.includes('+') || stat.trend.includes('Healthy') ? 'text-emerald-500' : 'text-orange-500'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* 3. Main Bento Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Score Visualization */}
                <Card className="lg:col-span-4 p-8 bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/5 flex flex-col items-center justify-center relative">
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold text-white uppercase tracking-tighter">Security Grade: A</span>
                    </div>
                    
                    <div className="relative w-56 h-56 flex items-center justify-center">
                        {/* Car-style radial gauge background */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                            <motion.circle
                                cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray="628"
                                initial={{ strokeDashoffset: 628 }}
                                animate={{ strokeDashoffset: 628 - (628 * 0.82) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-emerald-500"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-black text-white italic">82</span>
                            <span className="text-xs font-bold text-emerald-500 tracking-[0.2em] uppercase">Healthy</span>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-gray-500 text-sm max-w-[200px]">
                        Your infrastructure score is <span className="text-white">5% higher</span> than the industry average.
                    </p>
                </Card>

                {/* Recent Activity Table */}
                <Card className="lg:col-span-8 bg-[#161616] border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-500" /> Recent Telemetry
                        </h2>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white">
                            View all logs <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-gray-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Endpoint</th>
                                    <th className="px-6 py-4">Core Vitals</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: 'mystore.com', score: 89, date: '2h ago', status: 'Optimal' },
                                    { name: 'myblog.com', score: 76, date: '5h ago', status: 'Stable' },
                                    { name: 'myportfolio.com', score: 92, date: '1d ago', status: 'Optimal' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-6 py-5 font-bold text-white">{row.name}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-black ${row.score > 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>{row.score}</span>
                                                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${row.score}%` }}
                                                        className={`h-full ${row.score > 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-xs font-medium">{row.date}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default DashboardPage;