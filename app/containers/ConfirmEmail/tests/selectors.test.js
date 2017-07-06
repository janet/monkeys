import { fromJS } from 'immutable';
import expect from 'expect';

import { selectConfirmEmail,
         selectData,
         selectLoading,
         selectLoaded } from '../selectors';
import { initialState } from '../reducer';
import { emailNotConfirmedData } from 'tests/fixtures';


describe('selectConfirmEmail', () => {
  const confirmEmailSelector = selectConfirmEmail();
  it('should select the confirmEmail state', () => {
    const mockedState = fromJS({
      confirmEmail: initialState,
    });
    expect(confirmEmailSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectData', () => {
  const dataSelector = selectData();
  it('should select data', () => {
    const mockedState = fromJS({
      confirmEmail: {
        data: emailNotConfirmedData,
      },
    });
    expect(dataSelector(mockedState)).toEqual(emailNotConfirmedData);
  });
});

describe('selectLoading', () => {
  const loadingSelector = selectLoading();
  it('should select loading', () => {
    const mockedState = fromJS({
      confirmEmail: {
        loading: true,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(true);
  });
});

describe('selectLoaded', () => {
  const loadedSelector = selectLoaded();
  it('should select loaded', () => {
    const mockedState = fromJS({
      confirmEmail: {
        loaded: false,
      },
    });
    expect(loadedSelector(mockedState)).toEqual(false);
  });
});
