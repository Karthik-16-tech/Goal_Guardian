import { motion } from 'motion/react';
import { Medal, Shield, TrendingUp, DollarSign, Target, Award, Lock, Zap } from 'lucide-react';
import { clsx } from 'clsx';

const ACHIEVEMENTS = [
  { 
    id: 1, 
    name: 'First Goal Achieved', 
    description: 'Create and fund your first financial goal to 100%.', 
    xp: 50, 
    icon: Target, 
    status: 'unlocked', 
    color: 'bronze' 
  },
  { 
    id: 2, 
    name: 'Bear Market Survivor', 
    description: 'Navigate a market crash without panic selling.', 
    xp: 150, 
    icon: Shield, 
    status: 'unlocked', 
    color: 'silver' 
  },
  { 
    id: 3, 
    name: 'Tax Tactician', 
    description: 'Save over ₹50,000 in taxes through smart allocation.', 
    xp: 200, 
    icon: DollarSign, 
    status: 'locked', 
    color: 'gold' 
  },
  { 
    id: 4, 
    name: 'Zero Drift Master', 
    description: 'Maintain portfolio allocation within 1% drift for 6 months.', 
    xp: 300, 
    icon: TrendingUp, 
    status: 'locked', 
    color: 'platinum' 
  },
  { 
    id: 5, 
    name: 'Arena Champion', 
    description: 'Win 3 weekly leaderboard challenges in a row.', 
    xp: 500, 
    icon: Award, 
    status: 'locked', 
    color: 'diamond' 
  },
   { 
    id: 6, 
    name: 'Quick Rebalancer', 
    description: 'Rebalance portfolio within 24 hours of drift alert.', 
    xp: 100, 
    icon: Zap, 
    status: 'unlocked', 
    color: 'bronze' 
  },
];

const COLOR_MAP = {
  bronze: 'from-orange-400 to-orange-600',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-yellow-300 to-yellow-600',
  platinum: 'from-cyan-300 to-blue-500',
  diamond: 'from-purple-400 to-pink-600',
};

export function Achievements() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-[#00C896] p-3 rounded-xl shadow-lg shadow-[#00C896]/20 text-black">
          <Medal size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Achievements</h1>
          <p className="text-slate-400">Track your progress and earn badges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => {
          const isLocked = achievement.status === 'locked';
          const Icon = achievement.icon;
          
          return (
            <motion.div 
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={clsx(
                "relative p-6 rounded-2xl border shadow-xl transition-all overflow-hidden group",
                isLocked 
                  ? "bg-white/5 backdrop-blur-md border-white/10 opacity-70" 
                  : "bg-white/10 backdrop-blur-xl border-white/20 hover:border-[#00C896]/50 hover:shadow-2xl hover:shadow-[#00C896]/10"
              )}
            >
              {isLocked && (
                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20">
                    <Lock size={24} className="text-slate-400" />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4 relative z-0">
                <div className={clsx(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                  COLOR_MAP[achievement.color as keyof typeof COLOR_MAP]
                )}>
                  <Icon size={28} />
                </div>
                <div className="bg-white/10 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 border border-white/20">
                  <span className="text-[#F5B800]">+</span> {achievement.xp} XP
                </div>
              </div>

              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#00C896] transition-colors">
                {achievement.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {achievement.description}
              </p>

              {!isLocked && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-[#00C896]">
                  <Medal size={14} />
                  <span>Unlocked on Jan 15, 2026</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
