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
      tryRegister,
    } = this.props;
    return (
      <div>
        <RegisterForm
          onSubmit={tryRegister}
          loginRedirect={loginRedirect}
        />
      </div>
    );
  }
}

Register.propTypes = {
  tryRegister: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    tryRegister: (data) => dispatch(register(data)),
    loginRedirect: () => dispatch(push('/login')),
  };
}

export default connect(null, mapDispatchToProps)(Register);
