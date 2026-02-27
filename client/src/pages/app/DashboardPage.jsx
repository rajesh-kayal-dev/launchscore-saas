import React, { useState, useEffect, useContext } from 'react';
import { motion } from "framer-motion";
import { 
    Globe, TrendingUp, Activity, AlertTriangle, 
    ArrowUpRight, Zap, ShieldCheck, 
    Filter, MoreHorizontal, Loader2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [scans, setScans] = useState([]);
    const [stats, setStats] = useState({ total: 0, avg: 0, latest: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            try {
                // Fetch dynamic data from the dashboard endpoint
                const res = await axios.get("/scans/dashboard");
                const { data, stats: backendStats } = res.data;

                setScans(data);
                setStats(backendStats);
            } catch (error) {
                console.error("Dashboard synchronization error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    // Format the stats for the top grid
    const statsGrid = [
        { label: 'Active Properties', value: scans.length, icon: Globe, trend: 'Current', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Average Score', value: `${stats.avg}%`, icon: TrendingUp, trend: 'Healthy', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Latest Audit', value: stats.latest ? `${stats.latest.score}%` : 'N/A', icon: Activity, trend: 'Real-time', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Global Nodes', value: '14', icon: Zap, trend: 'Online', color: 'text-emerald-400', bg: 'bg-emerald-500/10', isLive: true },
        { label: 'System Health', value: '100%', icon: ShieldCheck, trend: 'Stable', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Synchronizing Telemetry...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-12">
            {/* 1. Futuristic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">COMMAND <span className="text-emerald-500">CENTER</span></h1>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse">
                            LIVE PULSE
                        </Badge>
                    </div>
                    <p className="text-gray-500 font-medium">Welcome back, {user?.name}. System operational.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button onClick={() => window.location.href = '/app/scan-result'} className="bg-emerald-500 hover:bg-emerald-600 text-black rounded-xl shadow-lg shadow-emerald-500/20 px-6 font-bold uppercase italic tracking-tighter">
                        New Property Scan
                    </Button>
                </div>
            </div>

            {/* 2. Dynamic Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {statsGrid.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Card className="group p-5 bg-[#111] border-white/5 hover:border-emerald-500/30 transition-all cursor-default relative overflow-hidden">
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
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-black text-white italic leading-tight">{stat.value}</h3>
                                <span className={`text-[10px] font-bold mb-1 uppercase ${stat.trend === 'Online' || stat.trend === 'Stable' ? 'text-emerald-500' : 'text-gray-500'}`}>
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
                <Card className="lg:col-span-4 p-8 bg-[#111] border-white/5 flex flex-col items-center justify-center relative rounded-[2rem]">
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Stability Index</span>
                    </div>
                    
                    <div className="relative w-56 h-56 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                            <motion.circle
                                cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray="628"
                                initial={{ strokeDashoffset: 628 }}
                                animate={{ strokeDashoffset: 628 - (628 * (stats.avg / 100)) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-emerald-500"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-7xl font-black text-white italic">{stats.avg}</span>
                            <span className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase">Healthy</span>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-gray-500 text-xs font-medium max-w-[220px] uppercase tracking-tighter">
                        Overall ecosystem health for <span className="text-white">{scans.length} verified properties</span>.
                    </p>
                </Card>

                {/* Recent Activity Table */}
                <Card className="lg:col-span-8 bg-[#111] border-white/5 overflow-hidden rounded-[2rem]">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                            <Activity className="w-5 h-5 text-emerald-500" /> Telemetry Stream
                        </h2>
                        <Button onClick={() => window.location.href = '/app/scans'} variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-emerald-400">
                            Access Archives <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-gray-600 text-[9px] uppercase font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-6 py-4">Endpoint Domain</th>
                                    <th className="px-6 py-4 text-center">Engine Index</th>
                                    <th className="px-6 py-4">Audit Date</th>
                                    <th className="px-6 py-4 text-right">Verification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {scans.slice(0, 5).map((row, i) => (
                                    <tr key={row.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-200 text-sm">{row.url}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-3">
                                                <span className={`text-sm font-black italic ${row.score > 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>{row.score}</span>
                                                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden hidden md:block">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${row.score}%` }}
                                                        className={`h-full ${row.score > 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                                            {new Date(row.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-black uppercase">Completed</Badge>
                                        </td>
                                    </tr>
                                ))}
                                {scans.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center text-gray-700 font-black uppercase tracking-[0.4em]">No Data Streams Detected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default DashboardPage;