import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import household from './createHouseholdReducer';
import findUser from './findUserReducer';
import currentHousehold from './currentHousehold.js'; 

const store = combineReducers({
  user,
  login,
  household,
  findUser, 
  currentHousehold
});

export default store;
