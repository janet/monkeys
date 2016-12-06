import Button from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('to render', () => {
    const renderedComponent = shallow(
      <Button icon={'fa fa-play'} />
    );
    expect(
      renderedComponent.find('button')
    ).toExist();
    expect(
      renderedComponent.find('i').node
    ).toExist();
  });
});
