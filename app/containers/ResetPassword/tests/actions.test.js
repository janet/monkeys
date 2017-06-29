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
  dataUpperCaseEmail,
} from 'tests/fixtures';


describe('ResetPassword actions', () => {
  describe('resetPassword', () => {
    const expected = {
      type: RESET_PASSWORD,
      data,
    };
    it('should return the correct type', () => {
      expect(resetPassword(data)).toEqual(expected);
    });

    it('should lowercase the email if necessary', () => {
      expect(resetPassword(dataUpperCaseEmail)).toEqual(expected);
    });
  });

  describe('resetPasswordSuccess', () => {
    it('should return the correct type and isAuthorized true', () => {
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
