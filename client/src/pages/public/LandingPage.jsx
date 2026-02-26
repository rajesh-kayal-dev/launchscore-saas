import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Search,
  Shield,
  Eye,
  Mic,
  Bell,
  ArrowRight,
  Globe,
  BarChart3,
  CheckCircle2,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import IntroSequence from '../../components/IntroSequence';
import { AuthContext } from "../../context/AuthContext";
import Navbar from '../../layout/Navbar';

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) setShowIntro(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAnalyze = () => {
    if (!url) return;
    localStorage.setItem("pendingScanUrl", url);
    user ? navigate("/app/scan-result") : navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
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

        <section className="container mx-auto px-6 pt-20 pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">Understand Your <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">Website Health</span><br />in Seconds</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get simple, actionable insights about your performance, SEO, and security. No technical knowledge required.</p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl">
                <Input type="url" placeholder="Enter your website URL (e.g., example.com)" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 bg-transparent border-0 text-lg px-4 focus-visible:ring-0 h-14" />
                <Button onClick={handleAnalyze} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-bold">Analyze Now <ArrowRight className="ml-2 w-5 h-5" /></Button>
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">Free scan • Instant results • No credit card</p>
            </motion.div>
          </motion.div>
        </section>

        <section className="container mx-auto px-6 py-20 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Everything You Need to <span className="text-emerald-400">Monitor Your Success</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="p-8 bg-[#161616] rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }} className="text-center relative z-20">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#222] to-[#111] border border-emerald-500/20 flex items-center justify-center mb-8 shadow-xl">
                    <step.icon className="w-10 h-10 text-emerald-400" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">{step.number}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-6 py-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} LaunchScore. Built with 💚 for Entrepreneurs.</p>
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

export default LandingPage;