import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const reports = [
  {
    website: 'mystore.com',
    date: '2 hours ago',
    type: 'Full Health Report',
    score: 89,
    pages: 12
  },
  {
    website: 'myblog.com',
    date: '5 hours ago',
    type: 'Full Health Report',
    score: 76,
    pages: 8
  },
  {
    website: 'myportfolio.com',
    date: '1 day ago',
    type: 'Full Health Report',
    score: 92,
    pages: 15
  },
  {
    website: 'mycompany.com',
    date: '2 days ago',
    type: 'Full Health Report',
    score: 65,
    pages: 10
  },
  {
    website: 'mystore.com',
    date: '1 week ago',
    type: 'Weekly Summary',
    score: 85,
    pages: 12
  },
  {
    website: 'myblog.com',
    date: '1 week ago',
    type: 'Weekly Summary',
    score: 74,
    pages: 8
  }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-orange-400';
};

const ReportsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Reports</h1>
        <p className="text-gray-400">Download detailed PDF reports of your website scans</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Reports', value: reports.length, icon: FileText },
          { label: 'This Month', value: '4', icon: Calendar },
          { label: 'Downloads', value: '24', icon: Download }
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

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Available Reports</h2>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Website</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Report Type</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Score</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white">Scan Date</th>
                  <th className="py-3 px-4 text-gray-400 font-medium text-white text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <motion.tr
                    key={`${report.website}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-white">{report.website}</p>
                          <p className="text-sm text-gray-400">{report.pages} pages analyzed</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-white/5 text-gray-300 border-white/10">
                        {report.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                        {report.score}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{report.date}</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">What's in a Report?</h3>
              <p className="text-gray-400 text-sm mb-3">
                Each PDF report includes detailed insights about your website's health:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">✅ Overall health score breakdown</li>
                <li className="flex items-center gap-2">✅ Loading speed analysis</li>
                <li className="flex items-center gap-2">✅ Fix suggestions in plain language</li>
                <li className="flex items-center gap-2">✅ SEO recommendations</li>
                <li className="flex items-center gap-2">✅ Severity levels for all issues</li>
                <li className="flex items-center gap-2">✅ Security & audit results</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportsPage;