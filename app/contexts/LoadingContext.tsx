import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import GlobalLoading from '../components/GlobalLoading';

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isFirstVisit: boolean;
  setFirstVisitComplete: () => void;
}

// Create context with default values to avoid "must be used within a LoadingProvider" error
const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setIsLoading: () => {},
  isFirstVisit: false,
  setFirstVisitComplete: () => {},
});

export const useLoading = () => {
  return useContext(LoadingContext);
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    try {
      // Check if this is the first visit
      const hasVisited = localStorage.getItem('hasVisitedBefore');
      if (!hasVisited) {
        setIsFirstVisit(true);
        // Set the flag for future visits
        localStorage.setItem('hasVisitedBefore', 'true');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const setFirstVisitComplete = () => {
    setIsFirstVisit(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isFirstVisit, setFirstVisitComplete }}>
      {isClient && isFirstVisit && <GlobalLoading onComplete={setFirstVisitComplete} />}
      {children}
    </LoadingContext.Provider>
  );
}; 