import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import household from './createHouseholdReducer';
import findUser from './findUserReducer';
import pets from './petsReducer'; 

const store = combineReducers({
  user,
  login,
  household,
  findUser, 
  pets
});

export default store;
