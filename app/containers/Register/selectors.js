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

export {
  selectRegister,
  selectError,
};
