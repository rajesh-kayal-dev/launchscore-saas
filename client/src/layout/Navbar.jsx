import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path
  const menuRef = useRef(null);

  // Check if the current path starts with '/app'
  const isAppPath = location.pathname.startsWith('/app');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center relative z-50">
      
      {/* Brand Identity - Conditionally Hidden */}
      {!isAppPath ? (
        <Link to="/" className="group">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">LaunchScore</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase mt-1 opacity-80">Web Health Intelligence</span>
            </div>
          </div>
        </Link>
      ) : (
        /* Empty div to maintain 'justify-between' spacing when logo is hidden */
        <div />
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Badge className="hidden sm:flex bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-bold uppercase px-3 py-1">
              Free Plan
            </Badge>

            <Link to="/app/api-health" className="text-gray-400 hover:text-white transition-colors" title="API Health">
              <Activity className="w-5 h-5" />
            </Link>

            {/* Notification Bell with Hover Popover */}
            <div className="relative group cursor-pointer">
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f0f0f]"></span>
              
              <div className="absolute top-10 right-0 w-48 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-[11px] text-gray-300 shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 pointer-events-none text-center z-50">
                <div className="flex items-center justify-center gap-2 mb-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="font-bold uppercase tracking-wider">System Status</span>
                </div>
                Your website health is optimal. No urgent alerts found.
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)} 
                className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold ring-2 ring-transparent hover:ring-emerald-500/30 transition-all shadow-lg"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </button>
              
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute right-0 mt-3 w-48 bg-[#161616] border border-white/5 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/app/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/app/settings" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1 text-left">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login"><Button variant="ghost" className="text-gray-400 hover:text-white">Sign In</Button></Link>
            <Link to="/register"><Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6">Get Started</Button></Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;