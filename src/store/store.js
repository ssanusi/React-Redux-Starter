import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { sample } from './sample';

const persistConfig = {
  key: 'root',
  storage
};

const middleware =
  process.env.NODE_ENV !== 'production' ? [logger, thunk] : thunk;

export const rootReducer = combineReducers({
  [sample.stateKey]: sample.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxDevTools =
  process.env.NODE_ENV === 'production'
    ? p => p
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    reduxDevTools
  )
);

let persistor = persistStore(store);

export { store, persistor };
