/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { processLogin } from './actions';
import LoginForm from 'components/LoginForm';
import { selectEmail } from './selectors';

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      tryLogin,
    } = this.props;
    return (
      <div>
        <LoginForm
          onSubmit={tryLogin}
        />
      </div>
    );
  }
}

Login.propTypes = {
  // email: PropTypes.string,
  tryLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail(),
});

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: (inputs) => dispatch(processLogin(inputs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
