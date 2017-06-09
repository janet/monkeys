import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { AUTHORIZE } from './constants';
import { authorizedSuccess } from './actions';
import { processAuthorization } from './authorize';


/**
 * Log in saga
 */
export function* loginFlow() {
  while (true) {
    const authorizeResult = yield take(AUTHORIZE);
    const data = authorizeResult.data;
    const wasSuccessful = yield call(processAuthorization, { data: data.toJS() });
    if (wasSuccessful) {
      yield put(authorizedSuccess(wasSuccessful));
      yield call(browserHistory.push, '/');
    }
  }
}

export function* loginFlowWatcher() {
  yield fork(loginFlow);
}

export function* loginFlowData() {
  const watcher = yield fork(loginFlowWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  loginFlowData,
];
