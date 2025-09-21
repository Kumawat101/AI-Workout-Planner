
import React from 'react';
import { AlertTriangleIcon } from './icons';

interface ErrorMessageProps {
  message: string;
  onReset: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onReset }) => {
  return (
    <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-5 rounded-xl relative text-center animate-fade-in" role="alert">
      <strong className="font-bold block text-lg mb-2 flex items-center justify-center gap-2">
        <AlertTriangleIcon className="w-6 h-6" />
        An Error Occurred
      </strong>
      <span className="block sm:inline">{message}</span>
      <div className="mt-4">
        <button 
          onClick={onReset} 
          className="bg-red-600/50 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
