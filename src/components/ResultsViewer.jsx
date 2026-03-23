import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, RefreshCcw, TrendingUp } from 'lucide-react';

export default function ResultsViewer({ results, onReset }) {
  if (!results) return null;

  const { atsScore, strengths, weaknesses, suggestions } = results;

  // Determine color based on score
  let scoreColor = 'text-[#66FCF1]';
  let scoreBg = 'bg-[#66FCF1]/10 border-[#66FCF1]/20';
  let scoreMessage = "Great job! Your resume is highly competitive.";

  if (atsScore < 70) {
    scoreColor = 'text-[#45A29E]';
    scoreBg = 'bg-[#45A29E]/10 border-[#45A29E]/20';
    scoreMessage = "Solid foundation, but there's room for optimization.";
  }
  if (atsScore < 50) {
    scoreColor = 'text-red-400';
    scoreBg = 'bg-red-400/10 border-red-400/20';
    scoreMessage = "Critical improvements needed for ATS compatibility.";
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-20"
    >
      {/* Premium Score Section */}
      <motion.div 
        variants={itemVariants} 
        className={`relative overflow-hidden glass p-10 rounded-[2rem] border-2 text-center ${scoreBg}`}
      >
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <TrendingUp size={120} />
        </div>
        
        <h2 className="text-xl font-medium text-gray-400 mb-2 uppercase tracking-widest">ATS Compatibility Score</h2>
        <div className="relative inline-block">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className={`text-8xl font-black ${scoreColor} drop-shadow-[0_0_15px_rgba(102,252,241,0.3)]`}
            >
            {atsScore}
            </motion.div>
            <span className="absolute -right-10 bottom-4 text-2xl text-gray-500 font-bold">/100</span>
        </div>
        <p className="mt-4 text-lg text-gray-300 font-medium italic">"{scoreMessage}"</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths Section */}
        <motion.div 
          variants={itemVariants} 
          className="glass p-8 rounded-[2rem] border border-white/5 hover:border-green-400/20 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-green-400/20 rounded-lg">
                <CheckCircle2 className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Top Strengths</h3>
          </div>
          <ul className="space-y-5">
            {strengths.map((item, idx) => (
              <li key={idx} className="group flex items-start space-x-4">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 group-hover:scale-150 transition-transform" />
                <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses Section */}
        <motion.div 
          variants={itemVariants} 
          className="glass p-8 rounded-[2rem] border border-white/5 hover:border-red-400/20 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-red-400/20 rounded-lg">
                <XCircle className="text-red-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Areas to Improve</h3>
          </div>
          <ul className="space-y-5">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="group flex items-start space-x-4">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-red-400 group-hover:scale-150 transition-transform" />
                <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Actionable Insights */}
      <motion.div 
        variants={itemVariants} 
        className="glass p-10 rounded-[2rem] border border-[#66FCF1]/20 relative bg-gradient-to-br from-[#1F2833]/80 to-[#0B0C10]/80"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-[#66FCF1]/20 rounded-xl">
            <Lightbulb className="text-[#66FCF1]" size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">Actionable Suggestions</h3>
            <p className="text-gray-400 mt-1">Implement these tips to stand out to recruiters</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ x: 5 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 text-gray-300 hover:bg-white/10 transition-all flex items-center space-x-4"
            >
              <span className="text-2xl opacity-20 font-black italic">{String(idx + 1).padStart(2, '0')}</span>
              <span className="font-medium text-[15px]">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reset CTA */}
      <motion.div variants={itemVariants} className="text-center pt-8">
        <button 
          onClick={onReset}
          className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-[#66FCF1] text-[#0B0C10] font-black rounded-2xl overflow-hidden hover:scale-105 transition-all focus:ring-4 focus:ring-[#66FCF1]/40"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative z-10 text-lg">Analyze Another Resume</span>
        </button>
      </motion.div>

    </motion.div>
  );
}
