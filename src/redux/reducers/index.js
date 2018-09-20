import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import household from './createHouseholdReducer';
import findUser from './findUserReducer';
import beings from './otherBeingsReducer'; 

const store = combineReducers({
  user,
  login,
  household,
  findUser, 
  beings
});

export default store;
