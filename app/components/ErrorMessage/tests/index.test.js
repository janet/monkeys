import ErrorMessage,
     { ErrorWrapper,
       ErrorStyled,
       ErrorMessageText,
       ResetPasswordButton } from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { errorMessage } from 'tests/fixtures';

describe('<ErrorMessage />', () => {
  let renderedComponent;
  const resetPasswordRedirectSpy = expect.createSpy();
  beforeEach(() => {
    renderedComponent = mount(
      <ErrorMessage
        error={errorMessage.msg}
        resetPasswordRedirect={resetPasswordRedirectSpy}
      />
    );
  });
  it('should render', () => {
    expect(renderedComponent.find('div').length).toEqual(2);
    expect(renderedComponent.find(ErrorWrapper).length).toEqual(1);
    expect(renderedComponent.find(ErrorStyled).length).toEqual(1);
    expect(renderedComponent.find(ErrorMessageText).length).toEqual(1);
    expect(renderedComponent.find(ResetPasswordButton).length).toEqual(1);
  });
  it('should render the error message', () => {
    expect(renderedComponent.find(ErrorMessageText).text()).toEqual(errorMessage.msg);
  });
  it('should render the reset password button', () => {
    expect(renderedComponent.find(ResetPasswordButton).node).toExist();
    expect(renderedComponent.find(ResetPasswordButton).text()).toEqual('Need to reset password?');
  });
  it('should redirect to /reset_password when clicked', () => {
    renderedComponent.find(ResetPasswordButton).simulate('click');
    expect(resetPasswordRedirectSpy).toHaveBeenCalled();
  });
});
