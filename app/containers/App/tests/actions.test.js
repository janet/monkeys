import expect from 'expect';

import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../constants';
import { logout, logoutSuccess, loggingOutError } from '../actions';
import { errorMessage } from 'tests/fixtures';


describe('app Actions', () => {
  describe('logout', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOGOUT,
      };
      expect(logout()).toEqual(expected);
    });
  });

  describe('logoutSuccess', () => {
    it('should return the correct type and loggedIn response', () => {
      const expected = {
        type: LOGOUT_SUCCESS,
        loggedIn: true,
      };
      expect(logoutSuccess(true)).toEqual(expected);
    });

    it('should error when the server responds in error', () => {
      const expected = {
        type: LOGOUT_ERROR,
        error: errorMessage,
      };
      expect(logoutSuccess({ error: errorMessage })).toEqual(expected);
    });
  });

  describe('loggingOutError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: LOGOUT_ERROR,
        error: errorMessage.msg,
      };
      expect(loggingOutError(errorMessage.msg)).toEqual(expected);
    });
  });
});
