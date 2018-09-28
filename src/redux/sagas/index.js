import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import inboxSaga from './inboxSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    inboxSaga(),
    // watchIncrementAsync()
  ]);
}
