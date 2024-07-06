// src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
import { thunk } from "redux-thunk";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: () => [thunk],
});

// const token = localStorage.getItem("token");
// if (token) {
//   store.dispatch({ type: "auth/restoreSession", payload: { token } });
// }

export const persistor = persistStore(store);
export default store;
