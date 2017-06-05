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

import { RESET_PASSWORD } from '../constants';
import { resetPasswordSuccess } from '../actions';
import { processAuthorization } from 'containers/Login/sagas';
import { resetPasswordFlow, resetPasswordFlowWatcher,
         resetPasswordData } from '../sagas';
import { email, password, data } from 'tests/fixtures';

describe('resetPasswordFlow Saga', () => {
  const resetPasswordFlowGenerator = resetPasswordFlow();

  it('should watch for RESET_PASSWORD action', () => {
    const takeDescriptor = resetPasswordFlowGenerator.next().value;
    expect(takeDescriptor).toEqual(take(RESET_PASSWORD));
  });

  it('should call the processAuthorization saga with email and password', () => {
    const resetPasswordRequestMock = {
      type: RESET_PASSWORD,
      data,
    };
    const callDescriptor = resetPasswordFlowGenerator.next(resetPasswordRequestMock).value;
    expect(callDescriptor).toEqual(call(
      processAuthorization,
      { email, password, isResettingPassword: true }
    ));
  });

  it('should dispatch the resetPasswordSuccess action if authorization succeeds', () => {
    const wasSuccessful = true;
    const putDescriptor = resetPasswordFlowGenerator.next(wasSuccessful).value;
    expect(putDescriptor).toEqual(put(resetPasswordSuccess(wasSuccessful)));
  });

  it('should reroute to /login when authorization succeeds', () => {
    const callDescriptor = resetPasswordFlowGenerator.next().value;
    expect(callDescriptor).toEqual(call(browserHistory.push, '/login'));
  });
});

describe('resetPasswordFlowWatcher Saga', () => {
  const resetPasswordFlowWatcherGenerator = resetPasswordFlowWatcher();

  let forkDescriptor;

  it('should asynchronously fork resetPasswordFlow saga', () => {
    forkDescriptor = resetPasswordFlowWatcherGenerator.next().value;
    expect(forkDescriptor).toEqual(fork(resetPasswordFlow));
  });
});

describe('resetPasswordData Saga', () => {
  const resetPasswordDataSaga = resetPasswordData();

  let forkDescriptor;

  it('should asynchronously fork resetPasswordFlowWatcher saga', () => {
    forkDescriptor = resetPasswordDataSaga.next().value;
    expect(forkDescriptor).toEqual(fork(resetPasswordFlowWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = resetPasswordDataSaga.next().value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel the forked resetPasswordFlowWatcher saga',
    function* resetPasswordDataSagaCancellable() {
      forkDescriptor = resetPasswordDataSaga.next(put(LOCATION_CHANGE)).value;
      expect(forkDescriptor).toEqual(cancel(forkDescriptor));
    }
  );
});
