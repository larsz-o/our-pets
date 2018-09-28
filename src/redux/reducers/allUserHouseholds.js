import { combineReducers } from 'redux';

const totalUserHouseholds = (state = [], action) => {
    if(action.type === 'SET_ALL_USER_HOUSEHOLDS'){
        return action.payload; 
    } return state;
}
const allHouseholdMembers = (state = [], action) => {
    if (action.type === 'SET_ALL_HOUSEHOLD_MEMBERS'){
        return [...state, ...action.payload];
    } return state;
}
export default combineReducers({
    totalUserHouseholds,
    allHouseholdMembers
  });