import expect from 'expect';
import sinon from 'sinon';
import 'whatwg-fetch';

import authorize from '../authorize';
import { email, password, errorMessage } from 'tests/fixtures';
import { mockApiResponse } from 'tests/helpers';
import request from 'utils/request';

describe('authorize', () => {
  let fetchStub;
  const successResponse = { success: email };
  const failResponse = { error: errorMessage };
  describe('login', () => {
    it('should should request to process login from the server', () => {
      const loginRequest = authorize.login(email, password);
      expect(loginRequest).toEqual(
        request(
          'api/process_login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        )
      );
    });

    describe('login with stub request', () => {
      beforeEach(() => {
        fetchStub = sinon.stub(window, 'fetch');
        localStorage.removeItem('token');
      });

      afterEach(() => {
        fetchStub.restore();
      });

      it('should return true and set localStorage token when api request succeeds', () => {
        fetchStub.returns(Promise.resolve(mockApiResponse(200, successResponse)));

        return authorize.login({ email, password }).then((isLoggedIn) => {
          expect(isLoggedIn).toEqual(true);
          expect(localStorage.token).toEqual(email);
        });
      });

      it('should throw an error when authentication fails', () => {
        fetchStub.returns(Promise.resolve(mockApiResponse(200, failResponse)));

        return authorize.login({ email, password })
        .then(() => {
          throw new Error('Expected rejection');
        }, (err) => {
          expect(err).toEqual(failResponse.error);
        });
      });
    });
  });

  describe('resetPassword', () => {
    it('should request to reset password from the server', () => {
      const resetPasswordRequest = authorize.resetPassword(email, password);
      expect(resetPasswordRequest).toEqual(
        request(
          'api/reset_password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        )
      );
    });

    describe('resetPassword with stub request', () => {
      beforeEach(() => {
        fetchStub = sinon.stub(window, 'fetch');
        localStorage.removeItem('token');
      });

      afterEach(() => {
        fetchStub.restore();
      });

      it('should return true when api request succeeds', () => {
        fetchStub.returns(Promise.resolve(mockApiResponse(200, successResponse)));

        return authorize.resetPassword({ email, password }).then((passwordReset) => {
          expect(passwordReset).toEqual(true);
        });
      });

      it('should throw an error when server responds with error message', () => {
        fetchStub.returns(Promise.resolve(mockApiResponse(200, failResponse)));

        return authorize.resetPassword({ email, password })
          .then(() => {
            throw new Error('Expected rejection');
          }, (err) => {
            expect(err).toEqual(failResponse.error);
          });
      });
    });
  });
});
