/**
 * Test  sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         select,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { tryConfirmingEmail,
         tryConfirmingEmailWatcher,
         tryConfirmingEmailData } from '../sagas';
import { emailConfirmed,
         confirmingEmailError } from '../actions';
import { CONFIRM_EMAIL } from '../constants';
import { token, email } from 'tests/fixtures';
import { selectToken } from '../selectors';
import request from 'utils/request';


describe('tryConfirmingEmail Saga', () => {
  let tryConfirmingEmailGenerator;

  beforeEach(() => {
    tryConfirmingEmailGenerator = tryConfirmingEmail();

    const selectDescriptor = tryConfirmingEmailGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectToken()));

    const requestURL = `/api/confirm/${token}`;
    const callDescriptor = tryConfirmingEmailGenerator.next(token).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });
  it('should dispatch the emailConfirmed action if it requests successfully', () => {
    const response = email;
    const putDescriptor = tryConfirmingEmailGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(emailConfirmed(response)));
  });

  it('should call the confirmingEmailError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = tryConfirmingEmailGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(confirmingEmailError(response)));
  });
});

describe('tryConfirmingEmailWatcher Saga', () => {
  const tryConfirmingEmailWatcherGenerator = tryConfirmingEmailWatcher();

  it('should watch for CONFIRM_EMAIL action', () => {
    const takeDescriptor = tryConfirmingEmailWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, CONFIRM_EMAIL, tryConfirmingEmail));
  });
});

describe('tryConfirmingEmailData Saga', () => {
  const tryConfirmingEmailDataGenerator = tryConfirmingEmailData();

  let forkDescriptor;

  it('should asynchronously fork tryConfirmingEmailWatcher saga', () => {
    forkDescriptor = tryConfirmingEmailDataGenerator.next().value;
    expect(forkDescriptor).toEqual(fork(tryConfirmingEmailWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = tryConfirmingEmailDataGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked tryConfirmingEmailWatcher saga',
    function* tryConfirmingEmailDataGeneratorCancellable() {
      forkDescriptor = tryConfirmingEmailDataGenerator.next(put(LOCATION_CHANGE)).value;
      expect(forkDescriptor).toEqual(cancel(forkDescriptor));
    }
  );
});

