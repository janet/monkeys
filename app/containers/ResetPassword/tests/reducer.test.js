import expect from 'expect';

import resetPasswordReducer, { initialState } from '../reducer';
import {
  resetPassword,
  resetPasswordSuccess,
  resettingPasswordError,
} from '../actions';
import {
  errorMessage,
} from 'tests/fixtures';


describe('resetPasswordReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(resetPasswordReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the authorize action correctly', () => {
    const expected = state;
    expect(resetPasswordReducer(state, resetPassword())).toEqual(expected);
  });

  it('should handle the resetPasswordSuccess action correctly when resetting password succeeds', () => {
    const expected = state;

    expect(resetPasswordReducer(state, resetPasswordSuccess(true))).toEqual(expected);
  });

  it('should handle the resetPasswordSuccess action correctly when resetting password fails on the server', () => {
    const serverError = { error: errorMessage };
    const expected = state
     .set('error', errorMessage);
    expect(resetPasswordReducer(state, resetPasswordSuccess(serverError))).toEqual(expected);
  });

  it('should handle the resettingPasswordError action correctly', () => {
    const expected = state
      .set('error', errorMessage);

    expect(resetPasswordReducer(state, resettingPasswordError(errorMessage))).toEqual(expected);
  });
});
