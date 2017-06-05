import Logout from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Logout />', () => {
  it('should render the successful logout message', () => {
    const wrapper = mount(<Logout />);

    expect(wrapper.text()).toEqual('You are successfully logged out.');
  });
});
