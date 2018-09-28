import { combineReducers } from 'redux';

const newMessages = (state = [], action) => {
    if (action.type ==='SET_NEW_MESSAGES'){
        return action.payload
    } return state;
}
const archivedMessages = (state = [], action) => {
    if (action.type === 'SET_ARCHIVED_MESSAGES'){
        return action.payload
    } return state;
}
const sentMessages = (state = [], action) => {
    if (action.type === 'SET_SENT_MESSAGES'){
        return action.payload;
    } return state;
}
const invitations = (state = [], action) => {
    if (action.type === 'SET_INVITATIONS'){
        return action.payload;
    } return state;
}
export default combineReducers({
   newMessages,
   archivedMessages, 
   sentMessages,
   invitations
  });