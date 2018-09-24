import { combineReducers } from 'redux';

const findHousehold= (state = [], action) => {
    if (action.type === 'SET_SEARCHED_USER'){
        return action.payload;
    }
    return state; 
}
export default combineReducers({
    findHousehold,
  });