import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './Features/cartSlice/cartSlice';
import inventoryReducer from './Features/inventorySlice/inventorySlice';
import ordersReducer from './Features/ordersSlice/ordersSlice';
import transactionsReducer from './Features/transactionsSlice/transactionsSlice';
import filterReducer from "./Features/filterSlice/filterSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  inventory: inventoryReducer,
  orders: ordersReducer,
  transactions: transactionsReducer,
  filters: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist cart data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;