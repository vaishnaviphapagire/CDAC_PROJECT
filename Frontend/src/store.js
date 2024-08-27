
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // localStorage
// import UserSlice from './Features/UserSlice'; // Adjust the path as needed

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, UserSlice);

// export const store = configureStore({
//   reducer: {
//     user: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import UserSlice from './Features/UserSlice'; // Adjust the path as needed
import ImageSlice from './Features/ImageSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, UserSlice);
const persistedImageReducer = persistReducer(persistConfig, ImageSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    image: persistedImageReducer,
  },
});



export const persistor = persistStore(store);