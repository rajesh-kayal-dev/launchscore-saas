import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const comparisonData = {
  yourWebsite: {
    name: 'mystore.com',
    overallScore: 82,
    performance: 88,
    seo: 76,
    security: 92,
    accessibility: 70,
    experience: 84
  },
  competitor: {
    name: 'competitor.com',
    overallScore: 75,
    performance: 72,
    seo: 85,
    security: 68,
    accessibility: 75,
    experience: 78
  }
};

const categories = [
  { key: 'performance', label: 'Performance' },
  { key: 'seo', label: 'SEO' },
  { key: 'security', label: 'Security' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'experience', label: 'User Experience' }
];


const ComparePage = () => {

  const [competitorUrl, setCompetitorUrl] = useState('competitor.com');

  const getDifference = (yours, theirs) => {
    return yours - theirs;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white">Competitor Comparison</h1>
        <p className="text-gray-400">See how your website stacks up against competitors</p>
      </div>

      {/* Competitor Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-xl font-semibold mb-4">Compare With</h2>
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter competitor URL (e.g., competitor.com)"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="flex-1 bg-[#0f0f0f] border-white/10"
            />
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 rounded-xl">
              Compare
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Overall Score Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-8 bg-[#1a1a1a] border-emerald-500/20 text-center">
            <h3 className="text-lg text-gray-400 mb-4">Your Website</h3>
            <p className="text-xl font-semibold mb-6">{comparisonData.yourWebsite.name}</p>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
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
                    stroke="url(#gradientYour)"
                    strokeWidth="12"
                    strokeDasharray={`${(comparisonData.yourWebsite.overallScore / 100) * 553} 553`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradientYour" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                    {comparisonData.yourWebsite.overallScore}
                  </span>
                  <span className="text-gray-400 text-sm mt-1">Overall Score</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-white">
                +{getDifference(comparisonData.yourWebsite.overallScore, comparisonData.competitor.overallScore)} points ahead
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-8 bg-[#1a1a1a] border-white/5 text-center">
            <h3 className="text-lg text-gray-400 mb-4">Competitor</h3>
            <p className="text-xl font-semibold mb-6">{comparisonData.competitor.name}</p>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
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
                    stroke="#4a4a4a"
                    strokeWidth="12"
                    strokeDasharray={`${(comparisonData.competitor.overallScore / 100) * 553} 553`}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-400">
                    {comparisonData.competitor.overallScore}
                  </span>
                  <span className="text-gray-500 text-sm mt-1">Overall Score</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/20 text-gray-400">
              <span className="font-semibold text-white">Baseline competitor</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Category Breakdown</h2>

          <div className="space-y-6">
            {categories.map((category, index) => {
              const yourScore = comparisonData.yourWebsite[category.key];
              const competitorScore = comparisonData.competitor[category.key];
              const difference = getDifference(yourScore, competitorScore);
              const isAhead = difference > 0;

              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{category.label}</h3>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isAhead
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-orange-500/20 text-orange-400'
                      }`}>
                      {isAhead ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold text-white">
                        {isAhead ? '+' : ''}{difference}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Your Score Bar */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-32 text-sm text-gray-400">Your site</span>
                      <div className="flex-1 h-10 bg-[#0f0f0f] rounded-lg overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${yourScore}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-end px-3"
                        >
                          <span className="text-white font-semibold">{yourScore}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Competitor Score Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-32 text-sm text-gray-400">Competitor</span>
                      <div className="flex-1 h-10 bg-[#0f0f0f] rounded-lg overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${competitorScore}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gray-600 flex items-center justify-end px-3"
                        >
                          <span className="text-white font-semibold">{competitorScore}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
          <div className="space-y-3">
            <p className="text-gray-300">
              ✅ Your website outperforms the competitor in <span className="text-emerald-400 font-semibold">Performance</span> and{' '}
              <span className="text-emerald-400 font-semibold">Security</span>
            </p>
            <p className="text-gray-300">
              📈 Focus on improving <span className="text-orange-400 font-semibold">SEO</span> to match competitor levels
            </p>
            <p className="text-gray-300">
              🎯 Overall, you're ahead by <span className="text-emerald-400 font-semibold">7 points</span> - keep up the great work!
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ComparePage