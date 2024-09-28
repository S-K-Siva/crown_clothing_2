import {compose,legacy_createStore as createStore,applyMiddleware, } from "redux";

import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
// custom middleware
const SivaMiddleWare = (store) => (next) => (action) => 
{  
    console.log("Current State.......");
    console.log("DATA :", store.getState());
  
    
    next(action);
    console.log("New Current State........");
    console.log("DATA :", store.getState());
}

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);
console.log(process.env.NODE_ENV);
// config for persist
const persistConfig = {
    key : 'root',
    storage,
    blacklist : ['user']
}

// persistReducer (alternative for rootreducer and it keeps track of existing data after reload)
const persistedReducer = persistReducer(persistConfig,rootReducer);

const composedEnhancers = compose(applyMiddleware(...middlewares));

// export const store = createStore(rootReducer,undefined,composedEnhancers);
export const store = createStore(persistedReducer,undefined, composedEnhancers);
// createStore(root-reducer, additionalStates, Middlewares)

export const persistor = persistStore(store);