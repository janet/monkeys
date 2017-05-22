import expect from 'expect';

import loginReducer, { initialState } from '../reducer';
import {
  authorize,
  authorizedSuccess,
  authorizingError,
} from '../actions';
import {
  errorMessage,
} from 'tests/fixtures';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(loginReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the authorize action correctly', () => {
    const expected = state;

    expect(loginReducer(state, authorize())).toEqual(expected);
  });

  it('should handle the authorizedSuccess action correctly when authorization succeeds', () => {
    const expected = state
      .set('isAuthorized', true);

    expect(loginReducer(state, authorizedSuccess(true))).toEqual(expected);
  });

  it('should handle the authorizedSuccess action correctly when given an expected error from the server', () => {
    const serverError = { error: errorMessage };
    const expected = state
      .set('error', errorMessage);
    expect(loginReducer(state, authorizedSuccess(serverError))).toEqual(expected);
  });

  it('should handle the authorizingError action correctly', () => {
    const expected = state
      .set('error', errorMessage);

    expect(loginReducer(state, authorizingError(errorMessage))).toEqual(expected);
  });
});
