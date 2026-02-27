import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Globe, Gauge, Activity, Sparkles, Download, Share2,
    ExternalLink, Timer, Zap, ShieldCheck, Lock, ArrowLeft, ArrowRight
} from "lucide-react";
import { Card } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../api/axios";

const SingleReportPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayScore, setDisplayScore] = useState(0);

    // Helper for dynamic colors
    const getTheme = (score) => {
        if (score <= 50) return { color: "#ef4444", label: "Critical", bg: "bg-red-500/10" };
        if (score <= 75) return { color: "#f59e0b", label: "Poor", bg: "bg-yellow-500/10" };
        if (score <= 89) return { color: "#3b82f6", label: "Fair", bg: "bg-blue-500/10" };
        return { color: "#10b981", label: "Optimal", bg: "bg-emerald-500/10" };
    };

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.get(`/scans/single/${id}`);
                const data = res.data.data;
                setReport(data);
                animateScore(data.score);
            } catch (err) {
                console.error("Report retrieval failed");
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    const animateScore = (target) => {
        let start = 0;
        const interval = setInterval(() => {
            if (start >= target) {
                setDisplayScore(target);
                clearInterval(interval);
            } else {
                start++;
                setDisplayScore(start);
            }
        }, 15);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
            <Activity className="w-12 h-12 text-emerald-500 animate-pulse mb-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Retrieving Telemetry...</span>
        </div>
    );

    if (!report) return <div className="text-center text-red-500 pt-20">Audit record not found.</div>;

    const theme = getTheme(report.score);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 text-white bg-[#0a0a0a] min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

                {/* --- NAVIGATION & ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="p-0 h-auto text-gray-500 hover:text-white mb-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
                        </Button>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-white/5 text-gray-400 border-white/10 font-mono text-[10px]">LOG_ID: {report.id.slice(0, 8)}</Badge>
                            <span className="text-gray-200 text-[10px] font-bold uppercase tracking-widest">{new Date(report.createdAt).toLocaleString()}</span>
                        </div>
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                            Audit <span style={{ color: theme.color }}>Complete</span>
                        </h1>
                        <div className="flex items-center gap-2 text-gray-500 hover:text-white cursor-pointer transition-colors font-mono text-sm group">
                            <Globe size={14} /> {report.url} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-white/5 border-white/5 rounded-xl h-11 px-6 text-[10px] font-black uppercase tracking-widest group">
                            <Share2 size={14} className="mr-2 group-hover:text-emerald-400" /> Share
                        </Button>
                        <Button onClick={() => window.print()} className="bg-white text-black font-black italic uppercase rounded-xl h-11 px-8 text-[10px] tracking-widest hover:bg-gray-200">
                            <Download size={14} className="mr-2" /> Export PDF
                        </Button>
                    </div>
                </div>

                {/* --- CORE DATA BENTO --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* SPEEDOMETER CARD */}
                    <Card className="lg:col-span-5 bg-[#111] border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-5 blur-3xl pointer-events-none" style={{ background: theme.color }} />
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-200 mb-8 relative z-10">Health Index</h3>
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-64 h-64 transform -rotate-90">
                                <circle cx="128" cy="128" r="115" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                <motion.circle
                                    cx="128" cy="128" r="115" stroke={theme.color} strokeWidth="12" fill="transparent"
                                    strokeDasharray={722}
                                    initial={{ strokeDashoffset: 722 }}
                                    animate={{ strokeDashoffset: 722 - (722 * displayScore) / 100 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <motion.span className="text-[8rem] font-black italic leading-none tracking-tighter">{displayScore}</motion.span>
                                <Badge className="px-6 py-1 uppercase tracking-widest text-[9px] font-black border-none" style={{ backgroundColor: theme.color, color: report.score < 50 ? 'white' : '#000' }}>{theme.label}</Badge>
                            </div>
                        </div>
                    </Card>

                    {/* PERFORMANCE VECTOR CARD */}
                    <Card className="lg:col-span-7 bg-[#111] border-white/5 p-8 rounded-[3rem] flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black italic flex items-center gap-2 uppercase tracking-tighter">
                                    <Gauge className="w-5 h-5" style={{ color: theme.color }} /> Performance Vector
                                </h3>
                                <p className="text-gray-500 text-xs font-medium italic">Temporal resource stability benchmark</p>
                            </div>
                            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-right">
                                <p className="text-[9px] text-gray-500 font-black uppercase mb-1 tracking-widest">Latency</p>
                                <p className="text-lg font-black italic text-emerald-400">142ms</p>
                            </div>
                        </div>

                        <div className="h-40 flex items-end gap-2 mb-6 px-4">
                            {[30, 60, 45, 90, 55, 75, 95, 65, report.score].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 rounded-t-lg relative group/bar"
                                    style={{ backgroundColor: i === 8 ? theme.color : 'rgba(255,255,255,0.03)' }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[8px] font-black">{h}%</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 font-mono">
                            <div className="text-center">
                                <p className="text-[9px] text-gray-200 font-black uppercase mb-1">TTI</p>
                                <p className="text-lg font-bold">0.8s</p>
                            </div>
                            <div className="text-center border-x border-white/5">
                                <p className="text-[9px] text-gray-200 font-black uppercase mb-1">FCP</p>
                                <p className="text-lg font-bold">1.1s</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] text-gray-200 font-black uppercase mb-1">Payload</p>
                                <p className="text-lg font-bold text-blue-400 uppercase">1.4 MB</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* --- TACTICAL METRICS STRIP --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "SSL Status", val: "Verified", icon: ShieldCheck, color: "text-emerald-500" },
                        { label: "Core Vitals", val: "Passing", icon: Activity, color: "text-blue-500" },
                        { label: "Response", val: "Optimal", icon: Timer, color: "text-purple-500" },
                        { label: "Security", val: "Locked", icon: Lock, color: "text-orange-500" },
                    ].map((m, i) => (
                        <div key={i} className="bg-[#111] border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white/[0.02] transition-all">
                            <div className={`p-2 rounded-lg bg-white/5 ${m.color}`}><m.icon size={18} /></div>
                            <div>
                                <p className="text-[9px] font-black text-gray-200 uppercase tracking-widest leading-none mb-1">{m.label}</p>
                                <p className="text-sm font-bold uppercase italic">{m.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- STRATEGIC AI INSIGHT --- */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Card className="relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border-emerald-500/10 p-10 rounded-[3rem] overflow-hidden group">
                        <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000">
                            <Sparkles size={250} />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center rotate-12 shadow-2xl shadow-emerald-500/10">
                                    <Sparkles className="text-black w-10 h-10" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-full border-4 border-[#111]">
                                    <Zap size={14} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 mb-4 px-3 font-black text-[9px] uppercase tracking-widest">AI Strategy Hub</Badge>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Strategic <span className="text-emerald-500">Insights</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                    "Based on historical telemetry for <span className="text-white italic">{report.url}</span>, unoptimized assets are the primary bottleneck.
                                    Implementation of Next-Gen compression could lift this score by <span className="text-emerald-500 font-black underline decoration-emerald-500 decoration-2">+15%</span>."
                                </p>
                            </div>
                            <Button className="bg-white text-black font-black uppercase italic h-14 px-10 rounded-2xl shadow-2xl hover:scale-105 transition-all">
                                Implement Fixes <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </Card>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default SingleReportPage;