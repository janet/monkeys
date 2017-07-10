import RegisteredMessage,
     { RegisteredWrapper,
       RegisteredStyled,
       RegisteredText } from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<RegisteredMessage />', () => {
  it('should render', () => {
    const renderedComponent = mount(
      <RegisteredMessage registerSuccess />
    );
    expect(renderedComponent.find(RegisteredWrapper).length).toEqual(1);
    expect(renderedComponent.find(RegisteredStyled).length).toEqual(1);
    expect(renderedComponent.find(RegisteredText).length).toEqual(1);
    expect(renderedComponent.find(RegisteredText).text()).toEqual('Registration was successful! Please check email for confirmation.');
  });
});
