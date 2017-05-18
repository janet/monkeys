import expect from 'expect';

import loginReducer, { initialState } from '../reducer';
import {
  processLogin,
  loginProcessed,
  processingLoginError,
} from '../actions';
import {
  email,
  errorMessage,
} from './fixtures';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(loginReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the processLogin action correctly', () => {
    const expected = state;

    expect(loginReducer(state, processLogin())).toEqual(expected);
  });

  it('should handle the loginProcessed action correctly when given a success email', () => {
    const expected = state
      .set('email', email);

    expect(loginReducer(state, loginProcessed({ success: email }))).toEqual(expected);
  });

  it('should handle the loginProcessed action correctly when given an expected error from the server', () => {
    const serverError = { error: errorMessage };
    const expected = state
      .set('error', errorMessage);
    expect(loginReducer(state, loginProcessed(serverError))).toEqual(expected);
  });

  it('should handle the processingLoginError action correctly', () => {
    const expected = state
      .set('error', errorMessage);

    expect(loginReducer(state, processingLoginError(errorMessage))).toEqual(expected);
  });
});
