import React, { useRef } from 'react';
import { NovelAnalysis, VisualIdentity } from '../types';
import { Palette, Type, Image as ImageIcon, Download, Share2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface IdentityGeneratorProps {
  analysis: NovelAnalysis;
  identity: VisualIdentity;
}

export const IdentityGenerator: React.FC<IdentityGeneratorProps> = ({ analysis, identity }) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const exportAsImage = async () => {
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current);
      const link = document.createElement('a');
      link.download = `${analysis.title}-identity.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const exportAsPDF = async () => {
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${analysis.title}-identity.pdf`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif text-navy">الهوية البصرية</h2>
        <div className="flex gap-4">
          <button 
            onClick={exportAsImage}
            className="px-6 py-2 bg-white border border-navy/10 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-navy/5 transition-colors"
          >
            <Download className="w-4 h-4" /> PNG
          </button>
          <button 
            onClick={exportAsPDF}
            className="px-6 py-2 bg-navy text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-navy/80 transition-colors"
          >
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      <div ref={exportRef} className="space-y-12 p-8 bg-paper rounded-3xl border border-navy/5">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Book Cover Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-serif flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gold" /> مفهوم الغلاف
            </h3>
            <div className="aspect-[3/4] bg-navy/5 rounded-2xl overflow-hidden shadow-2xl relative group">
              {identity.coverImage ? (
                <img 
                  src={identity.coverImage} 
                  alt="Book Cover" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-navy/20">
                  <Sparkles className="w-12 h-12 animate-pulse" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                <h4 className="text-2xl font-serif">{analysis.title}</h4>
                <p className="text-gold">{analysis.author}</p>
              </div>
            </div>
          </motion.div>

          {/* Symbols & Palette */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" /> محرك الرموز
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {analysis.symbols.map((sym, i) => (
                  <div key={i} className="glass-card p-4 flex items-center gap-6">
                    <div className="w-16 h-16 bg-navy text-white flex items-center justify-center rounded-xl text-2xl font-serif">
                      {sym.symbol.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gold">{sym.concept}</h4>
                      <p className="text-sm text-navy/60">{sym.description}</p>
                      <p className="text-xs mt-1 font-serif italic">الرمز: {sym.symbol}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-serif flex items-center gap-2">
                <Palette className="w-5 h-5 text-gold" /> لوحة الألوان
              </h3>
              <div className="flex gap-4">
                {identity.colorPalette.map((color, i) => (
                  <div key={i} className="flex-1 group">
                    <div 
                      className="h-24 rounded-2xl shadow-sm mb-2 transition-transform group-hover:scale-105" 
                      style={{ backgroundColor: color }} 
                    />
                    <p className="text-[10px] font-mono text-center text-navy/40">{color}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-serif flex items-center gap-2">
                <Type className="w-5 h-5 text-gold" /> مقترحات الخطوط
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-navy/5 bg-white">
                  <p className="text-xs text-navy/40 mb-2 uppercase tracking-widest">العناوين (Serif)</p>
                  <p className="text-3xl font-serif">أبجد هوز حطي كلمن</p>
                  <p className="text-sm text-navy/60 mt-1">Amiri / Traditional Arabic</p>
                </div>
                <div className="p-4 rounded-xl border border-navy/5 bg-white">
                  <p className="text-xs text-navy/40 mb-2 uppercase tracking-widest">النصوص (Sans)</p>
                  <p className="text-xl arabic-text">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</p>
                  <p className="text-sm text-navy/60 mt-1">IBM Plex Sans Arabic</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Visual Abstract / Narrative Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 pt-12 border-t border-navy/5"
        >
          <h3 className="text-xl font-serif flex items-center gap-2">
            <Share2 className="w-5 h-5 text-gold" /> التجريد البصري (Visual Abstract)
          </h3>
          <div className="h-96 bg-navy rounded-3xl relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute border border-gold/20 rounded-full"
                  style={{
                    width: `${200 + i * 50}px`,
                    height: `${200 + i * 50}px`,
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              ))}
            </div>

            {/* Narrative Nodes */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="relative">
                {/* Central Node */}
                <motion.div 
                  className="w-32 h-32 bg-gold rounded-full flex items-center justify-center text-navy font-serif text-xl font-bold shadow-[0_0_50px_rgba(212,175,55,0.3)] z-20 relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {analysis.title}
                </motion.div>

                {/* Theme Nodes */}
                {analysis.themes.slice(0, 4).map((theme, i) => {
                  const angle = (i * 360) / 4;
                  const radius = 140;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <React.Fragment key={i}>
                      <motion.div 
                        className="absolute w-[1px] bg-gold/30 origin-left"
                        style={{ 
                          left: '50%', 
                          top: '50%', 
                          width: `${radius}px`,
                          rotate: `${angle}deg`
                        }}
                      />
                      <motion.div 
                        className="absolute w-24 h-24 bg-white/10 backdrop-blur-md border border-gold/30 rounded-full flex items-center justify-center text-gold text-xs font-medium text-center p-2 z-30"
                        style={{ 
                          left: '50%', 
                          top: '50%', 
                          x: `calc(-50% + ${x}px)`,
                          y: `calc(-50% + ${y}px)`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {theme.name}
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-navy/40 text-sm italic">
            تمثيل بصري للعلاقات بين الثيمات الرئيسية والبنية السردية للرواية.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
