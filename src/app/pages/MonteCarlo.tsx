import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { motion } from 'motion/react';
import { HelpCircle, TrendingUp, AlertTriangle } from 'lucide-react';

const SIMULATION_DATA = Array.from({ length: 16 }, (_, i) => {
  const year = 2026 + i;
  const base = 2000000 * Math.pow(1.08, i); // 8% base growth
  return {
    year,
    p90: base * Math.pow(1.15, i), // Optimistic
    p50: base, // Median
    p10: base * Math.pow(0.9, i), // Pessimistic
    target: 5000000 // Target amount
  };
});

export function MonteCarlo() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Monte Carlo Simulation</h1>
          <div className="flex items-center gap-4 mt-2 text-slate-400">
            <span>Goal: <span className="font-semibold text-white">Child Education Fund</span></span>
            <span>•</span>
            <span>Time Horizon: <span className="font-semibold text-white">15 Years</span></span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-xl shadow-lg flex items-col text-center border border-white/20">
           <div>
             <p className="text-xs text-slate-400 uppercase tracking-wider">Success Probability</p>
             <p className="text-3xl font-bold text-[#00C896]">78%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white">Projected Wealth Distribution</h3>
            <div className="flex gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#00C896] border border-[#00C896]"></span> 90th Percentile</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#3B82F6] border border-[#3B82F6]"></span> 50th Percentile</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#EF4444] border border-[#EF4444]"></span> 10th Percentile</div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={SIMULATION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C896" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorP10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E406A" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} stroke="#94A3B8" />
              <YAxis 
                tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} 
                axisLine={false} 
                tickLine={false} 
                stroke="#94A3B8"
              />
              <Tooltip 
                formatter={(value: number) => [`₹${(value / 100000).toFixed(2)} Lakhs`, 'Value']}
                labelStyle={{ color: '#94A3B8' }}
                contentStyle={{ backgroundColor: '#112A4A', borderColor: '#1E406A', color: 'white', borderRadius: '12px' }}
                itemStyle={{ color: 'white' }}
              />
              <ReferenceLine y={5000000} label={{ value: "Target Goal", fill: '#EF4444' }} stroke="#EF4444" strokeDasharray="3 3" />
              
              <Area type="monotone" dataKey="p90" stroke="#00C896" fillOpacity={1} fill="url(#colorP90)" strokeWidth={2} name="Optimistic" />
              <Area type="monotone" dataKey="p50" stroke="#3B82F6" fillOpacity={1} fill="url(#colorP50)" strokeWidth={2} name="Median" />
              <Area type="monotone" dataKey="p10" stroke="#EF4444" fillOpacity={1} fill="url(#colorP10)" strokeWidth={2} name="Pessimistic" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Side Stats Panel */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#112A4A] p-6 rounded-2xl shadow-xl border border-white/5"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-[#3B82F6]" />
              <h3 className="font-bold text-lg text-white">Projected Corpus</h3>
            </div>
            <p className="text-3xl font-bold text-[#00C896] mb-1">₹ 65.4 Lakhs</p>
            <p className="text-sm text-slate-400">Median outcome in 2041</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#112A4A] p-6 rounded-2xl shadow-xl border border-white/5"
          >
             <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-[#F5B800]" />
              <h3 className="font-bold text-lg text-white">Shortfall Risk</h3>
            </div>
            <p className="text-3xl font-bold text-[#F5B800] mb-1">22%</p>
            <p className="text-sm text-slate-400">Chance of not meeting target</p>
            
            <div className="mt-4 p-3 bg-red-500/10 text-red-400 text-xs rounded-lg border border-red-500/20">
              <strong>Warning:</strong> In the worst 5% of scenarios, your corpus might only reach ₹28 Lakhs. Consider increasing monthly investment.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#112A4A] to-[#08162A] text-white p-6 rounded-2xl shadow-xl border border-white/10"
          >
            <h3 className="font-bold mb-4 text-[#00C896]">Improve Your Odds</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#00C896] flex items-center justify-center text-[#0B1F3A] font-bold text-xs">+</div>
                <span className="text-slate-200">Increase SIP by ₹5,000/mo</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#00C896] flex items-center justify-center text-[#0B1F3A] font-bold text-xs">+</div>
                <span className="text-slate-200">Extend goal by 2 years</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#00C896] flex items-center justify-center text-[#0B1F3A] font-bold text-xs">+</div>
                <span className="text-slate-200">Reduce equity exposure</span>
              </li>
            </ul>
            <button className="w-full mt-6 bg-[#00C896] hover:bg-[#00A87E] text-[#0B1F3A] font-bold py-2 rounded-lg transition-colors shadow-lg shadow-[#00C896]/20">
              Apply Suggestions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
