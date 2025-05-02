"use client";

import React, { useEffect, useState } from 'react';

interface GlobalLoadingProps {
  onComplete: () => void;
}

const GlobalLoading = ({ onComplete }: GlobalLoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 100) {
            setTimeout(() => {
              onComplete();
            }, 500); // Slight delay before completing
            return 100;
          }
          return newProgress;
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
      style={{ opacity: progress === 100 ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
    >
      <div className="flex flex-col items-center max-w-md px-4 text-center">
        {/* Logo */}
        <div className="w-36 h-36 relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#f0f0f0" 
                strokeWidth="8"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#EC4899" 
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-pink-500">{Math.round(progress)}%</div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GIVA</h1>
        <p className="text-gray-500">
          Loading your premium jewelry experience...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoading; 