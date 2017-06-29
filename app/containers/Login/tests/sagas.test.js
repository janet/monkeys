/**
 * Test  sagas
 */

import expect from 'expect';
import { call,
         put,
         take,
         fork,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { AUTHORIZE } from '../constants';
import { authorizedSuccess } from '../actions';
import { loginFlow,
        loginFlowWatcher, loginFlowData } from '../sagas';
import { data, dataJS } from 'tests/fixtures';
import { processAuthorization } from '../authorize';


describe('loginFlow Saga', () => {
  describe('success path', () => {
    const loginFlowGenerator = loginFlow();

    it('should watch for AUTHORIZE action', () => {
      const takeDescriptor = loginFlowGenerator.next().value;
      expect(takeDescriptor).toEqual(take(AUTHORIZE));
    });

    it('should call processAuthorization with data', () => {
      const authorizeResultMock = {
        type: AUTHORIZE,
        data,
      };
      const callDescriptor = loginFlowGenerator.next(authorizeResultMock).value;
      expect(callDescriptor).toEqual(call(processAuthorization, { data: dataJS }));
    });

    it('should dispatch the authorizedSuccess action if authorization succeeds', () => {
      const wasSuccessful = true;
      const putDescriptor = loginFlowGenerator.next(wasSuccessful).value;
      expect(putDescriptor).toEqual(put(authorizedSuccess(true)));
    });

    it('should reroute to / when authorization succeeds', () => {
      const callDescriptor = loginFlowGenerator.next().value;
      expect(callDescriptor).toEqual(call(browserHistory.push, '/'));
    });
  });
  describe('fail path', () => {
    const loginFlowGenerator = loginFlow();

    it('should watch for AUTHORIZE action', () => {
      const takeDescriptor = loginFlowGenerator.next().value;
      expect(takeDescriptor).toEqual(take(AUTHORIZE));
    });

    it('should call processAuthorization with data', () => {
      const authorizeResultMock = {
        type: AUTHORIZE,
        data,
      };
      const callDescriptor = loginFlowGenerator.next(authorizeResultMock).value;
      expect(callDescriptor).toEqual(call(processAuthorization, { data: dataJS }));
    });

    it('should do nothing if authorization fails because the failure is handled in processAuthorization', () => {
      const wasSuccessful = false;
      const takeDescriptor = loginFlowGenerator.next(wasSuccessful).value;
      expect(takeDescriptor).toEqual(take(AUTHORIZE));
    });
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
