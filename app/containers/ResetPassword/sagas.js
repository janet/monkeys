import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { RESET_PASSWORD } from './constants';
import { resetPasswordSuccess } from './actions';
import { processAuthorization } from 'containers/Login/sagas';


/** Reset password saga
*/
export function* resetPasswordFlow() {
  while (true) {
    const resetPasswordRequest = yield take(RESET_PASSWORD);
    const data = resetPasswordRequest.data;
    const email = data.get('email');
    const password = data.get('password');

    const wasSuccessful = yield call(
      processAuthorization,
      { email, password, isResettingPassword: true }
    );

    if (wasSuccessful) {
      yield put(resetPasswordSuccess(wasSuccessful));
      yield call(browserHistory.push, '/login');
    }
  }
}

export function* resetPasswordFlowWatcher() {
  yield fork(resetPasswordFlow);
}

export function* resetPasswordData() {
  const watcher = yield fork(resetPasswordFlowWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  resetPasswordData,
];
