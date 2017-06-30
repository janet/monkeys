import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         select,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { CONFIRM_EMAIL } from './constants';
import { emailConfirmed,
         confirmingEmailError } from './actions';
import { selectToken } from './selectors';
import request from 'utils/request';


export function* tryConfirmingEmail() {
  const token = yield select(selectToken());
  const requestURL = `/api/confirm/${token}`;

  try {
    const confirmEmailResult = yield call(request, requestURL);
    yield put(emailConfirmed(confirmEmailResult));
  } catch (err) {
    yield put(confirmingEmailError(err));
  }
}

export function* tryConfirmingEmailWatcher() {
  yield fork(takeLatest, CONFIRM_EMAIL, tryConfirmingEmail);
}

export function* tryConfirmingEmailData() {
  const watcher = yield fork(tryConfirmingEmailWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  tryConfirmingEmailData,
];
