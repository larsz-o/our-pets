import { combineReducers } from 'redux';

const newHousehold = {
    nickname: '',
    household_id: null,
    users: [],
    pets: [], 
}

const household = (state = newHousehold, action) => {
    if(action.type === 'SET_NICKNAME'){
        return {...state, nickname: action.payload}; 
    } else if (action.type === 'SET_NEW_PETS'){
        return {...state, pets: [...state.pets, action.payload]};
    } else if (action.type === 'SET_NEW_USERS'){
        return {...state, users: [...state.users, action.payload]};
    } else if (action.type === 'SET_HOUSE_ID'){
        return {...state, household_id: action.payload}; 
    }
    return state; 
}

export default combineReducers({
    household,
  });