import expect from 'expect';
import {
  processLogin,
  loginProcessed,
  processingLoginError,
} from '../actions';
import {
  PROCESS_LOGIN,
  PROCESS_LOGIN_SUCCESS,
  PROCESS_LOGIN_ERROR,
} from '../constants';
import {
  email,
  errorMessage,
  inputs,
} from './fixtures';

describe('Login actions', () => {
  describe('processLogin', () => {
    it('should return the correct type', () => {
      const expected = {
        type: PROCESS_LOGIN,
        inputs,
      };
      expect(processLogin(inputs)).toEqual(expected);
    });
  });

  describe('loginProcessed', () => {
    it('should return the correct type and the passed email', () => {
      const expected = {
        type: PROCESS_LOGIN_SUCCESS,
        email,
      };

      expect(loginProcessed({ success: email })).toEqual(expected);
    });
  });

  describe('processingLoginError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: PROCESS_LOGIN_ERROR,
        error: errorMessage,
      };

      expect(processingLoginError(errorMessage)).toEqual(expected);
    });
  });
});
