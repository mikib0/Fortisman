import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import history from './history';
import currentStreak from './currentStreak';
import quotes from './quotes';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 3
};


const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ history, currentStreak, quotes })
  );
  
  export default () => {
    const store = configureStore({
      reducer: persistedReducer,
    });
  const persistor = persistStore(store);
  // persistor.purge()
  return { store, persistor };
};
