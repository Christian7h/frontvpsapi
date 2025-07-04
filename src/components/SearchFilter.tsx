import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Language } from '../types/Brand';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'name' | 'foundation';
  setSortBy: (sort: 'name' | 'foundation') => void;
  language: Language;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  language
}) => {
  const translations = {
    en: {
      search: 'Search brands...',
      sortBy: 'Sort by',
      name: 'Name',
      founded: 'Founded'
    },
    es: {
      search: 'Buscar marcas...',
      sortBy: 'Ordenar por',
      name: 'Nombre',
      founded: 'Fundación'
    }
  };

  const t = translations[language];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-slate-500" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'foundation')}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 bg-white"
        >
          <option value="name">{t.sortBy}: {t.name}</option>
          <option value="foundation">{t.sortBy}: {t.founded}</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;