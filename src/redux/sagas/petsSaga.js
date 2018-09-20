import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import { callUser } from '../requests/userRequests';


function* petsSaga() {
    yield takeLatest(USER_ACTIONS.GET_PETS, fetchPets);
  }

  export default petsSaga; 