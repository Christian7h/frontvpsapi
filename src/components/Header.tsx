import React from 'react';
import { Car, Globe, Clock, Database } from 'lucide-react';
import { Language } from '../types/Brand';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  responseTime: string;
  cached: boolean;
  brandCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  responseTime, 
  cached, 
  brandCount 
}) => {
  const translations = {
    en: {
      title: 'Automotive Brands',
      subtitle: 'Discover the world\'s most prestigious automotive manufacturers',
      stats: 'API Stats',
      brands: 'brands',
      responseTime: 'Response Time',
      cached: 'Cached'
    },
    es: {
      title: 'Marcas Automotrices',
      subtitle: 'Descubre los fabricantes automotrices más prestigiosos del mundo',
      stats: 'Estadísticas API',
      brands: 'marcas',
      responseTime: 'Tiempo de Respuesta',
      cached: 'En Caché'
    }
  };

  const t = translations[language];

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Car className="w-16 h-16 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">{brandCount} {t.brands}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">{responseTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${cached ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
              <span className="text-sm font-medium">{cached ? t.cached : 'Live'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg p-1">
            <Globe className="w-5 h-5 text-amber-400 ml-3" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === 'es'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Español
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;