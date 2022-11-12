import {compose, createStore, applyMiddleware, Middleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


// To solve redux-looger issue or third party libraries try
// npm i --save-dev @types/library name
// in the case of redux logger it becomes npm i --save-dev @types/redux-logger

export type RootState = ReturnType<typeof rootReducer>;
declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
// You can either use REDUX THUNK or REDUX SAGA
// Code for REDUX- THUNK

//currying a function is a function that  returns another function
// const curryFunc = (a) => (b, c) => {
//     return a + b + c;
// }
// const withA = curryFunc(3);
// withA(5,6)

// const loggerMiddleWare = (store) => (next) =>(action) =>{
//     if(!action.type){
//         return next(action);
//     }
//     console.log("type", action.type);
//     console.log("payload", action.payload);
//     console.log("currentState", store.getState());

//     next(action);
//     console.log("next state", store.getState());
// }

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    // blacklist: ['user']  for values you dont want to persist
    // whitelist for values you want to persist
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const  sagaMiddleware = createSagaMiddleware();
// TO use THUNK
// const middleWares = [process.env.NODE_ENV === "development" && logger, thunk].filter(Boolean);
// TO USE SAGA
// const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter(Boolean);
const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));
const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

 
export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);




