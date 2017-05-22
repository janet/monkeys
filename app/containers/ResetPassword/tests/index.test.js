import { ResetPassword } from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ResetPasswordForm from 'components/ResetPasswordForm';

describe('<ResetPassword />', () => {
  it('should load a ResetPasswordForm', () => {
    const wrapper = shallow(
      <ResetPassword
        tryResetPassword={() => {}}
        loginRedirect={() => {}}
      />
    );
    const ResetPasswordFormComponent = wrapper.find(ResetPasswordForm);
    expect(ResetPasswordFormComponent).toExist();
    expect(ResetPasswordFormComponent.length).toEqual(1);
  });
});
