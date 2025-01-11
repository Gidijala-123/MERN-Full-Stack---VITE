import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// If we want to use more than 1 reducer we need to combine them using combineReducers
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // to avoid errors from redux
});

export const persistor = persistStore(store);
export default store;
