
import { Bell, User, Activity } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="h-16 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-sm flex items-center justify-end px-4 md:px-6 gap-2 md:gap-4 fixed top-0 right-0 left-0 lg:left-64 z-10">
            {/* Plan Badge */}
            <Badge className="hidden sm:flex bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-gradient-to-r hover:from-emerald-500/30 hover:to-emerald-600/20">
                Free Plan
            </Badge>

            {/* API Health Icon */}
            <button
                onClick={() => navigate('/api-health')}
                className="group relative p-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-300"
                title="API Health"
            >
                <Activity className="w-5 h-5 text-white group-hover:text-emerald-400 transition-colors duration-300" />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] text-xs text-white px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    API Health
                </span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                </div>
            </button>
        </header>
    )
}

export default Header

