import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import household from './createHouseholdReducer';

const store = combineReducers({
  user,
  login,
  household
});

export default store;
