import React from 'react';
import { Calendar, History, TrendingUp, MapPin } from 'lucide-react';
import { Brand, Language } from '../types/Brand';

interface BrandCardProps {
  brand: Brand;
  language: Language;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, language }) => {
  const brandData = brand.translations[language];
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
              {brandData.name}
            </h3>
            <p className="text-amber-600 font-medium text-lg italic">
              {brandData.description}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 group-hover:bg-blue-100 rounded-full px-4 py-2 transition-colors">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">
              {brandData.foundation}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="group/section">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <History className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800">
                {language === 'en' ? 'History' : 'Historia'}
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-12">
              {brandData.history}
            </p>
          </div>

          <div className="group/section">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800">
                {language === 'en' ? 'Trajectory' : 'Trayectoria'}
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-12">
              {brandData.trajectory}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'Est.' : 'Fund.'} {brand.foundation}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;