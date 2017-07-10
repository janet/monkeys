import { selectRegister,
         selectError,
         selectSuccess } from '../selectors';
import { initialState } from '../reducer';
import { errorMessage, EMPTY_IMMUTABLE_OBJECT } from 'tests/fixtures';

import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectRegister', () => {
  const registerSelector = selectRegister();
  it('should select the register state when it exists', () => {
    const mockedState = fromJS({
      register: initialState,
    });
    expect(registerSelector(mockedState)).toEqual(initialState);
  });

  it('should return an empty immutable object when it does not exist', () => {
    const mockedState = fromJS({
      notregister: 'anything',
    });
    expect(registerSelector(mockedState)).toEqual(EMPTY_IMMUTABLE_OBJECT);
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

  it('should return an empty immutable object when it does not exist', () => {
    const mockedState = fromJS({
      noRegister: {
        noSuccess: 'notHere',
      },
    });
    expect(successSelector(mockedState)).toEqual(EMPTY_IMMUTABLE_OBJECT);
  });
});

