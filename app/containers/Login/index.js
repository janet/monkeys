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

import styled from 'styled-components';

export const RegisteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
`;

export const RegisteredStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #B2EBF2;
`;

export const RegisteredText = styled.p`
  text-align: center;
`;

function RegisteredMessage(props) {
  const text = props.registerSuccess ? 'Registration success! Please check email for confirmation.' : '';

  return (
    <RegisteredWrapper>
      <RegisteredStyled>
        <RegisteredText>{text}</RegisteredText>
      </RegisteredStyled>
    </RegisteredWrapper>
  );
}

RegisteredMessage.propTypes = {
  registerSuccess: PropTypes.bool.isRequired,
};


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
