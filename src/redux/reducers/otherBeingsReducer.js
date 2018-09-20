import { combineReducers } from 'redux';

const currentPets = (state = [], action) => {
    if (action.type === 'SET_EXISTING_PETS'){
        return action.payload;
    }
    return state; 
}
const currentHouseholdMembers = (state = [], action) => {
    if (action.type === 'SET_HOUSEHOLD_MEMBERS'){
        return action.payload;
    }
    return state; 
}
export default combineReducers({
    currentPets,
    currentHouseholdMembers
  });