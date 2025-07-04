import { useState, useEffect } from 'react';
import { Brand, ApiResponse } from '../types/Brand';

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<string>('');
  const [cached, setCached] = useState<boolean>(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://www.crisdeus.site/brands');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setBrands(data.data);
        setResponseTime(data.responseTime);
        setCached(data.cached);
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