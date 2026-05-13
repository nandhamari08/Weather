import { useState, useEffect, useCallback } from 'react';
import { SearchBar, WeatherCard, ForecastCard, Loader, ErrorMessage, RecentSearches } from './components/index';
import { fetchWeather, fetchWeatherByCoords } from './services/weatherApi';
import type { WeatherData, SearchHistoryItem } from './types/weather';
import { CloudSun, Search, LayoutDashboard, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weather_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showLocationModal, setShowLocationModal] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('asked_location');
    }
    return false;
  });

  const handleAutoLocate = useCallback(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            setWeatherData(data);
          } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
          } finally {
            setIsLoading(false);
          }
        },
        () => setIsLoading(false)
      );
    }
  }, []);

  useEffect(() => {
    const hasAskedLocation = localStorage.getItem('asked_location');

    if (hasAskedLocation === 'granted') {
      // Use microtask to avoid synchronous state update in effect
      Promise.resolve().then(() => {
        handleAutoLocate();
      });
    }
  }, [handleAutoLocate]);

  const addToHistory = (city: string) => {
    const newItem: SearchHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      city,
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history.filter(h => h.city.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('weather_history', JSON.stringify(updatedHistory));
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      addToHistory(data.location.name);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getBgClass = () => {
    if (!weatherData) return 'weather-gradient-default';
    if (!weatherData.current.is_day) return 'weather-gradient-night';
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) return 'weather-gradient-sunny';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'weather-gradient-rainy';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'weather-gradient-cloudy';
    return 'weather-gradient-default';
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ${getBgClass()} relative overflow-hidden`}>
      {/* Aurora Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full animate-aurora pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 blur-[120px] rounded-full animate-aurora pointer-events-none" style={{ animationDelay: '-5s' }} />

      <div className="relative z-10 max-w-[1300px] mx-auto p-2 md:p-4 flex flex-col min-h-screen">
        <header className="flex justify-between items-center mb-6 bg-white/60 backdrop-blur-md p-2.5 px-4 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
              <CloudSun className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tighter uppercase">SKYCAST <span className="text-blue-600">PRO</span></h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Atmospheric Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
              <button onClick={() => setUnit('C')} className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${unit === 'C' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>C</button>
              <button onClick={() => setUnit('F')} className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${unit === 'F' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>F</button>
            </div>

          </div>
        </header>

        <main className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-5xl mb-6">
            <SearchBar onSearch={handleSearch} onLocate={handleAutoLocate} isLoading={isLoading} />
            <RecentSearches items={history} onSelect={handleSearch} onClear={() => setHistory([])} onRemove={(id) => setHistory(h => h.filter(x => x.id !== id))} />
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center"><Loader /></motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center"><ErrorMessage message={error} /></motion.div>
            ) : weatherData ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-8">
                  <WeatherCard data={weatherData} unit={unit} />
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white/60 backdrop-blur-md p-5 rounded-[2rem] border border-white shadow-xl shadow-slate-200/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
                        Next 3 Days
                      </h3>
                      <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">Live</span>
                    </div>
                    <ForecastCard forecast={weatherData.forecast.forecastday} unit={unit} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-24 h-24 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl flex items-center justify-center mb-6 border border-white hover:scale-105 transition-transform cursor-pointer">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Weather Intelligence</h2>
                <p className="text-slate-500 max-w-xs text-xs font-medium leading-relaxed">Experience hyper-accurate atmospheric visualization in a full-width pro dashboard.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-12 py-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg shadow-slate-200/10 flex justify-center items-center mb-4 mx-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">© 2026 SKYCAST GLOBAL SYSTEM</p>
        </footer>
      </div>

      {/* Location Permission Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowLocationModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-white max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MapPin className="h-10 w-10 text-blue-600 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Enable Location</h2>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">We need your location to provide accurate real-time weather and 3-day forecasts for your area.</p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem('asked_location', 'granted');
                    setShowLocationModal(false);
                    handleAutoLocate();
                  }}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
                >
                  Allow Access
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('asked_location', 'denied');
                    setShowLocationModal(false);
                  }}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-2xl transition-all text-xs uppercase tracking-widest"
                >
                  Search Manually
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
