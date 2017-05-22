import expect from 'expect';
import {
  resetPassword,
  resetPasswordSuccess,
  resettingPasswordError,
} from '../actions';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../constants';
import {
  errorMessage,
  data,
} from 'tests/fixtures';


describe('ResetPassword actions', () => {
  describe('resetPassword', () => {
    it('should return the correct type', () => {
      const expected = {
        type: RESET_PASSWORD,
        data,
      };
      expect(resetPassword(data)).toEqual(expected);
    });
  });

  describe('resetPasswordSuccess', () => {
    it('should return the correct type and the passed email', () => {
      const expected = {
        type: RESET_PASSWORD_SUCCESS,
        isAuthorized: true,
      };

      expect(resetPasswordSuccess(true)).toEqual(expected);
    });

    it('should error when the server cannot reset the password', () => {
      const expected = {
        type: RESET_PASSWORD_ERROR,
        error: errorMessage,
      };

      expect(resetPasswordSuccess({ error: errorMessage })).toEqual(expected);
    });
  });

  describe('resettingPasswordError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: RESET_PASSWORD_ERROR,
        error: errorMessage,
      };

      expect(resettingPasswordError(errorMessage)).toEqual(expected);
    });
  });
});
