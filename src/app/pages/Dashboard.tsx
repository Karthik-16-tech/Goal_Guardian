import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, Shield, AlertCircle, CheckCircle, Smile } from 'lucide-react';
import { Link } from 'react-router';

const ASSET_DATA = [
  { name: 'Equity', value: 65, color: '#00C896' },
  { name: 'Debt', value: 25, color: '#3B82F6' }, // Changed from Navy to Blue for visibility
  { name: 'Gold', value: 10, color: '#F5B800' },
];

const GOALS_DATA = [
  { id: 1, name: 'Retirement Fund', target: 20000000, current: 8500000, years: 25, status: 'On Track' },
  { id: 2, name: 'Child Education', target: 5000000, current: 2100000, years: 12, status: 'Needs Attention' },
  { id: 3, name: 'Emergency Fund', target: 1000000, current: 950000, years: 0, status: 'Completed' },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-black space-y-6 p-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome, Rajesh Sharma</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Age: 35</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F5B800]"></span> Risk Profile: Moderate</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-sm text-slate-400">Client Satisfaction</p>
            <div className="flex items-center justify-end gap-1 text-[#00C896] font-bold">
              <Smile size={20} />
              <span>98/100</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg border border-white/20">
            <div className="bg-[#F5B800] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white/20">
              Lvl 3
            </div>
            <div className="text-sm">
              <p className="font-bold">Financial Planner</p>
              <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-[#00C896]" 
                  initial={{ width: 0 }} 
                  animate={{ width: "75%" }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Goals */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={24} className="text-[#00C896]" />
            Your Financial Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOALS_DATA.map((goal) => {
              const percentage = Math.round((goal.current / goal.target) * 100);
              return (
                <motion.div 
                  key={goal.id}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <TrendingUp size={80} className="text-white" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">{goal.name}</h3>
                      <p className="text-sm text-slate-400">{goal.years} years remaining</p>
                    </div>
                    {percentage >= 90 ? (
                      <CheckCircle className="text-[#00C896]" />
                    ) : percentage < 50 ? (
                      <AlertCircle className="text-red-500" />
                    ) : (
                      <div className="text-[#F5B800] font-bold text-sm">{percentage}%</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">₹{(goal.current / 100000).toFixed(1)}L / ₹{(goal.target / 100000).toFixed(1)}L</span>
                      <span className="font-bold text-white">{percentage}% Funded</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${percentage >= 90 ? 'bg-[#00C896]' : percentage < 50 ? 'bg-red-500' : 'bg-[#F5B800]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <Link to="/goals/new" className="bg-white/5 backdrop-blur-md border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:bg-white/10 hover:border-[#00C896] hover:text-[#00C896] transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform text-white border border-white/20">
                <span className="text-2xl font-light">+</span>
              </div>
              <span className="font-medium">Add New Goal</span>
            </Link>
          </div>
        </div>

        {/* Right Panel - Portfolio & Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C896] rounded-full blur-[60px] opacity-20"></div>
            <h3 className="text-slate-300 text-sm mb-1">Total Portfolio Value</h3>
            <div className="text-3xl font-bold mb-4">₹ 1,15,50,000</div>
            <div className="flex items-center gap-2 text-[#00C896] text-sm bg-white/5 w-fit px-2 py-1 rounded border border-white/5">
              <TrendingUp size={14} />
              <span>+12.5% this year</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="font-bold text-white mb-4">Asset Allocation</h3>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ASSET_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {ASSET_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="text-xs text-slate-400 block">Equity</span>
                  <span className="text-xl font-bold text-white">65%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {ASSET_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-1 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Shield size={18} className="text-[#00C896]" />
              Success Probability
            </h3>
            <div className="relative pt-4">
               {/* Speedometer-like visualization */}
               <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-gradient-to-r from-red-500 via-[#F5B800] to-[#00C896]"></div>
               </div>
               <div className="absolute top-2 left-[75%] -translate-x-1/2">
                 <div className="w-4 h-4 bg-white rotate-45 transform origin-bottom-left border-2 border-white/20 shadow-lg"></div>
               </div>
               <div className="mt-4 text-center">
                 <span className="text-2xl font-bold text-[#00C896]">High</span>
                 <p className="text-xs text-slate-400">85% Chance of meeting all goals</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
