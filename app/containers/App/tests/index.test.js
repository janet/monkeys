/**
 * Test App
*/

import expect from 'expect';
import React from 'react';
import AppBar from 'material-ui//AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { App } from '../index';
import { EMPTY_FUNCTION } from 'tests/fixtures';
import { mountWithContext } from 'tests/helpers';

describe('<App />', () => {
  // 'injectTapEventPlugin' is a dependency of material-ui
  // and must be added once into the test environment.
  // adding it under the App test, assuming this will never be taken out.
  // It prevents the following warning:
  // Unknown prop `onTouchTap` on <label> tag
  injectTapEventPlugin();
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
