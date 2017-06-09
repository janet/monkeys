import expect from 'expect';
import {
  register,
  registerSuccess,
  registeringError,
} from '../actions';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../constants';
import {
  errorMessage,
  registerData,
  registerDataUpperCaseEmail,
} from 'tests/fixtures';

describe('Register actions', () => {
  describe('register', () => {
    const expected = {
      type: REGISTER,
      data: registerData,
    };
    it('should return the correct type', () => {
      expect(register(registerData)).toEqual(expected);
    });

    it('should lowercase the email if not already', () => {
      expect(register(registerDataUpperCaseEmail)).toEqual(expected);
    });
  });

  describe('registerSuccess', () => {
    it('should return the correct type', () => {
      const expected = {
        type: REGISTER_SUCCESS,
      };

      expect(registerSuccess(true)).toEqual(expected);
    });

    it('should error when the server cannot register', () => {
      const expected = {
        type: REGISTER_ERROR,
        error: errorMessage,
      };

      expect(registerSuccess({ error: errorMessage })).toEqual(expected);
    });
  });

  describe('registeringError', () => {
    it('should return the correct type and the error', () => {
      const expected = {
        type: REGISTER_ERROR,
        error: errorMessage,
      };

      expect(registeringError(errorMessage)).toEqual(expected);
    });
  });
});
