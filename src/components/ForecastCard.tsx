import React from 'react';
import type { ForecastDay } from '../types/weather';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  return (
    <div className="flex flex-col gap-4">
      {forecast.map((day, index) => (
        <motion.div
          key={day.date}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group p-5 bg-white/40 hover:bg-white rounded-[2rem] border border-white/60 hover:border-blue-200 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text} 
                className="w-14 h-14 relative z-10 transition-transform group-hover:scale-110 duration-500"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p className="text-sm font-black text-slate-900 truncate tracking-tight">{day.day.condition.text}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-slate-900 font-black text-lg">
                  <ArrowUpRight className="h-3 w-3 text-red-500" />
                  {Math.round(unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f)}°
                </div>
                <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                  <ArrowDownRight className="h-3 w-3 text-blue-500" />
                  {Math.round(unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f)}°
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ForecastCard;
