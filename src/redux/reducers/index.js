import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import household from './createHouseholdReducer';
import findUser from './findUserReducer';

const store = combineReducers({
  user,
  login,
  household,
  findUser
});

export default store;
