import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { PROCESS_LOGIN } from './constants';
import { loginProcessed, processingLoginError } from './actions';
import request from 'utils/request';


export const PROCESS_LOGIN_URL = 'api/process_login';
export function* sendLoginInfo(action) {
  const inputs = action.inputs;
  const email = inputs.get('email');
  // const password = inputs.get('password');
  const requestURL = PROCESS_LOGIN_URL;

  try {
    const processLoginResult = yield call(
      request,
      requestURL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    yield put(loginProcessed(processLoginResult));
  } catch (err) {
    yield put(processingLoginError(err));
  }
}

export function* sendLoginInfoWatcher() {
  yield fork(takeLatest, PROCESS_LOGIN, sendLoginInfo);
}

export function* loginInfoData() {
  const watcher = yield fork(sendLoginInfoWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  loginInfoData,
];
