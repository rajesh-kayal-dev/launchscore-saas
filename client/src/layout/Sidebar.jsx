import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Globe,
  ScanSearch,
  Bell,
  BarChart3,
  GitCompare,
  Settings,
  Activity,
  Zap,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '../components/ui/utils';

// Grouped and Sorted Navigation for better UX
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

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#161616] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      
      {/* Brand Identity */}
      <div className="p-6 mb-2">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none uppercase italic">
              Launch<span className="text-emerald-500">Score</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
              Intelligence OS
            </span>
          </div>
        </Link>
      </div>

      {/* Grouped Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto custom-scrollbar">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            {/* Section Header */}
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
              {group.label}
            </h3>
            
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group',
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-400 border border-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]'
                        : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          'w-5 h-5 transition-colors', 
                          isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-white'
                        )} />
                        <span className="text-sm font-bold tracking-tight">{item.name}</span>
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeIndicator">
                           <ChevronRight className="w-3 h-3 text-emerald-500" />
                        </motion.div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer - System Integrity */}
      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">System Online</span>
            <span className="text-[8px] text-gray-500 font-bold uppercase">All Nodes Operational</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;