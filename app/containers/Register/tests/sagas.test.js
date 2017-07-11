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

import { REGISTER } from '../constants';
import { registerSuccess,
         resetRegister } from '../actions';
import { processAuthorization } from 'containers/Login/authorize';
import { registerFlow,
         registerFlowWatcher,
         registerFlowData } from '../sagas';
import { registerData } from 'tests/fixtures';


describe('registerFlow Saga', () => {
  describe('success path', () => {
    const registerFlowGenerator = registerFlow();

    it('should watch for REGISTER action', () => {
      const takeDescriptor = registerFlowGenerator.next().value;
      expect(takeDescriptor).toEqual((take(REGISTER)));
    });

    it('should call the processAuthorization saga with data', () => {
      const registerRequestMock = {
        type: REGISTER,
        data: registerData,
      };
      const callDescriptor = registerFlowGenerator.next(registerRequestMock).value;
      expect(callDescriptor).toEqual(call(
        processAuthorization,
        { data: registerData.toJS(), isRegistering: true }
      ));
    });

    it('should dispatch the registerSuccess action if register succeeds', () => {
      const wasSuccessful = true;
      const putDescriptor = registerFlowGenerator.next(wasSuccessful).value;
      expect(putDescriptor).toEqual(put(registerSuccess(wasSuccessful)));
    });

    it('should reroute to /login when registration succeeds', () => {
      const callDescriptor = registerFlowGenerator.next().value;
      expect(callDescriptor).toEqual(call(browserHistory.push, '/login'));
    });
  });

  describe('fail path', () => {
    const registerFlowGenerator = registerFlow();

    it('should watch for REGISTER action', () => {
      const takeDescriptor = registerFlowGenerator.next().value;
      expect(takeDescriptor).toEqual((take(REGISTER)));
    });

    it('should call the processAuthorization saga with data', () => {
      const registerRequestMock = {
        type: REGISTER,
        data: registerData,
      };
      const callDescriptor = registerFlowGenerator.next(registerRequestMock).value;
      expect(callDescriptor).toEqual(call(
        processAuthorization,
        { data: registerData.toJS(), isRegistering: true }
      ));
    });

    it('should do nothing if registration fails because the failure is handled in processAuthorization', () => {
      const wasSuccessful = false;
      const takeDescriptor = registerFlowGenerator.next(wasSuccessful).value;
      expect(takeDescriptor).toEqual(take(REGISTER));
    });
  });
});

describe('registerFlowWatcher Saga', () => {
  const registerFlowWatcherGenerator = registerFlowWatcher();

  it('should asynchronously fork registerFlow saga', () => {
    const forkDescriptor = registerFlowWatcherGenerator.next().value;
    expect(forkDescriptor).toEqual(fork(registerFlow));
  });
});

describe('registerFlowData Saga', () => {
  const registerFlowDataSaga = registerFlowData();

  let forkDescriptor;

  it('should asynchronously fork registerFlowWatcher saga', () => {
    forkDescriptor = registerFlowDataSaga.next().value;
    expect(forkDescriptor).toEqual(fork(registerFlowWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = registerFlowDataSaga.next().value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should call the resetRegister action', () => {
    const putDescriptor = registerFlowDataSaga.next().value;
    expect(putDescriptor).toEqual(put(resetRegister()));
  });

  it('should finally cancel the forked registerFlowWatcher saga',
    function* registerFlowDataSagaCancellable() {
      forkDescriptor = registerFlowDataSaga.next(put(LOCATION_CHANGE)).value;
      expect(forkDescriptor).toEqual(cancel(forkDescriptor));
    }
  );
});
