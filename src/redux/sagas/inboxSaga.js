import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';


function* sendMessages(action) {
    try{
        yield call(axios.post, '/api/inbox', action.payload);
        yield put (swal('Success!', 'Message sent!', 'success')); 
    } catch (error) {
        console.log('Error sending message', error);
        swal('Oh no!', 'Something went wrong sending your message', 'warning'); 
    }
  }
  function* acceptInvitation(action){
      try{
        yield call(axios.post, '/api/household/accept', action.payload);
        yield put (swal('Success!', 'Invitation accepted!', 'success')); 
      } catch (error){
          console.log('Error accepting invitation', error); 
          swal('Oh no!', 'Something went wrong accepting this invitation', 'warning'); 
      }
  }
  function* archiveMessages(action) {
    try{
        yield call(axios.put, '/api/inbox', action.payload);
        yield put (swal('Success!', 'Message archived!', 'success')); 
    } catch (error) {
        console.log('Error archiving message', error);
        swal('Oh no!', 'Something went wrong archiving your message', 'warning'); 
    }
  }
  function* fetchNewMessages() {
    try{
        const messageFetch = yield call(axios.get, '/api/inbox?archived=false&invitation=false');
        const responseAction = { type: 'SET_NEW_MESSAGES', payload: messageFetch.data };
        yield put(responseAction);
    } catch (error) {
        console.log('Error getting new messages', error);
    }
  }
  function* fetchArchivedMessages() {
    try{
        const archivedMessageFetch = yield call(axios.get, '/api/inbox?archived=true&invitation=false');
        const responseAction = { type: 'SET_ARCHIVED_MESSAGES', payload: archivedMessageFetch.data };
        yield put(responseAction);
    } catch (error) {
        console.log('Error getting archived messages', error);
    }
  }
  function* fetchInvitations() {
    try{
        const invitationsFetch = yield call(axios.get, '/api/inbox?archived=false&invitation=true');
        const responseAction = { type: 'SET_INVITATIONS', payload: invitationsFetch.data };
        yield put(responseAction);
    } catch (error) {
        console.log('Error getting invitations', error);
    }
  }
  function* fetchSentMessages() {
    try{
        const sentMessageFetch = yield call(axios.get, '/api/inbox/sent');
        const responseAction = { type: 'SET_SENT_MESSAGES', payload: sentMessageFetch.data };
        yield put(responseAction);
    } catch (error) {
        console.log('Error getting archived messages', error);
    }
  }
  function* inboxSaga(){
      yield takeLatest('POST_MESSAGE', sendMessages); 
      yield takeLatest('FETCH_NEW_MESSAGES', fetchNewMessages);
      yield takeLatest('FETCH_ARCHIVED_MESSAGES', fetchArchivedMessages);
      yield takeLatest('FETCH_SENT_MESSAGES', fetchSentMessages);
      yield takeLatest('ARCHIVE_MESSAGE', archiveMessages); 
      yield takeLatest('FETCH_INVITATIONS', fetchInvitations);
      yield takeLatest('ACCEPT_INVITATION', acceptInvitation);
  }
export default inboxSaga;