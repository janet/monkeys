import expect from 'expect';

import registerReducer, { initialState } from '../reducer';
import {
  register,
  registerSuccess,
  registeringError,
  resetRegister,
} from '../actions';
import {
  errorMessage,
} from 'tests/fixtures';

describe('registerReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(registerReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the register action correctly', () => {
    const expected = state;
    expect(registerReducer(state, register())).toEqual(expected);
  });

  it('should handle the registerSuccess action correctly', () => {
    const expected = state
      .set('success', true);
    expect(registerReducer(state, registerSuccess(true))).toEqual(expected);

    const serverError = { error: errorMessage };
    const expectedError = state
      .set('error', errorMessage)
      .set('success', false);
    expect(registerReducer(state, registerSuccess(serverError))).toEqual(expectedError);

    const expectedSuccessAfterFail = state
      .set('success', true)
      .set('error', false);
    expect(registerReducer(state, registerSuccess(true))).toEqual(expectedSuccessAfterFail);
  });

  it('should handle the registeringError action correctly', () => {
    const expected = state
      .set('error', errorMessage);
    expect(registerReducer(state, registeringError(errorMessage))).toEqual(expected);
  });

  it('should handle the resetRegister action correctly', () => {
    state
      .set('error', 'hi i am an error message')
      .set('success', 'i am here too');
    const expected = state
      .set('error', false)
      .set('success', false);
    expect(registerReducer(state, resetRegister())).toEqual(expected);
  });
});
