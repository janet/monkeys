import LoginForm from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

describe('<LoginForm />', () => {
  let store;
  let handleSubmit;
  let renderedComponent;
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
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    handleSubmit = expect.createSpy();
    const props = {
      handleSubmit,
    };
    renderedComponent = mountWithContext(
      <Provider store={store}>
        <LoginForm {...props} />
      </Provider>
    );
  });
  it('should render', () => {
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
