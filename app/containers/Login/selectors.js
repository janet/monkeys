import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLogin = () => (state) => state.get('login');

/**
 * Other specific selectors
 */

const selectEmail = () => createSelector(
  selectLogin(),
  (loginState) => loginState.get('email')
);

export {
  selectLogin,
  selectEmail,
};
