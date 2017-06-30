import TextFieldInput from '../index';
import { email, fakeInput, meta } from 'tests/fixtures';
import { mountWithContext } from 'tests/helpers';

import expect from 'expect';
import React from 'react';

describe('<TextFieldInput />', () => {
  it('to render', () => {
    const hintText = email;
    const floatingLabelText = email;
    const renderedComponent = mountWithContext(
      <TextFieldInput
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        errorText={''}
        input={fakeInput}
        meta={meta}
      />
    );
    const inputNodes = renderedComponent.find('input');
    expect(inputNodes.length).toEqual(1);
  });
});
