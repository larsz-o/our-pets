import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const authorized = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.authorized || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
} 
const first_name = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.first_name || state; 
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
    case USER_ACTIONS.UNSET_USER:
      return null;
    default: 
      return state; 
  }
};
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
const image_path = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.image_path || state; 
    case USER_ACTIONS.UNSET_USER:
      return null;
    default: 
      return state; 
  }
};
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
const phone_number = (state = null, action) => {
    switch (action.type) {
      case USER_ACTIONS.SET_USER:
      return action.user.phone_number; 
    case USER_ACTIONS.UNSET_USER:
      return null;
    default: 
      return state;  
    }
};
const role = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.role;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const text_alert_fed = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_fed;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const text_alert_litterbox = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_litterbox;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const text_alert_medications = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_medications;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const text_alert_walk = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_walk;
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
export default combineReducers({
  id,
  userName,
  isLoading,
  first_name, 
  household_id,
  phone_number,
  image_path, 
  authorized,
  role,
  text_alert_fed, 
  text_alert_walk,
  text_alert_medications,
  text_alert_litterbox
});
