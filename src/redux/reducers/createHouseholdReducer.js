import { combineReducers } from 'redux';

const newHousehold = {
    nickname: '',
    users: [],
    pets: [], 
}

const household = (state = newHousehold, action) => {
    if(action.type === 'SET_NICKNAME'){
        return {...state, nickname: action.payload}; 
    } else if (action.type === 'SET_PETS'){
        return {...state, pets: [...state, action.payload]};
    } else if (action.type === 'SET_USERS'){
        return {...state, users: [...state, action.payload]};
    }
    return state; 
}
const findUser = (state = [], action) => {
    if (action.type === 'SET_SEARCHED_USER'){
        return action.payload;
    }
    return state; 
}

export default combineReducers({
    household,
    findUser
  });