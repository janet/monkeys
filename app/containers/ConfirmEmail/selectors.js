import { createSelector } from 'reselect';

const selectConfirmEmail = () => (state) => state.get('confirmEmail');

const selectData = () => createSelector(
  selectConfirmEmail(),
  (confirmEmailState) => confirmEmailState.get('data')
);

const selectToken = () => createSelector(
  selectData(),
  (dataState) => dataState.get('token')
);

const selectError = () => createSelector(
  selectConfirmEmail(),
  (confirmEmailState) => confirmEmailState.get('error')
);

const selectLoading = () => createSelector(
  selectConfirmEmail(),
  (confirmEmailState) => confirmEmailState.get('loading')
);

const selectLoaded = () => createSelector(
  selectConfirmEmail(),
  (confirmEmailState) => confirmEmailState.get('loaded')
);

export {
  selectConfirmEmail,
  selectData,
  selectToken,
  selectLoading,
  selectLoaded,
  selectError,
};
