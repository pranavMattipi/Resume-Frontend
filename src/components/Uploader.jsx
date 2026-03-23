import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Loader2, Info } from 'lucide-react';

export default function Uploader({ onUpload, loading, file }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0 && !loading) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload, loading]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: loading
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`relative overflow-hidden group cursor-pointer rounded-[2.5rem] p-16 text-center transition-all duration-500 border-2 border-dashed
          ${isDragActive ? 'border-[#66FCF1] bg-[#66FCF1]/10 scale-[1.02]' : 'border-white/10 hover:border-[#45A29E]/50 hover:bg-white/[0.03]'}
          ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
          ${loading ? 'opacity-80 pointer-events-none' : ''} glass
        `}
      >
        <input {...getInputProps()} />
        
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#66FCF1]/5 blur-[80px] rounded-full -z-10" />

        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div 
            animate={loading ? { scale: [1, 1.1, 1], rotate: 360 } : {}}
            transition={loading ? { repeat: Infinity, duration: 2 } : {}}
            className={`p-8 rounded-3xl transition-all duration-500 
            ${isDragActive ? 'bg-[#66FCF1]/20 text-[#66FCF1] shadow-[0_0_20px_rgba(102,252,241,0.2)]' : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-[#66FCF1]'}
          `}>
            {loading ? (
               <Loader2 size={56} className="animate-spin" />
            ) : file ? (
               <FileText size={56} className="text-[#66FCF1]" />
            ) : (
               <UploadCloud size={56} />
            )}
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {loading ? 'AI Engine Working...' : 
               file ? file.name : 
               isDragActive ? 'Release to Scan' : 
               'Optimize Your Resume'}
            </h3>
            <p className="text-gray-400 text-lg max-w-sm mx-auto leading-relaxed">
              {loading ? 'Parsing your experience and calculating impact scores. This usually takes 5-10 seconds.' : 
               file ? 'Document selected successfully. Starting analysis...' : 
               'Drop your PDF here or click to browse. Let Gemini find your edge.'}
            </p>
          </div>
          
          {!loading && !file && (
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-6"
            >
              <span className="px-10 py-4 rounded-xl bg-white/5 text-[#66FCF1] border border-[#66FCF1]/20 font-bold hover:bg-[#66FCF1]/10 transition-all uppercase tracking-widest text-sm">
                Choose File
              </span>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      {!loading && !file && (
        <p className="mt-8 flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <Info size={14} />
            <span>Strictly PDF formats only. Max file size: 10MB.</span>
        </p>
      )}
    </motion.div>
  );
}
