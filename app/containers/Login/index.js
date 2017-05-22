/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { authorize } from './actions';
import LoginForm from 'components/LoginForm';
import { selectIsAuthorized } from './selectors';

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      tryLogin,
      resetPasswordRedirect,
    } = this.props;
    return (
      <div>
        <LoginForm
          onSubmit={tryLogin}
          resetPasswordRedirect={resetPasswordRedirect}
        />
      </div>
    );
  }
}

Login.propTypes = {
  tryLogin: PropTypes.func.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: selectIsAuthorized(),
});

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: (data) => dispatch(authorize(data)),
    resetPasswordRedirect: () => dispatch(push('/reset_password')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
