import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Search, Shield, Eye, Mic, Bell, ArrowRight, Globe,
  BarChart3, CheckCircle2, Activity, TrendingUp, History, LayoutDashboard
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from "../../components/ui/badge";
import IntroSequence from '../../components/IntroSequence';
import { AuthContext } from "../../context/AuthContext";
import Navbar from '../../layout/Navbar';
import axios from "../../api/axios";

const features = [
  { icon: Zap, title: 'Performance', description: 'Check your website speed and loading times' },
  { icon: Search, title: 'SEO', description: 'Optimize for search engines and visibility' },
  { icon: Shield, title: 'Security', description: 'Identify vulnerabilities and security issues' },
  { icon: Eye, title: 'Accessibility', description: 'Ensure everyone can use your website' },
  { icon: Mic, title: 'AI Voice Explanation', description: 'Listen to results explained in plain language' },
  { icon: Bell, title: 'Monitoring & Alerts', description: 'Get notified when issues are detected' }
];

const steps = [
  { number: '1', icon: Globe, title: 'Enter URL', description: 'Simply paste your website address' },
  { number: '2', icon: BarChart3, title: 'We Analyze', description: 'Our AI scans your entire website' },
  { number: '3', icon: CheckCircle2, title: 'Get Insights', description: 'Understand what needs fixing in plain language' }
];

const LandingPage = () => {
  const [url, setUrl] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [scans, setScans] = useState([]);
  const [stats, setStats] = useState({ total: 0, avg: 0, latest: null });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) setShowIntro(false);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // Hits the /dashboard endpoint which sorts by newest first and removes duplicates
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

  const handleAnalyze = () => {
    if (!url) return;
    const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
    localStorage.setItem("pendingScanUrl", cleanUrl);
    user ? navigate("/app/scan-result") : navigate("/login");
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  if (showIntro) return <IntroSequence onComplete={handleIntroComplete} />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden font-sans">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10">
        <Navbar />

        {/* --- DYNAMIC STATS --- */}
        {user && (
          <section className="container mx-auto px-6 pt-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard icon={Activity} label="Total Audits" value={stats.total} color="text-emerald-500" />
              <StatCard icon={TrendingUp} label="Avg Health" value={`${stats.avg}%`} color="text-blue-500" />
              <StatCard icon={History} label="Latest Score" value={stats.latest ? `${stats.latest.score}%` : '---'} color="text-purple-500" />
            </motion.div>
          </section>
        )}

        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-6 pt-20 pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight uppercase tracking-tighter italic">
              {user ? (
                <>Welcome back, <span className="text-emerald-400">{user.name.split(' ')[0]}</span></>
              ) : (
                <>Understand Your <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">Website Health</span></>
              )}
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto italic font-medium">
              {user ? "Ready to optimize another property?" : "Get simple, actionable insights about your performance, SEO, and security."}
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl">
                <Input 
                  type="url" 
                  placeholder="Enter URL (e.g. google.com)" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  className="flex-1 bg-transparent border-0 text-lg px-4 h-14 focus-visible:ring-0" 
                />
                <Button onClick={handleAnalyze} className="bg-emerald-500 hover:bg-emerald-600 text-black px-10 h-14 rounded-xl font-black uppercase tracking-tighter">
                  {user ? "Run Audit" : "Analyze Now"} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- RECENT ACTIVITY (Grouped & Clickable) --- */}
        {user && scans.length > 0 && (
          <section className="container mx-auto px-6 pb-20">
            <div className="max-w-4xl mx-auto bg-[#161616] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black italic flex items-center gap-3 tracking-tighter uppercase">
                  <LayoutDashboard className="text-emerald-500" size={24} /> Recent Properties
                </h3>
                <Link to="/app/scans" className="text-xs text-gray-500 hover:text-emerald-400 font-bold uppercase tracking-[0.2em] transition-colors">View All</Link>
              </div>
              
              <div className="space-y-2">
                <AnimatePresence>
                  {scans.map((scan, i) => (
                    <motion.div 
                      key={scan.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      // Navigates to the specific report page using the record ID
                      onClick={() => navigate(`/app/report/${scan.id}`)}
                      className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-transparent hover:border-emerald-500/20 rounded-2xl transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-emerald-400 transition-colors">
                          <Globe size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-200">{scan.url}</p>
                          <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest font-mono">
                            Logged on {new Date(scan.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-black italic ${scan.score >= 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                          {scan.score}
                        </div>
                        <ArrowRight size={18} className="text-gray-800 group-hover:text-emerald-500 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* --- FEATURES SECTION --- */}
        <section className="container mx-auto px-6 py-20 bg-black/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 uppercase tracking-tighter italic">Monitor <span className="text-emerald-400">Success</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {features.map((feature, index) => (
                <div key={feature.title} className="p-8 bg-[#161616] rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STEPS SECTION --- */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-20 uppercase tracking-tighter italic">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#111] border border-emerald-500/20 flex items-center justify-center mb-8 shadow-2xl">
                    <step.icon className="w-8 h-8 text-emerald-400" />
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-6 py-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] font-black uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} LaunchScore Intelligence OS.</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[#111] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 shadow-xl">
    <div className={`p-4 bg-white/5 rounded-2xl ${color} border border-white/5`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-3xl font-black text-white italic tracking-tighter">{value}</h2>
    </div>
  </div>
);

export default LandingPage;