import { motion } from 'motion/react';
import { Trophy, Star, TrendingUp, Users, Crown, Medal } from 'lucide-react';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Vikram Singh', goalScore: 98, efficiency: 95, satisfaction: 4.9, points: 2450 },
  { rank: 2, name: 'Priya Patel', goalScore: 96, efficiency: 92, satisfaction: 4.8, points: 2380 },
  { rank: 3, name: 'Rajesh Sharma', goalScore: 94, efficiency: 89, satisfaction: 4.9, points: 2310, isCurrentUser: true }, // Current User
  { rank: 4, name: 'Amit Kumar', goalScore: 91, efficiency: 88, satisfaction: 4.7, points: 2250 },
  { rank: 5, name: 'Sneha Gupta', goalScore: 90, efficiency: 85, satisfaction: 4.6, points: 2190 },
];

export function Leaderboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#F5B800] p-3 rounded-xl shadow-lg shadow-[#F5B800]/20 text-[#0B1F3A]">
              <Trophy size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Weekly Market Mayhem</h1>
              <p className="text-slate-400">Compete with other planners in simulated scenarios.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#00C896]">Season 4 ends in</p>
            <p className="text-2xl font-bold text-white">2d 14h</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 backdrop-blur-md border-b border-white/5 text-xs uppercase text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Planner</th>
                <th className="px-6 py-4 text-center">Goal Score</th>
                <th className="px-6 py-4 text-center">Efficiency</th>
                <th className="px-6 py-4 text-center">Satisfaction</th>
                <th className="px-6 py-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {LEADERBOARD_DATA.map((user, index) => (
                <motion.tr 
                  key={user.rank}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${user.isCurrentUser ? 'bg-[#00C896]/10 border-l-4 border-[#00C896]' : 'hover:bg-white/5'} transition-colors`}
                >
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1 ? 'bg-[#F5B800] text-[#0B1F3A]' : 
                      user.rank === 2 ? 'bg-slate-300 text-slate-700' : 
                      user.rank === 3 ? 'bg-amber-700 text-white' : 'text-slate-500'
                    }`}>
                      {user.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                      {/* Placeholder Avatar */}
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1E406A] to-[#0D2340]"></div>
                    </div>
                    {user.name} {user.isCurrentUser && <span className="text-xs bg-[#00C896] text-[#0B1F3A] px-2 py-0.5 rounded-full font-bold">You</span>}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-300">{user.goalScore}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{user.efficiency}%</td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-1 text-yellow-500 font-bold">
                    <Star size={14} fill="#EAB308" /> {user.satisfaction}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-[#00C896]">{user.points}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold mb-1">Current Level</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Crown className="text-[#F5B800]" />
                Level 3 Planner
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[#00C896] font-bold text-xl">2,310 XP</p>
              <p className="text-xs text-slate-400">Total Earned</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progress to Level 4</span>
              <span>190 XP to go</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#00C896] to-[#00A87E]" 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Medal className="text-[#F5B800]" />
            Recent Badges
          </h3>
          <div className="grid grid-cols-3 gap-4">
             {[
               { name: "Risk Manager", icon: "🛡️", color: "bg-blue-500/20 text-blue-200 border border-blue-500/30" },
               { name: "Goal Setter", icon: "🎯", color: "bg-green-500/20 text-green-200 border border-green-500/30" },
               { name: "Early Bird", icon: "🌅", color: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/30" },
             ].map((badge, i) => (
               <div key={i} className={`aspect-square rounded-xl ${badge.color} flex flex-col items-center justify-center p-2 text-center transition-transform hover:scale-105 cursor-pointer`}>
                 <div className="text-2xl mb-1">{badge.icon}</div>
                 <div className="text-[10px] font-bold leading-tight">{badge.name}</div>
               </div>
             ))}
          </div>
          <button className="w-full mt-4 text-[#00C896] font-bold text-sm hover:underline">View All Achievements →</button>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden border border-white/10">
           <div className="relative z-10">
             <h3 className="font-bold text-lg mb-2">Challenge Invite</h3>
             <p className="text-sm text-indigo-100 mb-4">"Bear Market Survival" simulation starts in 2 hours.</p>
             <button className="bg-white text-indigo-600 font-bold px-4 py-2 rounded-lg text-sm w-full shadow-lg">Join Now (+200 XP)</button>
           </div>
           <div className="absolute top-0 right-0 p-4 opacity-20">
             <Users size={80} />
           </div>
        </div>
      </div>
    </div>
  );
}
