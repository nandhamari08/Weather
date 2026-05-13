import React from 'react';
import { Wind, Droplets, Thermometer, Clock, MapPin } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
  const { current, location } = data;
  const temp = unit === 'C' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/20 border border-white relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-[80px] -mr-24 -mt-24 transition-transform group-hover:scale-125 duration-1000" />
      
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{location.name}</h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">{location.country}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-lg border border-slate-200">
              <Clock className="h-3 w-3 text-slate-400" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{location.localtime}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full animate-pulse" />
              <img 
                src={current.condition.icon} 
                alt={current.condition.text} 
                className="w-20 h-20 relative z-10 drop-shadow-xl"
              />
            </div>
            <div>
              <div className="flex items-start">
                <span className="text-6xl font-black text-slate-900 leading-none tracking-tighter">
                  {Math.round(temp)}
                </span>
                <span className="text-xl font-black text-blue-600 mt-2 ml-1">°</span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{current.condition.text}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 w-full sm:w-56">
          <DetailItem icon={<Thermometer className="h-4 w-4 text-orange-500" />} label="Feel" value={`${Math.round(feelsLike)}°${unit}`} bgColor="bg-orange-50" />
          <DetailItem icon={<Droplets className="h-4 w-4 text-blue-500" />} label="Humidity" value={`${current.humidity}%`} bgColor="bg-blue-50" />
          <DetailItem icon={<Wind className="h-4 w-4 text-teal-500" />} label="Wind" value={`${current.wind_kph}km/h`} bgColor="bg-teal-50" />
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: string, bgColor: string }) => (
  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/40 border border-white hover:bg-white transition-all shadow-sm group/item">
    <div className="flex items-center gap-3">
      <div className={`p-2 ${bgColor} rounded-xl shadow-sm`}>{icon}</div>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-sm font-black text-slate-800">{value}</span>
  </div>
);

export default WeatherCard;
