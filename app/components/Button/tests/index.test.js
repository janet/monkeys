import Button from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('to render with an icon', () => {
    const icon = 'fa fa-play';
    const renderedComponent = mount(
      <Button icon={icon} />
    );
    expect(renderedComponent.find('button').length).toEqual(1);
    expect(renderedComponent.contains(<i className={icon} />)).toEqual(true);
  });
  it('to render without an icon', () => {
    const renderedComponent = mount(
      <Button />
    );
    expect(renderedComponent.find('button').length).toEqual(1);
    expect(renderedComponent.find('i').length).toEqual(1);
  });
});
