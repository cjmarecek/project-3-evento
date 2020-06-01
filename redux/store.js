import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const persistConfig = {
  key: 'root',
  storage
  // whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });


export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));


export let persistor = persistStore(store);
