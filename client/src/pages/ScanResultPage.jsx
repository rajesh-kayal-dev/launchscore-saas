import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, Shield, Eye, Smile, Play, AlertCircle, Activity } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const overallScore = 82;

const breakdownScores = [
  {
    category: 'Performance',
    score: 88,
    icon: Zap,
    description: 'Your website loads quickly'
  },
  {
    category: 'SEO',
    score: 76,
    icon: Search,
    description: 'Good search visibility'
  },
  {
    category: 'Security',
    score: 92,
    icon: Shield,
    description: 'Well protected'
  },
  {
    category: 'Accessibility',
    score: 70,
    icon: Eye,
    description: 'Some improvements needed'
  },
  {
    category: 'Experience',
    score: 84,
    icon: Smile,
    description: 'Users are happy'
  },
  {
    category: 'API Health',
    score: 91,
    icon: Activity,
    description: 'API is responding optimally',
    responseTime: '420ms',
    statusCode: '200 OK',
    healthStatus: 'healthy'
  }
];

const issues = [
  {
    title: 'Images not optimized',
    severity: 'high',
    description: 'Several images are larger than 500KB which slows down page loading',
    fix: 'Compress images using tools like TinyPNG or convert to WebP format'
  },
  {
    title: 'Missing meta descriptions',
    severity: 'medium',
    description: '3 pages are missing meta descriptions which affects SEO',
    fix: 'Add unique meta descriptions (150-160 characters) to each page'
  },
  {
    title: 'Contrast ratio too low',
    severity: 'medium',
    description: 'Some text has insufficient contrast against the background',
    fix: 'Use darker text colors or lighter backgrounds to improve readability'
  },
  {
    title: 'Missing alt text on images',
    severity: 'low',
    description: '5 images are missing alt text for screen readers',
    fix: 'Add descriptive alt text to all images for better accessibility'
  },
  {
    title: 'HTTPS not enforced',
    severity: 'critical',
    description: 'Your website allows insecure HTTP connections',
    fix: 'Redirect all HTTP traffic to HTTPS in your server configuration'
  }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'from-emerald-400 to-emerald-300';
  if (score >= 75) return 'from-green-400 to-green-300';
  if (score >= 60) return 'from-yellow-400 to-yellow-300';
  return 'from-orange-400 to-orange-300';
};

const getSeverityBadge = (severity) => {
  const variants = {
    critical: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Critical' },
    high: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: 'High' },
    medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Medium' },
    low: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Low' }
  };
  return variants[severity] || variants.medium;
};

const getHealthBadge = (status) => {
  const variants = {
    healthy: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Healthy', pulse: true },
    slow: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Slow', pulse: false },
    unstable: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Unstable', pulse: false }
  };
  return variants[status] || variants.healthy;
};

const ScanResultPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Scan Results</h1>
        <p className="text-gray-400">mystore.com • Scanned 2 hours ago</p>
      </div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 bg-[#1a1a1a] border-emerald-500/10 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-white text-white">Overall Health Score</h2>

          <div className="flex items-center justify-center mb-6">
            <div className="relative w-56 h-56">
              <svg className="w-56 h-56 transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="16"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="16"
                  strokeDasharray={`${(overallScore / 100) * 628} 628`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  {overallScore}
                </span>
                <span className="text-gray-400 mt-2">out of 100</span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-300">Your website is performing well overall</p>
        </Card>
      </motion.div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breakdownScores.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreColor(item.score)} bg-opacity-20 flex items-center justify-center relative`}>
                  <item.icon className="w-6 h-6 text-white" />
                  {item.category === 'API Health' && item.healthStatus === 'healthy' && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-emerald-400/20"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <span className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor(item.score)} bg-clip-text text-transparent`}>
                  {item.score}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.category}</h3>
              <p className="text-gray-400 text-sm mb-3">{item.description}</p>

              {item.category === 'API Health' && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span className="text-gray-500">Response Time</span>
                    <span className="text-emerald-400 font-semibold">{item.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white">
                    <span className="text-gray-500">Status</span>
                    <Badge className={`${getHealthBadge(item.healthStatus).color} border text-xs`}>
                      {getHealthBadge(item.healthStatus).label}
                    </Badge>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Issues List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white text-white">Issues Found</h2>
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-5 bg-[#141414] rounded-xl border border-white/5"
              >
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
                      <Badge className={getSeverityBadge(issue.severity).color}>
                        {getSeverityBadge(issue.severity).label}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{issue.description}</p>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-sm text-emerald-300">
                        <span className="font-semibold text-white">How to fix:</span> {issue.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">AI Summary</h2>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
              <Play className="w-4 h-4 mr-2" />
              Play Voice Summary
            </Button>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Your website <span className="text-emerald-400 font-semibold">mystore.com</span> has an overall health score of 82.
            Your strongest areas are Security and Performance. We recommend focusing on image optimization and enforcing HTTPS to further improve your score.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default ScanResultPage;