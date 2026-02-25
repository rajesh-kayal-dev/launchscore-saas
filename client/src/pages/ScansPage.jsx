import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Globe, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const scans = [
  {
    website: 'mystore.com',
    score: 89,
    date: '2 hours ago',
    duration: '45s',
    status: 'completed',
    issues: 3
  },
  {
    website: 'myblog.com',
    score: 76,
    date: '5 hours ago',
    duration: '38s',
    status: 'completed',
    issues: 5
  },
  {
    website: 'myportfolio.com',
    score: 92,
    date: '1 day ago',
    duration: '52s',
    status: 'completed',
    issues: 2
  },
  {
    website: 'mycompany.com',
    score: 65,
    date: '2 days ago',
    duration: '41s',
    status: 'completed',
    issues: 8
  },
  {
    website: 'mystore.com',
    score: 85,
    date: '1 week ago',
    duration: '47s',
    status: 'completed',
    issues: 4
  }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-orange-400';
};

const ScansPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Scan History</h1>
        <p className="text-gray-400">View all website health scans</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Scans', value: scans.length, icon: ScanSearch },
          { label: 'Websites Scanned', value: '4', icon: Globe },
          { label: 'Avg. Scan Time', value: '45s', icon: Clock }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Scans Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white text-white">Recent Scans</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Website</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Score</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Issues</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white text-center">Duration</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Date</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, index) => (
                  <motion.tr
                    key={`${scan.website}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="font-medium text-white text-white">{scan.website}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-2xl font-bold ${getScoreColor(scan.score)}`}>
                        {scan.score}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {scan.issues} issues
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-center">
                      {scan.duration}
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {scan.date}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 capitalize">
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
  );
};

export default ScansPage;