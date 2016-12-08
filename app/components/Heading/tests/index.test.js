import Heading from '../index';
import Button from 'components/Button';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Heading />', () => {
  const item = 'Wed 5/20 5-6pm';
  const icon = 'fa fa-play';
  it('to render with an icon', () => {
    const renderedComponent = mount(
      <Heading
        level={3}
        item={item}
        icon={icon}
      />
    );
    expect(renderedComponent.text()).toEqual(item);
    expect(renderedComponent.find(Button).length).toEqual(1);
    expect(renderedComponent.find('h3').length).toEqual(1);
  });
  it('to render without an icon', () => {
    const renderedComponent = mount(
      <Heading
        level={2}
        item={item}
      />
    );
    expect(renderedComponent.find(Button).length).toEqual(0);
    expect(renderedComponent.text()).toEqual(item);
    expect(renderedComponent.find('h2').length).toEqual(1);
  });
});
