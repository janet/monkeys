import expect from 'expect';
import {
  authorize,
  authorizedSuccess,
  authorizingError,
} from '../actions';
import {
  AUTHORIZE,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_ERROR,
} from '../constants';
import {
  errorMessage,
  data,
} from 'tests/fixtures';

describe('Login actions', () => {
  describe('authorize', () => {
    it('should return the correct type', () => {
      const expected = {
        type: AUTHORIZE,
        data,
      };
      expect(authorize(data)).toEqual(expected);
    });
  });

  describe('authorizedSuccess', () => {
    it('should return the correct type and the passed email', () => {
      const expected = {
        type: AUTHORIZE_SUCCESS,
        isAuthorized: true,
      };

      expect(authorizedSuccess(true)).toEqual(expected);
    });

    it('should error when the server cannot find the email', () => {
      const expected = {
        type: AUTHORIZE_ERROR,
        error: errorMessage,
      };

      expect(authorizedSuccess({ error: errorMessage })).toEqual(expected);
    });
  });

  describe('authorizingError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: AUTHORIZE_ERROR,
        error: errorMessage,
      };

      expect(authorizingError(errorMessage)).toEqual(expected);
    });
  });
});
