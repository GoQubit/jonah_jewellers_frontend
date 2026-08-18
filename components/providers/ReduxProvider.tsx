'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { CookiesProvider } from 'react-cookie';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}