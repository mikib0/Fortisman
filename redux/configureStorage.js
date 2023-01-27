import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import detoxes from './detoxes';
import selectedDetox from './selectedDetox';
import quotes from './quotes';
import theme from './theme';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 17,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ detoxes, selectedDetox, quotes, theme })
);
  
export default () => {
  const store = configureStore({
    reducer: persistedReducer,
  });
  const persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};
