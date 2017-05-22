/**
 * Test  sagas
 */

import expect from 'expect';
import { call,
         put,
         take,
         fork,
         cancel,
         race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import genSalt from '../salt';
import { hashSync } from 'bcryptjs';

import { AUTHORIZE } from '../constants';
import { authorizedSuccess, authorizingError } from '../actions';
import { processAuthorization, loginFlow,
        loginFlowWatcher, loginFlowData } from '../sagas';
import { email, password, data } from 'tests/fixtures';
import authorize from '../authorize';


describe('loginFlow Saga', () => {
  const loginFlowGenerator = loginFlow();

  it('should watch for AUTHORIZE action', () => {
    const takeDescriptor = loginFlowGenerator.next().value;
    expect(takeDescriptor).toEqual(take(AUTHORIZE));
  });

  it('should start a race condition with authorize and logout', () => {
    const authorizeResultMock = {
      type: AUTHORIZE,
      data,
    };
    const raceDescriptor = loginFlowGenerator.next(authorizeResultMock).value;
    expect(raceDescriptor).toEqual(race(
      {
        authorize: call(processAuthorization, { email, password }),
        // logout: take(LOGOUT),
      })
    );
  });

  it('should dispatch the authorizedSuccess action if authorization succeeds', () => {
    const authorizeWinner = { authorize: true };
    const putDescriptor = loginFlowGenerator.next(authorizeWinner).value;
    expect(putDescriptor).toEqual(put(authorizedSuccess(true)));
  });
});

describe('processAuthorization Saga', () => {
  let processAuthorizationGenerator;

  beforeEach(() => {
    processAuthorizationGenerator = processAuthorization({ email, password });
    const salt = genSalt(email);
    const hash = hashSync(password, salt);
    const callDescriptor = processAuthorizationGenerator.next().value;
    expect(callDescriptor).toEqual(call(authorize.login, email, hash));
  });

  it('should call the authorizingError action if the authorization response errors', () => {
    const response = new Error('i am error');
    const putDescriptor = processAuthorizationGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(authorizingError(response)));
  });
});

describe('loginFlowWatcher Saga', () => {
  const loginFlowWatcherGenerator = loginFlowWatcher();

  it('should asynchronously fork loginFlow Saga', () => {
    const forkDescriptor = loginFlowWatcherGenerator.next().value;
    expect(forkDescriptor).toEqual(fork(loginFlow));
  });
});

describe('loginFlowData Saga', () => {
  const loginFlowDataSaga = loginFlowData();

  let forkDescriptor;

  it('should asynchronously fork loginFlowWatcher saga', () => {
    forkDescriptor = loginFlowDataSaga.next().value;
    expect(forkDescriptor).toEqual(fork(loginFlowWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = loginFlowDataSaga.next().value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel the forked loginFlowWatcher saga',
    function* loginFlowDataSagaCancellable() {
      forkDescriptor = loginFlowDataSaga.next(put(LOCATION_CHANGE)).value;
      expect(forkDescriptor).toEqual(cancel(forkDescriptor));
    }
  );
});
