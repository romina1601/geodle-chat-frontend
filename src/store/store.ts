import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import resetTransform from './resetTransform';


const rootReducer = combineReducers({
    game: gameReducer,
});
  
const persistConfig: PersistConfig<RootState> = {
    key: 'root',            // key used in localStorage
    version: 1,             // schema version
    storage,                // storage engine (localStorage)
    transforms: [resetTransform],
    whitelist: ['game'],    // optional right now, cause there's only one slice atm.

    // for future, when schema version will change
    migrate: async (state) => {
        return state;
    }
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
