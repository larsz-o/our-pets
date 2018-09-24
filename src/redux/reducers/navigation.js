import { combineReducers } from 'redux';

const nextPage = (state = '/dashboard', action) => {
    if (action.type === 'NEXT_PAGE'){
        return action.payload; 
    }
    return state; 
}

export default combineReducers({
    nextPage
  });