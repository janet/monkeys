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
  dataUpperCaseEmail,
} from 'tests/fixtures';

describe('Login actions', () => {
  describe('authorize', () => {
    const expected = {
      type: AUTHORIZE,
      data,
    };
    it('should return the correct type', () => {
      expect(authorize(data)).toEqual(expected);
    });

    it('should lowercase the email if not already', () => {
      expect(authorize(dataUpperCaseEmail)).toEqual(expected);
    });
  });

  describe('authorizedSuccess', () => {
    it('should return the correct type and isAuthorized true', () => {
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
