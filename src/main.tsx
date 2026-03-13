import React from 'react';
import { NovelAnalysis } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Activity, Wind, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  analysis: NovelAnalysis;
}

export const Dashboard: React.FC<DashboardProps> = ({ analysis }) => {
  const themeData = analysis.themes.map(t => ({ name: t.name, value: t.weight }));
  const emotionData = analysis.emotions.map(e => ({ name: e.sentiment, value: e.score * 100, color: e.color }));

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif text-navy mb-2">{analysis.title}</h1>
          <p className="text-xl text-gold">{analysis.author}</p>
        </div>
        <div className="text-right max-w-md">
          <p className="text-navy/60 italic arabic-text leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 col-span-2"
        >
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-gold" /> الثيمات الرئيسية
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={themeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontFamily: 'Amiri', fontSize: 16 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0A192F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gold" /> النبرة العاطفية
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {emotionData.map((e, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="text-sm font-medium">{e.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" /> الشخصيات
          </h3>
          <div className="space-y-6">
            {analysis.characters.map((char, i) => (
              <div key={i} className="p-4 rounded-xl bg-paper/50 border border-navy/5">
                <h4 className="text-lg font-bold mb-1">{char.name}</h4>
                <p className="text-sm text-navy/70 mb-3 italic">{char.description}</p>
                <div className="flex flex-wrap gap-2">
                  {char.traits.map((trait, j) => (
                    <span key={j} className="px-3 py-1 bg-navy/5 text-navy/60 rounded-full text-xs">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Wind className="w-5 h-5 text-gold" /> البنية السردية والجو العام
          </h3>
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
              <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-2">الأجواء</h4>
              <p className="text-navy/80 leading-relaxed">{analysis.atmosphere}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-xl bg-navy/5">
                <h4 className="text-sm font-bold text-navy/40 uppercase tracking-wider mb-1">الصراع</h4>
                <p className="text-navy/80">{analysis.narrativeStructure.conflict}</p>
              </div>
              <div className="p-4 rounded-xl bg-navy/5">
                <h4 className="text-sm font-bold text-navy/40 uppercase tracking-wider mb-1">الذروة</h4>
                <p className="text-navy/80">{analysis.narrativeStructure.climax}</p>
              </div>
              <div className="p-4 rounded-xl bg-navy/5">
                <h4 className="text-sm font-bold text-navy/40 uppercase tracking-wider mb-1">الحل</h4>
                <p className="text-navy/80">{analysis.narrativeStructure.resolution}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
