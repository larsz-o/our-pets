import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import householdReducer from './createHouseholdReducer';
import findUserReducer from './findUserReducer';

const store = combineReducers({
  user,
  login,
  householdReducer,
  findUserReducer
});

export default store;
