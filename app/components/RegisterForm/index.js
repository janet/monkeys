/**
*
* RegisterForm
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
import { selectError } from 'containers/Register/selectors';


class RegisterForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      handleSubmit,
      loginRedirect,
      resetPasswordRedirect,
      error,
    } = this.props;

    return (
      <CenteredWrapper>
        <ColumnWrapper>
          {error ? <ErrorMessage error={error} resetPasswordRedirect={resetPasswordRedirect} /> : null}
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
                name="nameFirst"
                type="text"
                floatingLabelText="First Name"
                component={TextFieldInput}
              />
            </div>
            <div>
              <Field
                name="nameLast"
                type="text"
                floatingLabelText="Last Name"
                component={TextFieldInput}
              />
            </div>
            <div>
              <RaisedButton type="submit" label="Register" primary />
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

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(connect(mapStateToProps)(RegisterForm));
