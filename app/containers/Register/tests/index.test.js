import { Register } from '../index';
import RegisterForm from 'components/RegisterForm';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { EMPTY_FUNCTION } from 'tests/fixtures';


describe('<Register />', () => {
  it('should render a RegisterForm', () => {
    const wrapper = shallow(
      <Register
        tryLogin={EMPTY_FUNCTION}
        loginRedirect={EMPTY_FUNCTION}
      />
    );
    const registerFormComponent = wrapper.find(RegisterForm);
    expect(registerFormComponent).toExist();
    expect(registerFormComponent.length).toEqual(1);
  });
});
