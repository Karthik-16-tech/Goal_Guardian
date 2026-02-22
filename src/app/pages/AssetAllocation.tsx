import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, BrainCircuit, ShieldAlert, TrendingUp } from 'lucide-react';

const COLORS = ['#00C896', '#3B82F6', '#F5B800', '#6366F1'];

export function AssetAllocation() {
  const [allocation, setAllocation] = useState({
    equity: 50,
    debt: 30,
    gold: 10,
    international: 10
  });

  const total = Object.values(allocation).reduce((a, b) => a + b, 0);

  const handleSliderChange = (key: keyof typeof allocation, value: number) => {
    setAllocation(prev => ({ ...prev, [key]: value }));
  };

  // Derived metrics
  const expectedReturn = (allocation.equity * 0.12 + allocation.debt * 0.06 + allocation.gold * 0.08 + allocation.international * 0.10).toFixed(1);
  const riskLevel = (allocation.equity * 0.8 + allocation.international * 0.9 + allocation.gold * 0.4 + allocation.debt * 0.1); // Arbitrary risk score

  const getRiskLabel = (score: number) => {
    if (score > 60) return "High Risk";
    if (score > 30) return "Moderate Risk";
    return "Conservative";
  };

  const isBalanced = total === 100;

  const data = [
    { name: 'Equity', value: allocation.equity },
    { name: 'Debt', value: allocation.debt },
    { name: 'Gold', value: allocation.gold },
    { name: 'International', value: allocation.international },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Construction</h1>
          <p className="text-slate-400">Adjust your asset allocation to match your risk profile.</p>
        </div>
        
        {!isBalanced && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
          >
            <AlertTriangle size={20} />
            Total Allocation: {total}% (Must be 100%)
          </motion.div>
        )}
        
        {isBalanced && (
           <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/20 text-[#00C896] border border-[#00C896]/20 px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
          >
            <CheckCircle size={20} />
            Portfolio Balanced
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Sliders */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 space-y-8 lg:col-span-2">
          {Object.entries(allocation).map(([key, value], index) => (
            <div key={key} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-lg font-bold text-white capitalize flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                  {key}
                </label>
                <span className="text-xl font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-white">{value}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={value}
                onChange={(e) => handleSliderChange(key as any, Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: COLORS[index] }}
              />
            </div>
          ))}

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-slate-400 text-sm mb-1">Expected Return</p>
              <p className="text-2xl font-bold text-[#00C896]">{expectedReturn}%</p>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-slate-400 text-sm mb-1">Risk Level</p>
              <p className={`text-2xl font-bold ${riskLevel > 60 ? 'text-red-500' : 'text-[#F5B800]'}`}>
                {getRiskLabel(riskLevel)}
              </p>
            </div>
             <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-slate-400 text-sm mb-1">Goal Success</p>
              <p className="text-2xl font-bold text-white">{Math.min(99, Math.round(Number(expectedReturn) * 8))}%</p>
            </div>
          </div>
        </div>

        {/* Right Side - Visualization & AI */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 h-80 flex flex-col items-center justify-center relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderRadius: '12px' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#94A3B8' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                 <span className="text-3xl font-bold text-white">{total}%</span>
              </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={60} />
            </div>
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BrainCircuit size={20} className="text-[#00C896]" />
              AI Recommendation
            </h3>
            
            {riskLevel > 60 ? (
               <div className="space-y-2">
                 <p className="text-sm text-slate-300">Your portfolio is quite aggressive. Consider increasing Debt allocation to reduce volatility.</p>
                 <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 border border-white/5">
                   <ShieldAlert className="text-[#F5B800]" />
                   <span className="text-xs font-bold">Suggestion: +10% Debt</span>
                 </div>
               </div>
            ) : riskLevel < 30 ? (
               <div className="space-y-2">
                 <p className="text-sm text-slate-300">Your portfolio is very conservative. You might miss long-term growth targets.</p>
                  <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 border border-white/5">
                   <TrendingUp className="text-[#00C896]" />
                   <span className="text-xs font-bold">Suggestion: +15% Equity</span>
                 </div>
               </div>
            ) : (
               <div className="space-y-2">
                 <p className="text-sm text-slate-300">Great balance! This allocation aligns well with a moderate risk profile and long-term stability.</p>
                 <div className="bg-[#00C896]/20 p-3 rounded-lg flex items-center gap-3 border border-[#00C896]/50">
                   <CheckCircle className="text-[#00C896]" />
                   <span className="text-xs font-bold text-[#00C896]">Risk Efficient</span>
                 </div>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
