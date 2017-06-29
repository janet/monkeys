// based on https://github.com/sotojuan/saga-login-flow/
import { authorizingError } from './actions';

import { call,
         put } from 'redux-saga/effects';
import { hashSync } from 'bcryptjs';
import genSalt from './salt';
import request from 'utils/request';


let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage'); // eslint-disable-line global-require
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

const authorize = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} email The email of the user
  * @param  {string} password The password of the user
  */
  login(data) {
    const { email,
            password } = data;
    if (authorize.loggedIn()) {
      return Promise.resolve(true);
    }
    if (email && password) {
      return request(
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
        }
      ).then((response) => {
        if (response.error) {
          return Promise.reject(response.error);
        }
        // save token to local storage
        localStorage.token = response.success;
        return Promise.resolve(true);
      });
    }
    return Promise.reject('Missing required inputs email and/or password.');
  },
  /**
  * Logs the current user out
  */
  logout() {
    return request(
      'api/logout',
      {
        method: 'POST',
      }
    ).then((response) => {
      if (response.error) {
        return Promise.reject(response.error);
      }
      localStorage.clear();
      return Promise.resolve(true);
    });
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
  * Resets the password for a user
  * @param  {string} email The email of the user
  * @param  {string} password The password of the user
  */
  resetPassword(data) {
    const {
      email,
      password,
    } = data;

    if (email && password) {
      return request(
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
      ).then((response) => {
        if (response.error) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(true);
      });
    }
    return Promise.reject('Missing required inputs email and/or password.');
  },
  /**
  * Registers a user and then redirects them to log in
  */
  register(data) {
    const {
      email,
      password,
      nameFirst,
      nameLast,
    } = data;
    if (email && password && nameFirst && nameLast) {
      return request(
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
        }
      ).then((response) => {
        if (response.error) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(true);
      });
    }
    return Promise.reject('Missing required inputs email, password, nameFirst, and/or nameLast.');
  },
};

export function* processAuthorization({ data, isRegistering = false, isResettingPassword = false }) {
  try {
    const salt = genSalt(data.email);
    const hash = hashSync(data.password, salt);
    const hashedData = {
      ...data,
      password: hash,
    };

    let authorizeResult;
    if (isRegistering) {
      authorizeResult = yield call(authorize.register, hashedData);
    } else if (isResettingPassword) {
      authorizeResult = yield call(authorize.resetPassword, hashedData);
    } else {
      authorizeResult = yield call(authorize.login, hashedData);
    }

    return authorizeResult;
  } catch (err) {
    yield put(authorizingError(err));
    return false;
  }
}

export default authorize;
