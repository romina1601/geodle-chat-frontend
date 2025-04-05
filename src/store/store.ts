import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',            // key used in localStorage
    storage,                // storage engine (localStorage)
  };

const persistedReducer = persistReducer(persistConfig, gameReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
