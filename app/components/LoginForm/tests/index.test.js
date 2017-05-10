import LoginForm from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


describe('<LoginForm />', () => {
  injectTapEventPlugin(); // dependency of material-ui warning: Unknown prop `onTouchTap` on <label> tag
  const mountWithContext = (node) => mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    },
  });
  it('should render', () => {
    const renderedComponent = mountWithContext(
      <LoginForm
        tryLogin={() => {}}
      />
    );
    expect(renderedComponent).toExist();
    expect(renderedComponent.find(TextField).length).toEqual(2);
    const emailTextField = renderedComponent.find(TextField).nodes[0];
    expect(emailTextField.props.hintText).toEqual('person@example.com');
    expect(emailTextField.props.floatingLabelText).toEqual('Email');
    const passwordTextField = renderedComponent.find(TextField).nodes[1];
    expect(passwordTextField.props.type).toEqual('password');
    expect(renderedComponent.find(RaisedButton).length).toEqual(1);
  });
});
