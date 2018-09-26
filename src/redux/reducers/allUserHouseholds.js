import { combineReducers } from 'redux';

const totalUserHouseholds = (state = [], action) => {
    if(action.type === 'SET_ALL_USER_HOUSEHOLDS'){
        return action.payload; 
    } return state;
}
export default combineReducers({
    totalUserHouseholds
  });