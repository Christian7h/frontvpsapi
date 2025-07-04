import { useState, useEffect } from 'react';
import { Brand, ApiResponse } from '../types/Brand';

interface CachedData {
  brands: Brand[];
  responseTime: string;
  timestamp: number;
}

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<string>('');
  const [cached, setCached] = useState<boolean>(false);

  const CACHE_KEY = 'brands_cache';
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 semana en milisegundos

  const getCachedData = (): CachedData | null => {
    try {
      const cachedJson = localStorage.getItem(CACHE_KEY);
      if (!cachedJson) return null;

      const cachedData: CachedData = JSON.parse(cachedJson);
      const now = Date.now();
      
      // Verificar si el caché ha expirado
      if (now - cachedData.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return cachedData;
    } catch (error) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  };

  const setCachedData = (brands: Brand[], responseTime: string) => {
    try {
      const dataToCache: CachedData = {
        brands,
        responseTime,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
    } catch (error) {
      console.warn('No se pudo guardar en caché:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar si hay datos en caché válidos
      const cachedData = getCachedData();
      if (cachedData) {
        setBrands(cachedData.brands);
        setResponseTime(cachedData.responseTime);
        setCached(true);
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://www.crisdeus.site/brands');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setBrands(data.data);
        setResponseTime(data.responseTime);
        setCached(data.cached);
        
        // Guardar los datos en caché
        setCachedData(data.data, data.responseTime);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    responseTime,
    cached,
    refetch: fetchBrands
  };
};