import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Type, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadPageProps {
  onAnalyze: (text: string) => void;
  onTryExample: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onAnalyze, onTryExample }) => {
  const [text, setText] = useState('');
  
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAnalyze(reader.result);
      }
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'text/plain': ['.txt'], 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-serif mb-4 text-navy">عتبات AI</h1>
        <p className="text-xl text-navy/60 max-w-2xl mx-auto">
          حوّل نصوصك الأدبية إلى هوية بصرية متكاملة. حلل الرواية، استخلص الرموز، وصمم الغلاف.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 h-full flex flex-col">
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5" /> رفع النص
            </h2>
            
            <div 
              {...getRootProps()} 
              className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors cursor-pointer ${
                isDragActive ? 'border-gold bg-gold/5' : 'border-navy/10 hover:border-gold/50'
              }`}
            >
              <input {...getInputProps()} />
              <FileText className="w-12 h-12 text-navy/20 mb-4" />
              <p className="text-navy/60 text-center">
                اسحب ملف الرواية هنا (PDF أو TXT)
              </p>
              <button className="mt-4 px-6 py-2 bg-navy text-white rounded-full text-sm font-medium">
                تصفح الملفات
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-navy/5">
              <button 
                onClick={onTryExample}
                className="w-full py-4 px-6 rounded-xl border border-gold/30 text-gold font-medium flex items-center justify-center gap-3 hover:bg-gold/5 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                تجربة الرواية النموذجية: "المنشق"
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col">
          <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
            <Type className="w-5 h-5" /> لصق النص
          </h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أدخل نص الرواية هنا..."
            className="flex-1 w-full p-4 rounded-xl bg-paper/50 border border-navy/10 focus:border-gold outline-none resize-none arabic-text text-lg"
          />
          <button 
            disabled={!text.trim()}
            onClick={() => onAnalyze(text)}
            className="mt-6 w-full py-4 bg-navy text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            بدء التحليل
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
