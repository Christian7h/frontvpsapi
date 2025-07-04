import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-red-50 rounded-2xl border border-red-200 p-8">
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h3>
      <p className="text-red-600 text-center mb-6 max-w-md">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;