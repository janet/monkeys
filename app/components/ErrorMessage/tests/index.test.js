import ErrorMessage from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { errorMessage } from 'tests/fixtures';

describe('<ErrorMessage />', () => {
  it('to render the error message', () => {
    const renderedComponent = mount(
      <ErrorMessage
        error={errorMessage.msg}
      />
    );
    expect(renderedComponent.text()).toEqual(errorMessage.msg);
  });
});
