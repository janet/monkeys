import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { LOGOUT } from './constants';
import { logoutSuccess } from './actions';
import authorize from 'containers/Login/authorize';


/** Logout saga
*/
export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT);
    const wasSuccessful = yield call(authorize.logout);

    if (wasSuccessful) {
      yield put(logoutSuccess(wasSuccessful));
      yield call(browserHistory.push, '/logout');
    }
  }
}

export function* logoutFlowWatcher() {
  const watcher = yield fork(logoutFlow);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  logoutFlowWatcher,
];
