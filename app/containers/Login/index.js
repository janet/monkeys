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
import { selectRegisterSuccess } from 'containers/Register/selectors';
import RegisteredMessage from 'components/RegisteredMessage';


export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      tryLogin,
      resetPasswordRedirect,
      registerRedirect,
      registerSuccess,
    } = this.props;
    const registered = registerSuccess ? <RegisteredMessage registerSuccess={registerSuccess} /> : '';
    return (
      <div>
        <div>
          {registered}
        </div>
        <LoginForm
          onSubmit={tryLogin}
          resetPasswordRedirect={resetPasswordRedirect}
          registerRedirect={registerRedirect}
        />
      </div>
    );
  }
}

Login.propTypes = {
  tryLogin: PropTypes.func.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
  registerRedirect: PropTypes.func.isRequired,
  registerSuccess: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: selectIsAuthorized(),
  registerSuccess: selectRegisterSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: (data) => dispatch(authorize(data)),
    resetPasswordRedirect: () => dispatch(push('/reset_password')),
    registerRedirect: () => dispatch(push('/register')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
