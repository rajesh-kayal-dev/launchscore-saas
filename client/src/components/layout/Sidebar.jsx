import { NavLink } from 'react-router';
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
  MessageSquare
} from 'lucide-react';
import { cn } from '../ui/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Websites', href: '/websites', icon: Globe },
  { name: 'Scans', href: '/scans', icon: ScanSearch },
  { name: 'API Health', href: '/api-health', icon: Zap },
  { name: 'Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Compare', href: '/compare', icon: GitCompare },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#1a1a1a] border-r border-white/5 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
            LaunchScore
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('w-5 h-5', isActive && 'text-emerald-400')} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar