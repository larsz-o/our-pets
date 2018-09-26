import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import householdBuilder from './householdBuilder';
import currentHousehold from './currentHousehold'; 
import nextPage from './navigation'; 
import allHouseholds from './allUserHouseholds';

const store = combineReducers({
  user,
  login,
  householdBuilder, 
  currentHousehold,
  nextPage,
  allHouseholds
});

export default store;
