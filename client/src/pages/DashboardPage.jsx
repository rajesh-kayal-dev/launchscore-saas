import React from 'react';
import { motion } from "framer-motion";
import { Globe, TrendingUp, Activity, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

const stats = [
  {
    label: 'Total Websites',
    value: '4',
    icon: Globe,
    trend: '+2 this month'
  },
  {
    label: 'Average Score',
    value: '82',
    icon: TrendingUp,
    trend: '+5% from last week'
  },
  {
    label: 'Recent Scans',
    value: '12',
    icon: Activity,
    trend: 'Last scan: 2h ago'
  },
  {
    label: 'Active Alerts',
    value: '3',
    icon: AlertTriangle,
    trend: '2 high priority'
  },
  {
    label: 'API Health Status',
    value: '420ms',
    icon: Activity,
    trend: 'Healthy',
    healthBadge: 'healthy',
    trendDirection: 'down',
    trendPercent: '-8%'
  }
];

const recentScans = [
  {
    website: 'mystore.com',
    score: 89,
    date: '2 hours ago',
    status: 'Good'
  },
  {
    website: 'myblog.com',
    score: 76,
    date: '5 hours ago',
    status: 'Fair'
  },
  {
    website: 'myportfolio.com',
    score: 92,
    date: '1 day ago',
    status: 'Excellent'
  },
  {
    website: 'mycompany.com',
    score: 65,
    date: '2 days ago',
    status: 'Needs Improvement'
  }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-orange-400';
};

const getStatusBadge = (status) => {
  const variants = {
    'Excellent': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Good': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Fair': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Needs Improvement': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  };

  return variants[status] || variants['Fair'];
};


const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white">Dashboard</h1>
        <p className="text-gray-400">Overview of your website health metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center relative">
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                  {stat.healthBadge === 'healthy' && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-emerald-400/20"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.value}</p>
              <div className="flex items-center gap-2">
                {stat.healthBadge ? (
                  <>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 border text-xs flex items-center gap-1.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      {stat.trend}
                    </Badge>
                    {stat.trendDirection && (
                      <div className="flex items-center text-xs text-emerald-400">
                        {stat.trendDirection === 'down' ? (
                          <ArrowDown className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        )}
                        {stat.trendPercent}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500">{stat.trend}</p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="p-8 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Overall Health Score</h2>

          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Circular Progress */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(82 / 100) * 553} 553`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  82
                </span>
                <span className="text-gray-400 text-sm mt-1">out of 100</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Scans Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Recent Scans</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-white">Website</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-white">Overall Score</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-white">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, index) => (
                  <motion.tr
                    key={scan.website}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="font-medium text-white">{scan.website}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${getScoreColor(scan.score)}`}>
                          {scan.score}
                        </span>
                        <div className="w-24">
                          <Progress value={scan.score} className="h-2" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{scan.date}</td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusBadge(scan.status)} border`}>
                        {scan.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default DashboardPage