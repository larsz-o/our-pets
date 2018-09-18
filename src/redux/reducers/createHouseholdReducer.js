import { combineReducers } from 'redux';

const newHousehold = {
    nickname: '',
    household_id: 0,
    users: [],
    pets: [], 
}

const household = (state = newHousehold, action) => {
    if(action.type === 'SET_NICKNAME'){
        return action.payload; 
    } else if (action.type === 'SET_PETS'){
        return {...state, pets: [action.payload]};
    } else if (action.type === 'SET_USERS'){
        return {...state, users: [...state, action.payload]};
    } else if (action.type === 'SET_HOUSE_ID'){
        return {...state, household_id: action.payload}; 
    }
    return state; 
}

export default combineReducers({
    household,
  
  });