import { useState } from 'react';
import { motion } from 'framer-motion';
import Uploader from './components/Uploader';
import ResultsViewer from './components/ResultsViewer';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (acceptedFile) => {
    setFile(acceptedFile);
    setLoading(true);
    setError('');
    setResults(null);

    const formData = new FormData();
    formData.append('resume', acceptedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Analysis Success:', response.data);
      setResults(response.data.data);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.details || err.response?.data?.error || err.message;
      setError(`Analysis Failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] selection:bg-[#66FCF1]/30 selection:text-[#66FCF1] relative overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#66FCF1]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#45A29E]/5 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-5xl mx-auto py-20 px-6 relative">
        <header className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-5 bg-[#66FCF1]/10 rounded-3xl mb-6 border border-[#66FCF1]/20 shadow-[0_0_30px_rgba(102,252,241,0.1)]"
          >
            <Sparkles size={48} className="text-[#66FCF1]" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-[#45A29E]">Resume AI</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Harness the power of <span className="text-[#66FCF1]">Google Gemini 1.5 Flash</span> to decode technical roles, optimize keyword density, and boost your ATS ranking instantly.
          </p>
        </header>

        <main className="relative z-10">
          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-500/10 border-2 border-red-500/20 text-red-100 p-6 rounded-3xl mb-12 text-center backdrop-blur-md"
            >
              <p className="font-bold text-lg mb-2">System Alert</p>
              <p className="opacity-80">{error}</p>
              <button 
                onClick={() => setError('')} 
                className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-sm font-bold transition-all border border-red-500/30"
              >
                Dismiss & Retry
              </button>
            </motion.div>
          )}

          {!results ? (
            <Uploader onUpload={handleUpload} loading={loading} file={file} />
          ) : (
            <ResultsViewer results={results} onReset={handleReset} />
          )}
        </main>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center text-gray-600 text-sm">
            &copy; 2026 Premium Resume Analyzer. Powered by Google Gemini.
        </footer>
      </div>
    </div>
  );
}

export default App;
