import { selectRegister,
         selectError,
         selectSuccess } from '../selectors';
import { initialState } from '../reducer';
import { errorMessage } from 'tests/fixtures';

import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectRegister', () => {
  const registerSelector = selectRegister();
  it('should select the register state', () => {
    const mockedState = fromJS({
      register: initialState,
    });
    expect(registerSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectError in Register', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const mockedState = fromJS({
      register: {
        error: errorMessage.msg,
      },
    });
    expect(errorSelector(mockedState)).toEqual(errorMessage.msg);
  });
});

describe('selectSuccess in Register', () => {
  const successSelector = selectSuccess();
  it('should select success', () => {
    const mockedState = fromJS({
      register: {
        error: errorMessage.msg,
        success: true,
      },
    });
    expect(successSelector(mockedState)).toEqual(true);
  });
});

