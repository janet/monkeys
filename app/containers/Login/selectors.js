import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLogin = () => (state) => state.get('login');

/**
 * Other specific selectors
 */

const selectIsAuthorized = () => createSelector(
  selectLogin(),
  (loginState) => loginState.get('isAuthorized')
);

const selectError = () => createSelector(
  selectLogin(),
  (loginState) => loginState.get('error')
);

export {
  selectLogin,
  selectIsAuthorized,
  selectError,
};
