import TextFieldInput from '../index';
import { email, fakeInput, meta } from 'tests/fixtures';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<TextFieldInput />', () => {
  // 'injectTapEventPlugin' is a dependency of material-ui
  // and must be added to every test with a material-ui component.
  // It prevents the following warning:
  // Unknown prop `onTouchTap` on <label> tag
  injectTapEventPlugin();
  const mountWithContext = (node) => mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    },
  });
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
