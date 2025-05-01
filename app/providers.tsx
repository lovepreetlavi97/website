'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoadingProvider } from './contexts/LoadingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </Provider>
  );
} 