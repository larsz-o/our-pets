import { combineReducers } from 'redux';

const findUser = (state = [], action) => {
    if (action.type === 'SET_USER'){
        return action.payload;
    }
    return state; 
}
export default combineReducers({
    findUser,
  });