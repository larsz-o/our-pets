import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import householdBuilder from './householdBuilder';
// import findUser from './findUserReducer';
import currentHousehold from './currentHousehold'; 

const store = combineReducers({
  user,
  login,
  householdBuilder,
  // findUser, 
  currentHousehold
});

export default store;
