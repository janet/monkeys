import { Login } from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import LoginForm from 'components/LoginForm';

describe('<Login />', () => {
  it('should load a LoginForm', () => {
    const wrapper = shallow(
      <Login
        tryLogin={() => {}}
      />
    );
    const loginFormComponent = wrapper.find(LoginForm);
    expect(loginFormComponent).toExist();
    expect(loginFormComponent.length).toEqual(1);
  });
});
