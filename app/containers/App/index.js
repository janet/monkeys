/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AppBar from 'material-ui//AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { browserHistory } from 'react-router';

import { selectLoggedIn } from './selectors';
import { logout } from './actions';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    loggedIn: PropTypes.bool.isRequired,
    loginRedirect: PropTypes.func.isRequired,
    tryLogout: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.loggedIn) {
      browserHistory.push('/');
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    const { loggedIn,
            tryLogout,
            loginRedirect } = this.props;
    return (
      <div>
        <AppBar
          title="SBG Monkeys"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            loggedIn ?
              <FlatButton label="logout" onTouchTap={tryLogout} /> :
                <FlatButton label="sign in" onTouchTap={loginRedirect} />}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loggedIn: selectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    tryLogout: () => dispatch(logout()),
    loginRedirect: () => dispatch(push('/login')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
