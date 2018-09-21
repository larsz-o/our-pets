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
const fed_alert = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_fed || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
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
const litterbox_alert = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_litterbox || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const medications_alert = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_medications || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const phone_number = (state = null, action) => {
    switch (action.type) {
      case USER_ACTIONS.SET_USER:
      return action.user.phone_number || state; 
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
const walk_alert = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.text_alert_walk || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
const role = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.role || state;
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
  walk_alert,
  fed_alert, 
  litterbox_alert, 
  medications_alert, 
  authorized,
  role
});
