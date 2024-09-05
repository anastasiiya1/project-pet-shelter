import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import advertisementsReducer from './advertisements/slice';
// import { categoriesReducer } from './categories/slice';
import photosReducer from './photos/slice'; 
import authReducer from './auth/slice'

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
  };

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        advertisements: advertisementsReducer,
        photos: photosReducer,
        // category: categoriesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);