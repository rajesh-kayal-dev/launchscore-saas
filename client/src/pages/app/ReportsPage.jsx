import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Calendar, 
  Search, 
  Filter, 
  ChevronRight, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const reports = [
  { website: 'mystore.com', date: '2 hours ago', type: 'Full Health Audit', score: 89, pages: 12, size: '2.4 MB' },
  { website: 'myblog.com', date: '5 hours ago', type: 'Full Health Audit', score: 76, pages: 8, size: '1.8 MB' },
  { website: 'myportfolio.com', date: '1 day ago', type: 'Performance Deep-Dive', score: 92, pages: 15, size: '3.1 MB' },
  { website: 'mycompany.com', date: '2 days ago', type: 'Full Health Audit', score: 65, pages: 10, size: '2.1 MB' },
  { website: 'mystore.com', date: '1 week ago', type: 'Weekly Summary', score: 85, pages: 12, size: '1.2 MB' },
];

const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-yellow-400';
  return 'text-orange-500';
};

const ReportsPage = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* 1. Tactical Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            INTELLIGENCE <span className="text-emerald-500">REPORTS</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Exportable PDF dossiers containing deep-layer system diagnostics.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search archives..." 
                    className="bg-[#161616] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-64 transition-all"
                />
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 px-6 font-bold">
                <Download className="w-4 h-4 mr-2" /> Download Batch
            </Button>
        </div>
      </div>

      {/* 2. Dossier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Archives', value: reports.length, icon: FileText, sub: 'PDF format' },
          { label: 'Generated Monthly', value: '24', icon: Calendar, sub: '+12% increase' },
          { label: 'Storage Used', value: '14.2 MB', icon: Layers, sub: 'Optimized' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-[#161616] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <stat.icon className="w-16 h-16 text-white" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <stat.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-white italic">{stat.value}</p>
                  <p className="text-emerald-500/60 text-[10px] font-bold">{stat.sub}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Reports Dossier List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" /> Available Archives
            </h2>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white">
                <Filter className="w-4 h-4 mr-2" /> Sort By Date
            </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="group p-5 bg-[#161616] border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden">
                {/* Decorative PDF side-tab */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                        <FileText className="w-6 h-6 text-gray-500 group-hover:text-emerald-500" />
                        <span className="text-[8px] font-black text-gray-600 group-hover:text-emerald-500 uppercase mt-1">PDF</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{report.website}</h3>
                            <Badge className="bg-white/5 text-gray-400 border-none text-[9px] font-black tracking-widest uppercase">
                                {report.size}
                            </Badge>
                        </div>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mt-1">
                            <span className="text-emerald-500/50">{report.type}</span> 
                            <span className="opacity-20">•</span> 
                            {report.pages} pages analyzed
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-10">
                    <div className="text-center md:text-right">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Health Index</p>
                        <span className={`text-2xl font-black italic ${getScoreColor(report.score)}`}>
                            {report.score}
                        </span>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Generated</p>
                        <p className="text-xs font-bold text-gray-400">{report.date}</p>
                    </div>
                    <Button 
                        variant="outline" 
                        className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl h-12 px-6 transition-all"
                    >
                        <Download className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Feature Insight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-8 bg-gradient-to-br from-[#1a1a1a] to-[#111] border-emerald-500/20 rounded-3xl relative overflow-hidden group">
          {/* Subtle Background Grid Decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white italic mb-3">BEYOND THE <span className="text-emerald-500">SURFACE</span></h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-3xl">
                Our reports don't just show numbers; they provide a strategic roadmap. Each dossier includes deep-layer SEO audits, security handshake verification, and severity-ranked optimization tasks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                {[
                    "Plain-language fix suggestions",
                    "Global node response breakdown",
                    "Mobile vs Desktop vitals",
                    "Vulnerability handshakes"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-tighter">
                        <ChevronRight className="w-4 h-4 text-emerald-500" /> {item}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportsPage;