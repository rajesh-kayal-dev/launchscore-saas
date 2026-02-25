import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
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
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import  IntroSequence  from '../components/IntroSequence';

const features = [
  {
    icon: Zap,
    title: 'Performance',
    description: 'Check your website speed and loading times'
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Optimize for search engines and visibility'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Identify vulnerabilities and security issues'
  },
  {
    icon: Eye,
    title: 'Accessibility',
    description: 'Ensure everyone can use your website'
  },
  {
    icon: Mic,
    title: 'AI Voice Explanation',
    description: 'Listen to results explained in plain language'
  },
  {
    icon: Bell,
    title: 'Monitoring & Alerts',
    description: 'Get notified when issues are detected'
  }
];

const steps = [
  {
    number: '1',
    icon: Globe,
    title: 'Enter URL',
    description: 'Simply paste your website address'
  },
  {
    number: '2',
    icon: BarChart3,
    title: 'We Analyze',
    description: 'Our AI scans your entire website'
  },
  {
    number: '3',
    icon: CheckCircle2,
    title: 'Get Simple Business Insights',
    description: 'Understand what needs fixing in plain language'
  }
];

const LandingPage = () => {
  const [url, setUrl] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  // Handle Intro logic on mount
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleAnalyze = () => {
    if (url) {
      navigate('/login');
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Understand Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
                Website Health
              </span>
              <br />
              in Seconds
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get simple, actionable insights about your website's performance, SEO, and security. 
              No technical knowledge required.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <div className="flex gap-4 p-2 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl">
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-transparent border-0 text-lg px-4 focus-visible:ring-0"
                />
                <Button
                  onClick={handleAnalyze}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Analyze Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Free scan • No credit card required</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                Monitor Your Website
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-[#1a1a1a] rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              How It{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                Works
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent" />
                  )}
                  
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <step.icon className="w-12 h-12 text-emerald-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-lg font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Start Your Free Website Scan
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              See how your website performs in under 60 seconds
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-6 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/5">
          <div className="text-center text-gray-500">
            <p>&copy; 2026 LaunchScore. Built for non-technical website owners.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;