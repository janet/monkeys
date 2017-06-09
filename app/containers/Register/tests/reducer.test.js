import expect from 'expect';

import registerReducer, { initialState } from '../reducer';
import {
  register,
  registerSuccess,
  registeringError,
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

  it('should handle the registerSuccess action correctly when registering succeeds', () => {
    const expected = state;
    expect(registerReducer(state, registerSuccess(true))).toEqual(expected);
  });

  it('should handle the registerSuccess action correctly when registering fails', () => {
    const serverError = { error: errorMessage };
    const expected = state
      .set('error', errorMessage);
    expect(registerReducer(state, registerSuccess(serverError))).toEqual(expected);
  });

  it('should handle the registeringError action correctly', () => {
    const expected = state
      .set('error', errorMessage);
    expect(registerReducer(state, registeringError(errorMessage))).toEqual(expected);
  });
});
