/*
 *
 * ConfirmEmail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import CircularProgress from 'material-ui/CircularProgress';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';
import ColumnWrapper from 'components/Wrappers/ColumnWrapper';
import TopLineWrapper from 'components/Wrappers/TopLineWrapper';
import { processConfirm } from './actions';
import { selectData,
         selectLoading,
         selectLoaded } from './selectors';

export const EMAIL_CONFIRM_ERROR_MESSAGE = `
  We ran into an error with your email confirmation. Please contact jskenmotsu@gmail.com for assistance.
`;

export const EmailConfirmedMessage = (
  <TopLineWrapper>
    Your email is confirmed.
  </TopLineWrapper>
);

export const EmailConfirmErrorMessage = (
  <TopLineWrapper>
    {EMAIL_CONFIRM_ERROR_MESSAGE}
  </TopLineWrapper>
);

export const LoadingAnimation = (
  <CircularProgress
    size={80}
    thickness={5}
  />
);

export class ConfirmEmail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onLoadProcessConfirm(this.props.params.token);
  }

  getMessage(loading, loaded, emailConfirmed) {
    if (loading) {
      return LoadingAnimation;
    }
    if (loaded && emailConfirmed) {
      return EmailConfirmedMessage;
    }
    return EmailConfirmErrorMessage;
  }
  render() {
    const { loginRedirect,
            data,
            loading,
            loaded } = this.props;

    const emailConfirmed = data.get('emailConfirmed');

    const message = this.getMessage(loading, loaded, emailConfirmed);
    return (
      <ColumnWrapper>
        <CenteredWrapper>
          {message}
        </CenteredWrapper>
        <CenteredWrapper>
          <FlatButton
            type="button"
            label="Back to Login"
            onTouchTap={loginRedirect}
            primary
          />
        </CenteredWrapper>
      </ColumnWrapper>
    );
  }
}

ConfirmEmail.propTypes = {
  loginRedirect: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  onLoadProcessConfirm: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};


const mapStateToProps = createStructuredSelector({
  data: selectData(),
  loading: selectLoading(),
  loaded: selectLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginRedirect: () => dispatch(push('/login')),
    onLoadProcessConfirm: (token) => dispatch(processConfirm(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
