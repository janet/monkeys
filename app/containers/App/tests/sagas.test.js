import expect from 'expect';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { LOGOUT } from '../constants';
import { logoutSuccess } from '../actions';
import authorize from 'containers/Login/authorize';
import { logoutFlow, logoutFlowWatcher } from '../sagas';


describe('logoutFlow Saga', () => {
  const logoutFlowGenerator = logoutFlow();

  it('should watch for LOGOUT action', () => {
    const takeDescriptor = logoutFlowGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOGOUT));
  });

  it('should call to authorize logout from the server', () => {
    const logoutRequestMock = {
      type: LOGOUT,
    };
    const callDescriptor = logoutFlowGenerator.next(logoutRequestMock).value;
    expect(callDescriptor).toEqual(call(authorize.logout));
  });

  it('should dispatch the logoutSuccess action if logout succeeds', () => {
    const wasSuccessful = true;
    const putDescriptor = logoutFlowGenerator.next(wasSuccessful).value;
    expect(putDescriptor).toEqual(put(logoutSuccess(wasSuccessful)));
  });

  it('should reroute to /logout', () => {
    const callDescriptor = logoutFlowGenerator.next().value;
    expect(callDescriptor).toEqual(call(browserHistory.push, '/logout'));
  });
});

describe('logoutFlowWatcher Saga', () => {
  const logoutFlowWatcherGenerator = logoutFlowWatcher();
  let forkDescriptor;

  it('should asynchronously fork logoutFlow saga', () => {
    forkDescriptor = logoutFlowWatcherGenerator.next().value;
    expect(forkDescriptor).toEqual(fork(logoutFlow));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = logoutFlowWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel the forked logoutFlow saga',
    function* logoutFlowWatcherSagaCancellable() {
      forkDescriptor = logoutFlowWatcherGenerator.next(put(LOCATION_CHANGE)).value;
      expect(forkDescriptor).toEqual(cancel(forkDescriptor));
    }
  );
});

