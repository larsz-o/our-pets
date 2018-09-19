import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.id || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const userName = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.username || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const household_id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.household_id || state;
    default: 
      return state; 
  }
}

const first_name = (state = null, action) => {
    switch (action.type) {
      case USER_ACTIONS.SET_USER:
      console.log(action.user);
        return action.user.first_name || state; 
      default: 
        return state; 
    }
}
const phone_number = (state = null, action) => {
    switch (action.type) {
      case USER_ACTIONS.SET_USER:
      return action.user.phone_number || state; 
    default: 
      return state;  
    }
}
const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  id,
  userName,
  isLoading,
  household_id, 
  first_name, 
  phone_number
});
