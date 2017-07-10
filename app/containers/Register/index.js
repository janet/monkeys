/*
 *
 * Register
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RegisterForm from 'components/RegisterForm';

import { register } from './actions';

export class Register extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      loginRedirect,
      resetPasswordRedirect,
      tryRegister,
    } = this.props;
    return (
      <div>
        <RegisterForm
          onSubmit={tryRegister}
          loginRedirect={loginRedirect}
          resetPasswordRedirect={resetPasswordRedirect}
        />
      </div>
    );
  }
}

Register.propTypes = {
  tryRegister: PropTypes.func.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    tryRegister: (data) => dispatch(register(data)),
    resetPasswordRedirect: () => dispatch(push('/reset_password')),
    loginRedirect: () => dispatch(push('/login')),
  };
}

export default connect(null, mapDispatchToProps)(Register);
