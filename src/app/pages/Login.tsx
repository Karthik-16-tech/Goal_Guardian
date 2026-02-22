import { motion } from 'motion/react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function Login() {
  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q25,40 50,60 T100,30"
            fill="none"
            stroke="#00C896"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M0,70 Q25,60 50,80 T100,50"
            fill="none"
            stroke="#F5B800"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-center p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00C896] to-[#00A87E] flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(0,200,150,0.6)]">
              G
            </div>
            <h1 className="text-3xl font-bold tracking-tight">GOAL<span className="text-[#00C896]">GUARDIAN</span></h1>
          </div>
          <p className="text-lg text-gray-300 max-w-md">Balance Goals. Master Markets. Secure Futures.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-20">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">Enter your credentials to access your dashboard.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-[#00C896] hover:underline font-medium">Forgot password?</a>
              </div>
            </div>

            <Link to="/dashboard" className="block w-full">
              <button 
                type="button"
                className="w-full bg-[#00C896] hover:bg-[#00A87E] text-black font-bold py-3 rounded-xl shadow-lg shadow-[#00C896]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 text-gray-300 backdrop-blur-xl">Or continue with</span>
              </div>
            </div>

            <Link to="/dashboard" className="block w-full">
              <button 
                type="button"
                className="w-full bg-white/5 border-2 border-white/30 text-white hover:bg-white/10 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Start as Guest
                <ArrowRight size={18} />
              </button>
            </Link>
          </form>

          <p className="mt-8 text-center text-sm text-gray-300">
            Don't have an account? <a href="#" className="text-[#00C896] font-bold hover:underline">Sign up for free</a>
          </p>
        </div>
      </div>
    </div>
  );
}
