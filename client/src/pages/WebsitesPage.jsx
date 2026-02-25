import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const websites = [
  {
    name: 'mystore.com',
    url: 'https://mystore.com',
    score: 89,
    status: 'active',
    lastScan: '2 hours ago'
  },
  {
    name: 'myblog.com',
    url: 'https://myblog.com',
    score: 76,
    status: 'active',
    lastScan: '5 hours ago'
  },
  {
    name: 'myportfolio.com',
    url: 'https://myportfolio.com',
    score: 92,
    status: 'paused',
    lastScan: '1 day ago'
  },
  {
    name: 'mycompany.com',
    url: 'https://mycompany.com',
    score: 65,
    status: 'active',
    lastScan: '2 days ago'
  }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-orange-400';
};

const WebsitesPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white text-white">Websites</h1>
          <p className="text-gray-400">Manage all your monitored websites</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Website
        </Button>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {websites.map((website, index) => (
          <motion.div
            key={website.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{website.name}</h3>
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 mt-1"
                      >
                        Visit site
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <Badge className={
                    website.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 border'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30 border'
                  }>
                    {website.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-400 mb-1 font-medium text-white">Health Score</p>
                    <p className={`text-5xl font-bold ${getScoreColor(website.score)} tracking-tight`}>
                      {website.score}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1 font-medium text-white">Last Scan</p>
                    <p className="text-sm text-gray-300">{website.lastScan}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl py-5 transition-colors"
                  >
                    Scan Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 rounded-xl py-5 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WebsitesPage;