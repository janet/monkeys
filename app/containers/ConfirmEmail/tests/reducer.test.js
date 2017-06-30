import expect from 'expect';

import confirmEmailReducer, { initialState } from '../reducer';
import {
  processConfirm,
  emailConfirmed,
  confirmingEmailError,
} from '../actions';
import {
  errorMessage,
  email,
  token,
} from 'tests/fixtures';

describe('confirmEmailReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initialState', () => {
    const expected = state;
    expect(confirmEmailReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the processConfirm action correctly', () => {
    const expected = state
      .set('loading', true)
      .set('loaded', false)
      .set('error', false)
      .setIn(['data', 'token'], token);
    expect(confirmEmailReducer(state, processConfirm(token))).toEqual(expected);
  });

  it('should handle the emailConfirmed action correctly when email confirmation succeeds', () => {
    const expected = state
      .set('loading', false)
      .set('loaded', true)
      .setIn(['data', 'emailConfirmed'], !!email);
    expect(confirmEmailReducer(state, emailConfirmed({ success: email }))).toEqual(expected);
  });

  it('should handle the emailConfirmed action correctly when given an error from the server', () => {
    const serverError = { error: errorMessage };
    const expected = state
      .set('loading', false)
      .set('loaded', false)
      .set('error', errorMessage);
    expect(confirmEmailReducer(state, emailConfirmed(serverError))).toEqual(expected);
  });

  it('should handle the confirmingEmailError action correctly', () => {
    const expected = state
      .set('loading', false)
      .set('loaded', false)
      .set('error', errorMessage);
    expect(confirmEmailReducer(state, confirmingEmailError(errorMessage))).toEqual(expected);
  });
});
