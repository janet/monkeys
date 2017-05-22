/*
 *
 * ResetPassword
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { resetPassword } from './actions';
import ResetPasswordForm from 'components/ResetPasswordForm';
import { selectIsAuthorized } from './selectors';

export class ResetPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      tryResetPassword,
      loginRedirect,
    } = this.props;
    return (
      <div>
        <ResetPasswordForm
          onSubmit={tryResetPassword}
          loginRedirect={loginRedirect}
        />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  tryResetPassword: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: selectIsAuthorized(),
});

function mapDispatchToProps(dispatch) {
  return {
    tryResetPassword: (data) => dispatch(resetPassword(data)),
    loginRedirect: () => dispatch(push('/login')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
