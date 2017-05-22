import request from 'utils/request';

// based on https://github.com/sotojuan/saga-login-flow/
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
  login(email, password) {
    if (authorize.loggedIn()) {
      return Promise.resolve(true);
    }
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
  },
  /**
  * Logs the current user out
  */
  logout() {
    request('api/logout',
      {
        method: 'POST',
      }
    ).then(() => {
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
  resetPassword(email, password) {
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
  },
};

export default authorize;
