import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, TrendingDown, Check, X, Settings, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const REBALANCE_DATA = [
  { name: 'Equity', current: 68, target: 60, diff: 8 },
  { name: 'Debt', current: 22, target: 30, diff: -8 },
  { name: 'Gold', current: 10, target: 10, diff: 0 },
];

export function Rebalance() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRebalance = () => {
    setShowSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-red-500/20 p-3 rounded-xl text-red-500 border border-red-500/20">
          <AlertTriangle size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Drift Alert</h1>
          <p className="text-slate-400">Your portfolio has deviated significantly from your target allocation.</p>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 bg-red-500/5">
          <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
            <TrendingDown size={24} />
            Equity allocation drifted +8% from target
          </h2>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64">
             <h3 className="font-bold text-white mb-4 text-center">Current vs Target Allocation</h3>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REBALANCE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1E406A" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} stroke="#94A3B8" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#112A4A', borderColor: '#1E406A', color: 'white', borderRadius: '12px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Bar dataKey="current" name="Current %" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="target" name="Target %" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
             <div className="flex justify-center gap-6 mt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#EF4444] rounded-sm"></span> Current
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#3B82F6] rounded-sm"></span> Target
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0D2340] p-4 rounded-xl border border-white/5">
                <p className="text-slate-400 text-xs uppercase font-bold">Est. Transaction Cost</p>
                <p className="text-xl font-bold text-white">₹ 1,250</p>
              </div>
               <div className="bg-[#0D2340] p-4 rounded-xl border border-white/5">
                <p className="text-slate-400 text-xs uppercase font-bold">Est. Tax Impact</p>
                <p className="text-xl font-bold text-white">₹ 4,500</p>
              </div>
              <div className="col-span-2 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-400 text-xs uppercase font-bold">Risk Reduction Score</p>
                    <p className="text-xl font-bold text-green-400">+15 Points</p>
                  </div>
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleRebalance}
                className="w-full bg-[#00C896] hover:bg-[#00A87E] text-[#0B1F3A] font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#00C896]/20 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Check size={20} />
                Rebalance Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-transparent border border-white/10 hover:border-[#00C896] text-slate-300 hover:text-[#00C896] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Settings size={18} />
                  Adjust Threshold
                </button>
                <button className="w-full bg-transparent border border-white/10 hover:border-red-500 text-slate-300 hover:text-red-500 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <X size={18} />
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/90 backdrop-blur-sm rounded-2xl"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 text-center max-w-sm">
              <div className="w-20 h-20 bg-[#00C896]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,200,150,0.3)]">
                <BadgeDollarSign size={40} className="text-[#00C896]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Rebalancing Initiated!</h3>
              <p className="text-slate-400 mb-6">Your portfolio is being aligned with your target allocation. Good risk management!</p>
              <div className="bg-[#F5B800]/20 text-[#F5B800] border border-[#F5B800]/20 px-4 py-2 rounded-full inline-flex items-center gap-2 font-bold text-sm">
                <span>+50 XP Earned</span>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="mt-8 block w-full bg-[#00C896] text-[#0B1F3A] font-bold py-3 rounded-xl hover:bg-[#00A87E] transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
