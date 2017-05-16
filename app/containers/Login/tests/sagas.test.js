/**
 * Test  sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { PROCESS_LOGIN } from '../constants';
import { loginProcessed, processingLoginError } from '../actions';
import { sendLoginInfo, sendLoginInfoWatcher, loginInfoData, PROCESS_LOGIN_URL } from '../sagas';
import request from 'utils/request';
import { email, inputs } from './fixtures';

describe('sendLoginInfo Saga', () => {
  let sendLoginInfoGenerator;

  beforeEach(() => {
    const action = {
      type: PROCESS_LOGIN,
      inputs,
    };
    sendLoginInfoGenerator = sendLoginInfo(action);

    const requestURL = PROCESS_LOGIN_URL;
    const callDescriptor = sendLoginInfoGenerator.next().value;
    expect(callDescriptor).toEqual(call(
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
    ));
  });
  it('should dispatch the loginProcessed action when login succeeds', () => {
    const response = email;
    const putDescriptor = sendLoginInfoGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loginProcessed(response)));
  });
  it('should call the processingLoginError action if the response errors', () => {
    const response = new Error('Some Error');
    const putDescriptor = sendLoginInfoGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(processingLoginError(response)));
  });
});

describe('sendLoginInfoWatcher Saga', () => {
  const sendLoginInfoWatcherGenerator = sendLoginInfoWatcher();

  it('should watch for the PROCESS_LOGIN action', () => {
    const takeDescriptor = sendLoginInfoWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, PROCESS_LOGIN, sendLoginInfo));
  });
});

describe('loginInfoData Saga', () => {
  const loginInfoDataSaga = loginInfoData();

  let forkDescriptor;

  it('should asynchronously fork the sendLoginInfoWatcher saga', () => {
    forkDescriptor = loginInfoDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(sendLoginInfoWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = loginInfoDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel the forked sendLoginInfoWatcher saga',
    function* loginInfoDataSagaCancellable() {
      forkDescriptor = loginInfoDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
