import { createSelector } from 'reselect';

/**
 * Direct selector to the register state domain
 */
const selectRegister = () => (state) => state.get('register');

/**
 * Other specific selectors
 */

const selectError = () => createSelector(
  selectRegister(),
  (registerState) => registerState.get('error')
);

const selectSuccess = () => createSelector(
  selectRegister(),
  (registerState) => registerState.get('success')
);

export {
  selectRegister,
  selectError,
  selectSuccess,
};
