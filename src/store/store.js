// Redux Library

// import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// import persistStore from "redux-persist/es/persistStore";
// import persistReducer from "redux-persist/es/persistReducer";
// import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import { rootReducer } from "./root-reducer";
// import { rootSaga } from "./root-saga";

// // Custom middleware
// const SivaMiddleWare = (store) => (next) => (action) => {
//   console.log("Current State.......");
//   console.log("DATA :", store.getState());
  
//   next(action);
  
//   console.log("New Current State........");
//   console.log("DATA :", store.getState());
// };

// // Persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user'],
// };

// // Redux-saga
// const sagaMiddleware = createSagaMiddleware();

// // Middlewares
// const middlewares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean);

// // Persisted reducer (alternative for rootReducer)
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = compose(applyMiddleware(...middlewares));

// // Create store
// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// // Run sagas after the store is created
// sagaMiddleware.run(rootSaga);

// // Persistor
// export const persistor = persistStore(store);


// Redux-Tookit

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer.js"; // Assuming you have a rootReducer
import { persistStore, persistReducer } from "redux-persist"; // Correct import from 'redux-persist'
import storage from "redux-persist/lib/storage"; // This uses localStorage as default
import logger from "redux-logger";

// Middleware for logging in development
const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

// Persist Config for redux-persist
const persistConfig = {
  key: 'root',      // The key under which the state will be stored in localStorage
  storage,          // The type of storage (localStorage here)
  whitelist: ['cart'] // State slices you want to persist (in this case, 'cart')
};

// Wrap rootReducer with persistReducer
const persistRootReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with persisted reducer
export const store = configureStore({
  reducer: persistRootReducer,  // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist has non-serializable values, so we disable this check
    }).concat(middlewares),
});

// Create the persistor for managing persistence
export const persistor = persistStore(store);
