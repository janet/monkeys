import expect from 'expect';

import authorizeReducer, { initialState } from '../reducer';
import { logout,
         logoutSuccess,
         loggingOutError } from '../actions';
import {
  errorMessage,
} from 'tests/fixtures';

describe('authorizeReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(authorizeReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the logout action correctly', () => {
    const expected = state;
    expect(authorizeReducer(state, logout())).toEqual(expected);
  });

  it('should handle the logoutSuccess action correctly when authorization succeeds', () => {
    const expected = state
      .set('loggedIn', true);
    expect(authorizeReducer(state, logoutSuccess(true))).toEqual(expected);
  });

  it('should handle the logoutSuccess action correctly when authorization fails', () => {
    const expected = state
      .set('loggedIn', false);
    expect(authorizeReducer(state, logoutSuccess(false))).toEqual(expected);
  });

  it('should handle the loggingOutError action correctly', () => {
    const expected = state
      .set('error', errorMessage);
    expect(authorizeReducer(state, loggingOutError(errorMessage))).toEqual(expected);
  });
});
