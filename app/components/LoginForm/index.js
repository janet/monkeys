/**
*
* LoginForm
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
import { validate } from './Validate';
import ErrorMessage from 'components/ErrorMessage';
import { selectError } from 'containers/Login/selectors';


class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      handleSubmit,
      resetPasswordRedirect,
      registerRedirect,
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
              <RaisedButton type="submit" label="Log In" primary />
              <FlatButton
                type="button"
                label="Register"
                onTouchTap={registerRedirect}
                primary
              />
            </div>
          </form>
        </ColumnWrapper>
      </CenteredWrapper>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
  registerRedirect: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

export default reduxForm({
  form: 'LoginForm',
  validate,
})(connect(mapStateToProps)(LoginForm));
