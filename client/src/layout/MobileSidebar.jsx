import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Globe,
  ScanSearch,
  Bell,
  BarChart3,
  GitCompare,
  Settings,
  Activity,
  Menu,
  X,
  Zap,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { cn } from '../components/ui/utils';

// Grouped and Sorted Navigation for consistency
const navigationGroups = [
  {
    label: "Core Operations",
    items: [
      { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
      { name: 'Websites', href: '/app/websites', icon: Globe },
      { name: 'Scans', href: '/app/scans', icon: ScanSearch },
    ]
  },
  {
    label: "Health Analytics",
    items: [
      { name: 'API Health', href: '/app/api-health', icon: Zap },
      { name: 'Monitoring', href: '/app/monitoring', icon: Activity },
      { name: 'Alerts', href: '/app/alerts', icon: Bell },
      { name: 'Reports', href: '/app/reports', icon: BarChart3 },
    ]
  },
  {
    label: "Strategy & Support",
    items: [
      { name: 'Compare', href: '/app/compare', icon: GitCompare },
      { name: 'Feedback', href: '/app/feedback', icon: MessageSquare },
      { name: 'Settings', href: '/app/settings', icon: Settings },
    ]
  }
];

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Tactical Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-white shadow-2xl active:scale-90 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6 text-emerald-500" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 2. Intelligent Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 3. Mobile Sidebar Container */}
      <div
        className={cn(
          'fixed top-0 left-0 h-screen w-72 bg-[#161616] border-r border-white/5 flex flex-col z-[55] transform transition-transform duration-500 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Identity */}
        <div className="p-6 border-b border-white/5 pt-20">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
                Launch<span className="text-emerald-500">Score</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
                Intelligence OS
              </span>
            </div>
          </Link>
        </div>

        {/* Grouped Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          {navigationGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.25em] text-gray-600">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300',
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]'
                          : 'text-gray-500 active:bg-white/5'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-4">
                          <item.icon className={cn('w-5 h-5', isActive ? 'text-emerald-400' : 'text-gray-500')} />
                          <span className="text-sm font-bold tracking-tight">{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-emerald-500" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* System Integrity Footer */}
        <div className="p-6 mt-auto">
          <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">System Online</span>
              <span className="text-[8px] text-gray-500 font-bold uppercase mt-1">Mobile Access Node</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;