import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import householdBuilder from './householdBuilder';
import currentHousehold from './currentHousehold'; 
import nextPage from './navigation'; 
import allHouseholds from './allUserHouseholds';
import inbox from './inboxReducer';

const store = combineReducers({
  user,
  login,
  householdBuilder, 
  currentHousehold,
  nextPage,
  allHouseholds,
  inbox
});

export default store;
