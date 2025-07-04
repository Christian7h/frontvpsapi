import React, { useState, useMemo } from 'react';
import { useBrands } from './hooks/useBrands';
import Header from './components/Header';
import BrandCard from './components/BrandCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchFilter from './components/SearchFilter';
import { Language } from './types/Brand';

function App() {
  const { brands, loading, error, responseTime, cached, refetch } = useBrands();
  const [language, setLanguage] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'foundation'>('name');

  const filteredAndSortedBrands = useMemo(() => {
    let filtered = brands.filter(brand => {
      const brandData = brand.translations[language];
      return (
        brandData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brandData.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.translations[language].name.localeCompare(b.translations[language].name);
      } else {
        return a.foundation - b.foundation;
      }
    });

    return filtered;
  }, [brands, language, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        language={language}
        setLanguage={setLanguage}
        responseTime={responseTime}
        cached={cached}
        brandCount={brands.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : (
          <>
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              language={language}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  language={language}
                />
              ))}
            </div>
            
            {filteredAndSortedBrands.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">
                  {language === 'en' 
                    ? 'No brands found matching your search.' 
                    : 'No se encontraron marcas que coincidan con tu búsqueda.'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;