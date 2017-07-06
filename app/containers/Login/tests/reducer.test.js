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

  it('should handle the authorizedSuccess action correctly', () => {
    const expectedSuccess = state
      .set('isAuthorized', true);

    expect(loginReducer(state, authorizedSuccess(true))).toEqual(expectedSuccess);

    const serverError = { error: errorMessage };
    const expectedError = state
      .set('error', errorMessage);
    expect(loginReducer(state, authorizedSuccess(serverError))).toEqual(expectedError);

    const expectedSuccessAfterError = state
      .set('isAuthorized', true)
      .set('error', false);
    expect(loginReducer(state, authorizedSuccess(true))).toEqual(expectedSuccessAfterError);
  });

  it('should handle the authorizingError action correctly', () => {
    const expected = state
      .set('error', errorMessage);

    expect(loginReducer(state, authorizingError(errorMessage))).toEqual(expected);
  });
});
