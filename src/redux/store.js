import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { advertisementsReducer } from './advertisements/slice';
import { photosReducer } from './photos/slice';
import { demoReducer } from './demo/slice';


const demoPersistConfig ={
    key: 'demo',
    storage,
}

export const store = configureStore({
    reducer: {
        advertisements: advertisementsReducer,
        photos: photosReducer,
        demo: persistReducer(demoPersistConfig, demoReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);
