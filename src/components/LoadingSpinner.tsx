import React from 'react';
import { Car } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
        <Car className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-4 text-slate-600 font-medium">Loading automotive brands...</p>
    </div>
  );
};

export default LoadingSpinner;