import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { REGISTER } from './constants';
import { registerSuccess } from './actions';
import { processAuthorization } from 'containers/Login/authorize';

// Individual exports for testing
export function* registerFlow() {
  while (true) {
    const registerRequest = yield take(REGISTER);
    const data = registerRequest.data.toJS();

    const wasSuccessful = yield call(
      processAuthorization,
      { data, isRegistering: true }
    );

    if (wasSuccessful) {
      yield put(registerSuccess(wasSuccessful));
      // confirm email modal?
      yield call(browserHistory.push, '/login');
    }
  }
}

export function* registerFlowWatcher() {
  yield fork(registerFlow);
}

export function* registerFlowData() {
  const watcher = yield fork(registerFlowWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  registerFlowData,
];
