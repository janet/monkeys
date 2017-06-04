import { call,
         cancel,
         fork,
         put,
         take,
         race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { AUTHORIZE } from './constants';
import { authorizedSuccess, authorizingError } from './actions';
import authorize from './authorize';
import genSalt from './salt';
import { hashSync } from 'bcryptjs';

export function* processAuthorization({ email, password, isRegistering = false, isResettingPassword = false }) {
  try {
    const salt = genSalt(email);
    const hash = hashSync(password, salt);

    let authorizeResult;
    if (isRegistering) {
      authorizeResult = yield call(authorize.register, email, hash);
    } else if (isResettingPassword) {
      authorizeResult = yield call(authorize.resetPassword, email, hash);
    } else {
      authorizeResult = yield call(authorize.login, email, hash);
    }

    return authorizeResult;
  } catch (err) {
    yield put(authorizingError(err));
    return false;
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `AUTHORIZE` actions and destructuring its payload
    const authorizeResult = yield take(AUTHORIZE);
    const data = authorizeResult.data;
    const email = data.get('email');
    const password = data.get('password');

    const winner = yield race({
      authorize: call(processAuthorization, { email, password }),
      // logout: take(LOGOUT),
    });

    if (winner.authorize) {
      yield put(authorizedSuccess(winner.authorize));
      browserHistory.push('/');
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
