/**
 * Test App
*/

import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import AppBar from 'material-ui//AppBar';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { App } from '../index';
import { EMPTY_FUNCTION } from 'tests/fixtures';

describe('<App />', () => {
  const mountWithContext = (node) => mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    },
  });

  it('should render the AppBar with sign in button when not logged in', () => {
    const loginRedirectSpy = expect.createSpy();
    const renderedComponent = mountWithContext(
      <App
        loginRedirect={loginRedirectSpy}
        tryLogout={EMPTY_FUNCTION}
        loggedIn={false}
      />);
    const AppBarComponent = renderedComponent.find(AppBar).node;
    const FlatButtonComponent = renderedComponent.find(FlatButton).node;
    expect(AppBarComponent).toExist();
    expect(FlatButtonComponent.props.label).toEqual('sign in');
    expect(FlatButtonComponent.props.onTouchTap).toEqual(loginRedirectSpy);
  });

  it('should render the AppBar with logout button when logged in', () => {
    const tryLogoutSpy = expect.createSpy();
    const renderedComponent = mountWithContext(
      <App
        loginRedirect={EMPTY_FUNCTION}
        tryLogout={tryLogoutSpy}
        loggedIn
      />
    );
    const AppBarComponent = renderedComponent.find(AppBar).node;
    const FlatButtonComponent = renderedComponent.find(FlatButton).node;
    expect(AppBarComponent).toExist();
    expect(FlatButtonComponent.props.label).toEqual('logout');
    expect(FlatButtonComponent.props.onTouchTap).toEqual(tryLogoutSpy);
  });
});
