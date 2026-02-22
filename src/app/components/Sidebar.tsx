import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Target, 
  PieChart, 
  TrendingUp, 
  RefreshCw, 
  AlertTriangle, 
  Trophy, 
  Award,
  LogOut,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/goals/new', label: 'Create Goal', icon: Target },
  { path: '/allocation', label: 'Asset Allocation', icon: PieChart },
  { path: '/simulation', label: 'Monte Carlo', icon: TrendingUp },
  { path: '/rebalance', label: 'Rebalance', icon: RefreshCw },
  { path: '/crash-alert', label: 'Crash Alert', icon: AlertTriangle },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/achievements', label: 'Achievements', icon: Award },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-md text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <AnimatePresence mode="wait">
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className={clsx(
              "fixed md:sticky top-0 left-0 h-screen w-64 bg-black/95 backdrop-blur-xl text-white flex flex-col shadow-2xl z-40 border-r border-white/10",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00C896] to-[#00A87E] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(0,200,150,0.5)]">
                  G
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  GOAL<span className="text-[#00C896]">GUARDIAN</span>
                </h1>
              </div>
              <div className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Rajesh Sharma</p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00C896]"></span>
                    <p className="text-xs text-gray-400">Level 3 Planner</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                      isActive 
                        ? "bg-[#00C896]/10 text-[#00C896]" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute left-0 w-1 h-full bg-[#00C896] rounded-r-full"
                      />
                    )}
                    <Icon size={20} className={clsx(isActive ? "text-[#00C896]" : "group-hover:text-white")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <Link 
                to="/"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
