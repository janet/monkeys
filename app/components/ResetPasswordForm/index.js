/**
*
* ResetPasswordForm
*
*/

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';
import ColumnWrapper from 'components/Wrappers/ColumnWrapper';
import TextFieldInput from 'components/TextFieldInput';
import ErrorMessage from 'components/ErrorMessage';
import { validate } from './Validate';
import { selectError } from 'containers/ResetPassword/selectors';


class ResetPasswordForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      handleSubmit,
      loginRedirect,
      error,
    } = this.props;

    return (
      <CenteredWrapper>
        <ColumnWrapper>
          {error ? <ErrorMessage error={error} /> : null}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <Field
                name="email"
                hintText="person@example.com"
                floatingLabelText="Email"
                component={TextFieldInput}
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                hintText="password"
                floatingLabelText="Password"
                component={TextFieldInput}
              />
            </div>
            <div>
              <Field
                name="confirmPassword"
                type="password"
                hintText="password"
                floatingLabelText="Confirm Password"
                component={TextFieldInput}
              />
            </div>
            <div>
              <RaisedButton type="submit" label="Reset Password" primary />
              <FlatButton
                type="button"
                label="Back to Login"
                onTouchTap={loginRedirect}
                primary
              />
            </div>
          </form>
        </ColumnWrapper>
      </CenteredWrapper>
    );
  }
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

export default reduxForm({
  form: 'ResetPasswordForm',
  validate,
})(connect(mapStateToProps)(ResetPasswordForm));
