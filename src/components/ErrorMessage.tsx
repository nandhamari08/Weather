import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-sm mx-auto mt-8 p-6 pro-card bg-red-50/20 border-red-100 flex flex-col items-center text-center">
      <div className="p-3 bg-red-50 rounded-xl mb-4">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">Request Failed</h3>
      <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Request
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
