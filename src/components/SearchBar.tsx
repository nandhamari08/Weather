import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocate, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm shadow-slate-200/50"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white text-xs font-black rounded-2xl transition-all shadow-lg shadow-slate-900/10 active:scale-95 uppercase tracking-widest flex items-center gap-2 min-w-[120px] justify-center"
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="h-3.5 w-3.5" />
              <span>Analyze</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onLocate}
          disabled={isLoading}
          className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 rounded-2xl transition-all shadow-sm active:scale-95 group/locate"
        >
          <MapPin className="h-5 w-5 group-hover/locate:animate-bounce" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
