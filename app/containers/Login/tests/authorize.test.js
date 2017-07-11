import expect from 'expect';
import sinon from 'sinon';
import 'whatwg-fetch';
import { hashSync } from 'bcryptjs';
import genSalt from '../salt';
import { call,
         put } from 'redux-saga/effects';

import authorize, { processAuthorization } from '../authorize';
import { email, password,
         nameFirst, nameLast,
         data, dataJS,
         registerDataJS, errorMessage } from 'tests/fixtures';
import { mockApiResponse } from 'tests/helpers';
import { authorizingError } from '../actions';
import { registeringError } from 'containers/Register/actions';
import { resettingPasswordError } from 'containers/ResetPassword/actions';


describe('authorize', () => {
  let fetchStub;
  const successResponse = { success: email };
  const failResponse = { error: errorMessage };
  const logoutSuccessResponse = { success: 'logged out' };
  describe('login', () => {
    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
      localStorage.removeItem('token');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('should return true and set localStorage token when api request succeeds', () => {
      fetchStub.returns(Promise.resolve(mockApiResponse(200, successResponse)));

      return authorize.login(data.toJS()).then((isLoggedIn) => {
        expect(isLoggedIn).toEqual(true);
        expect(localStorage.token).toEqual(email);
        expect(fetchStub.calledWith(
          'api/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
            credentials: 'include',
          }
        )).toEqual(true);
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

  describe('logout', () => {
    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
      localStorage.removeItem('token');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('should clear localStorage and return true when successful', () => {
      localStorage.token = email;
      fetchStub.returns(Promise.resolve(mockApiResponse(200, logoutSuccessResponse)));

      return authorize.logout()
        .then((logoutSuccess) => {
          expect(logoutSuccess).toEqual(true);
          expect(localStorage.length).toEqual(0);
        });
    });

    it('should throw an error when server responds with error message', () => {
      fetchStub.returns(Promise.resolve(mockApiResponse(200, failResponse)));

      return authorize.logout()
        .then(() => {
          throw new Error('Expected rejection');
        }, (err) => {
          expect(err).toEqual(failResponse.error);
        });
    });
  });

  describe('loggedIn', () => {
    beforeEach(() => {
      localStorage.removeItem('token');
    });
    it('should return true when logged in', () => {
      localStorage.token = email;
      expect(authorize.loggedIn()).toEqual(true);
    });
    it('should return false when not logged in', () => {
      expect(authorize.loggedIn()).toEqual(false);
    });
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

      return authorize.resetPassword(data.toJS()).then((passwordReset) => {
        expect(passwordReset).toEqual(true);
        expect(fetchStub.calledWith(
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
            credentials: 'include',
          }
        )).toEqual(true);
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

  describe('register', () => {
    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
      localStorage.removeItem('token');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('should return true when api request succeeds', () => {
      fetchStub.returns(Promise.resolve(mockApiResponse(200, successResponse)));

      return authorize.register(registerDataJS)
        .then((registerSuccess) => {
          expect(registerSuccess).toEqual(true);
          expect(fetchStub.calledWith(
            'api/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
                nameFirst,
                nameLast,
              }),
              credentials: 'include',
            })).toEqual(true);
        });
    });

    it('should throw an error if server responds with error message', () => {
      fetchStub.returns(Promise.resolve(mockApiResponse(200, failResponse)));

      return authorize.register(registerDataJS)
        .then(() => {
          throw new Error('Expected rejection');
        }, (err) => {
          expect(err).toEqual(failResponse.error);
        });
    });
  });
});

describe('processAuthorization', () => {
  function getHashedData(dataToHash) {
    const salt = genSalt(dataToHash.email);
    const hash = hashSync(dataToHash.password, salt);
    const hashedData = {
      ...dataToHash,
      password: hash,
    };
    return hashedData;
  }
  let processAuthorizationGenerator;

  describe('authorize', () => {
    beforeEach(() => {
      processAuthorizationGenerator = processAuthorization({ data: dataJS });
    });

    it('should call login with hashed data', () => {
      const hashedData = getHashedData(dataJS);
      const callDescriptor = processAuthorizationGenerator.next().value;
      expect(callDescriptor).toEqual(call(authorize.login, hashedData));
    });

    it('should call authorizingError action if login errors', () => {
      const response = new Error(errorMessage.msg);
      // make the call
      processAuthorizationGenerator.next();
      const putDescriptor = processAuthorizationGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(authorizingError(response)));
    });
  });

  describe('isRegistering', () => {
    beforeEach(() => {
      processAuthorizationGenerator = processAuthorization({ data: registerDataJS, isRegistering: true });
    });

    it('should call register with hashed data', () => {
      const hashedData = getHashedData(registerDataJS);
      const callDescriptor = processAuthorizationGenerator.next().value;
      expect(callDescriptor).toEqual(call(authorize.register, hashedData));
    });

    it('should call registeringError action if registerring errors', () => {
      const response = new Error(errorMessage.msg);
      // make the call
      processAuthorizationGenerator.next();
      const putDescriptor = processAuthorizationGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(registeringError(response)));
    });
  });

  describe('isResettingPassword', () => {
    beforeEach(() => {
      processAuthorizationGenerator = processAuthorization({ data: dataJS, isResettingPassword: true });
    });

    it('should call reset password with hashed data', () => {
      const hashedData = getHashedData(dataJS);
      const callDescriptor = processAuthorizationGenerator.next().value;
      expect(callDescriptor).toEqual(call(authorize.resetPassword, hashedData));
    });

    it('should call resettingPasswordError action if resetting password errors', () => {
      const response = new Error(errorMessage.msg);
      // make the call
      processAuthorizationGenerator.next();
      const putDescriptor = processAuthorizationGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(resettingPasswordError(response)));
    });
  });
});
