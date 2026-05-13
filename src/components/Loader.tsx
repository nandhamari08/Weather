import React from 'react';
import { CloudRain } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-150 animate-pulse" />
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 border-[8px] border-slate-100/50 rounded-[3rem]"></div>
          <div className="absolute inset-0 border-[8px] border-blue-600 rounded-[3rem] border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CloudRain className="h-8 w-8 text-blue-600 animate-bounce" />
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-2 text-center">
        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Calibrating Data</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] animate-pulse">Syncing with Global Satellites</p>
      </div>
    </div>
  );
};

export default Loader;
