import expect from 'expect';
import {
  processConfirm,
  emailConfirmed,
  confirmingEmailError,
} from '../actions';
import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
} from '../constants';
import { token, email, errorMessage } from 'tests/fixtures';

describe('ConfirmEmail actions', () => {
  describe('processConfirm', () => {
    const expected = {
      type: CONFIRM_EMAIL,
      token,
    };
    it('should return the correct type', () => {
      expect(processConfirm(token)).toEqual(expected);
    });
  });

  describe('emailConfirmed', () => {
    it('should return the correct type', () => {
      const expected = {
        type: CONFIRM_EMAIL_SUCCESS,
        emailConfirmed: true,
      };
      expect(emailConfirmed({ success: email })).toEqual(expected);
    });
    it('should error when the server returns an error', () => {
      const expected = {
        type: CONFIRM_EMAIL_ERROR,
        error: errorMessage,
      };
      expect(emailConfirmed({ error: errorMessage })).toEqual(expected);
    });
  });

  describe('confirmingEmailError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: CONFIRM_EMAIL_ERROR,
        error: errorMessage,
      };

      expect(confirmingEmailError(errorMessage)).toEqual(expected);
    });
  });
});
