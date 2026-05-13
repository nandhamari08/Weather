import React from 'react';
import { X, Compass } from 'lucide-react';
import type { SearchHistoryItem } from '../types/weather';

interface RecentSearchesProps {
  items: SearchHistoryItem[];
  onSelect: (city: string) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ items, onSelect, onClear, onRemove }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-2">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
          <Compass className="h-4 w-4 text-blue-500 animate-spin-slow" />
          Recent Explorations
        </h3>
        <button 
          onClick={onClear}
          className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
        >
          Reset History
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 pl-6 pr-3 py-3.5 bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-1 transition-all cursor-pointer group"
            onClick={() => onSelect(item.city)}
          >
            <span className="text-sm font-black text-slate-800 tracking-tight">{item.city}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="p-1.5 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
