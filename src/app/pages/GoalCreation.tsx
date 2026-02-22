import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { HelpCircle, Info, Calculator, Check } from 'lucide-react';
import { Link } from 'react-router';

export function GoalCreation() {
  const [goalType, setGoalType] = useState('Retirement');
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [targetYear, setTargetYear] = useState(2045);
  const [priority, setPriority] = useState('Essential');
  const [monthlyContribution, setMonthlyContribution] = useState(25000);
  const [riskCapacity, setRiskCapacity] = useState(50); // 0 to 100

  // Mock calculation for projection
  const projectionData = useMemo(() => {
    const years = targetYear - new Date().getFullYear();
    const data = [];
    let currentAmount = 0;
    const annualReturn = 0.08 + (riskCapacity / 100) * 0.04; // 8% to 12% based on risk

    for (let i = 0; i <= years; i++) {
      data.push({
        year: new Date().getFullYear() + i,
        amount: Math.round(currentAmount),
        invested: monthlyContribution * 12 * i
      });
      currentAmount = (currentAmount + monthlyContribution * 12) * (1 + annualReturn);
    }
    return data;
  }, [targetYear, monthlyContribution, riskCapacity]);

  const finalAmount = projectionData[projectionData.length - 1]?.amount || 0;
  const fundedRatio = Math.min(100, Math.round((finalAmount / targetAmount) * 100));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white">Create New Financial Goal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Goal Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Retirement', 'Education', 'Home', 'Vehicle', 'Travel', 'Custom'].map((type) => (
                <button
                  key={type}
                  onClick={() => setGoalType(type)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                    goalType === type 
                      ? 'bg-[#00C896] text-black border-[#00C896] shadow-lg shadow-[#00C896]/20 font-bold' 
                      : 'bg-white/5 backdrop-blur-md text-slate-400 border-white/10 hover:border-[#00C896] hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Amount (₹)</label>
              <input 
                type="number" 
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full p-3 bg-[#0D2340] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Year</label>
              <input 
                type="number" 
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="w-full p-3 bg-[#0D2340] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Priority Level</label>
            <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/5">
              {['Essential', 'Important', 'Aspirational'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    priority === p 
                      ? 'bg-[#112A4A] text-white shadow-sm border border-white/10' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
              <span>Monthly Contribution (₹)</span>
              <span className="text-[#00C896] font-bold">₹{monthlyContribution.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C896]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
              <span>Risk Capacity</span>
              <span className={`font-bold ${riskCapacity > 70 ? 'text-red-500' : riskCapacity > 30 ? 'text-[#F5B800]' : 'text-blue-500'}`}>
                {riskCapacity > 70 ? 'Aggressive' : riskCapacity > 30 ? 'Moderate' : 'Conservative'}
              </span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={riskCapacity}
              onChange={(e) => setRiskCapacity(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F5B800]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>

          <button className="w-full bg-[#00C896] hover:bg-[#00A87E] text-[#0B1F3A] font-bold py-4 rounded-xl shadow-lg shadow-[#00C896]/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            <Check size={20} />
            Create Financial Goal
          </button>
        </motion.div>

        {/* Right Side - Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#112A4A] to-[#08162A] text-white p-6 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden">
             {/* Background decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00C896] rounded-full blur-[80px] opacity-20"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-slate-300 text-sm mb-1">Projected Corpus in {targetYear}</h3>
                <div className="text-4xl font-bold">₹{(finalAmount / 100000).toFixed(2)}L</div>
              </div>
              <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                <Calculator size={24} className="text-[#00C896]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Target Achievement</span>
                <span className="font-bold text-[#00C896]">{fundedRatio}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full ${fundedRatio >= 100 ? 'bg-[#00C896]' : 'bg-[#F5B800]'}`}
                  animate={{ width: `${Math.min(100, fundedRatio)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {fundedRatio >= 100 
                  ? "Great! You are on track to exceed your goal." 
                  : `You need to increase monthly contribution by ₹${Math.round((targetAmount - finalAmount) / ((targetYear - new Date().getFullYear()) * 12))} to reach 100%.`}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 h-80">
            <h3 className="font-bold text-white mb-4">Growth Projection</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C896" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E406A" />
                <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={12} tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <Tooltip 
                  formatter={(value) => [`₹${(Number(value)).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#112A4A', borderColor: '#1E406A', color: 'white', borderRadius: '12px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="amount" name="Projected Value" stroke="#00C896" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={3} />
                <Area type="monotone" dataKey="invested" name="Invested Amount" stroke="#3B82F6" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
