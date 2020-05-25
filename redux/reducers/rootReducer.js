import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer'
import userReducer from './userReducer'

export default rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
});

