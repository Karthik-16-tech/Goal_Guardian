import { motion } from 'motion/react';
import { AlertTriangle, TrendingDown, ArrowDown, Shield, RefreshCw, LogOut } from 'lucide-react';
import { Link } from 'react-router';

export function MarketCrash() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl text-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-red-500/30"
      >
        <div className="bg-red-500/10 p-6 border-b border-red-500/20 flex items-center gap-4">
          <div className="bg-red-500/20 p-3 rounded-full animate-pulse">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-100">Market Crash Alert</h1>
            <p className="text-red-300">Nifty 50 Index is down 20% in the last month.</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#0D2340] p-4 rounded-xl border border-white/5 text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Portfolio Impact</p>
              <div className="flex items-center justify-center gap-1 text-red-400 font-bold text-2xl">
                <ArrowDown size={20} />
                <span>12.5%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">- ₹14.3 Lakhs</p>
            </div>
            <div className="bg-[#0D2340] p-4 rounded-xl border border-white/5 text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Success Probability</p>
              <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold text-2xl">
                <ArrowDown size={20} />
                <span>8%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">From 85% to 77%</p>
            </div>
            <div className="bg-[#0D2340] p-4 rounded-xl border border-white/5 text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Panic Meter</p>
              <div className="relative w-full h-8 bg-[#0B1F3A] rounded-full mt-2 overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 w-full opacity-80"></div>
                <motion.div 
                  initial={{ left: "0%" }}
                  animate={{ left: "75%" }}
                  transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                ></motion.div>
              </div>
              <p className="text-xs text-red-400 mt-1 font-bold">High Anxiety</p>
            </div>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex gap-4">
             <div className="text-blue-400">
               <Shield size={24} />
             </div>
             <div>
               <h3 className="font-bold text-blue-100 mb-1">Historical Context</h3>
               <p className="text-sm text-slate-300">Since 2000, markets have recovered from 20% drops within 18 months on average. Staying invested yields 3x better returns than timing the exit.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard" className="col-span-1 md:col-span-1">
              <button className="w-full h-full bg-[#00C896] hover:bg-[#00A87E] text-[#0B1F3A] font-bold py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-[#00C896]/20">
                <Shield size={24} />
                <span>Stay Invested</span>
                <span className="text-[10px] opacity-70">Recommended</span>
              </button>
            </Link>
            
            <Link to="/rebalance" className="col-span-1 md:col-span-1">
              <button className="w-full h-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1 border border-white/10">
                <RefreshCw size={24} />
                <span>Rebalance</span>
                <span className="text-[10px] opacity-70">Opportunity to buy low</span>
              </button>
            </Link>

            <Link to="/allocation" className="col-span-1 md:col-span-1">
              <button className="w-full h-full bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1 border border-red-500/20">
                <LogOut size={24} />
                <span>Shift to Debt</span>
                <span className="text-[10px] opacity-70">Lock in losses</span>
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
