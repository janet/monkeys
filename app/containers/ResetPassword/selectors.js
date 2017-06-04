import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPassword state domain
 */
const selectResetPassword = () => (state) => state.get('resetPassword');

/**
 * Other specific selectors
 */

const selectIsAuthorized = () => createSelector(
  selectResetPassword(),
  (resetPasswordState) => resetPasswordState.get('isAuthorized')
);

const selectError = () => createSelector(
  selectResetPassword(),
  (resetPasswordState) => resetPasswordState.get('error')
);

export {
  selectResetPassword,
  selectIsAuthorized,
  selectError,
};
