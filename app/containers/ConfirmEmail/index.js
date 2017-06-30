/*
 *
 * ConfirmEmail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';

export class ConfirmEmail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { loginRedirect,
            params } = this.props;
    return (
      <CenteredWrapper>
        <div style={{ margin: 14 }}>
        Your email is confirmed.
        </div>
        <FlatButton
          type="button"
          label="Back to Login"
          onTouchTap={loginRedirect}
          primary
        />
        <h3>
          token: {params.token}
        </h3>
      </CenteredWrapper>
    );
  }
}

ConfirmEmail.propTypes = {
  loginRedirect: PropTypes.func.isRequired,
  params: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    loginRedirect: () => dispatch(push('/login')),
  };
}

export default connect(null, mapDispatchToProps)(ConfirmEmail);
