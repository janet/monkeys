/**
*
* LoginForm
*
*/

import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm, Field } from 'redux-form/immutable';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';
import { validate } from './Validate';

const renderInput = ({ hintText, floatingLabelText, type, input, meta: { touched, error } }) =>
  <TextField
    hintText={hintText}
    floatingLabelText={floatingLabelText}
    type={type}
    errorText={touched && error ? error : ''}
    {...input}
  />;

renderInput.propTypes = {
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

function LoginForm(props) {
  const {
    handleSubmit,
  } = props;

  return (
    <CenteredWrapper>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            hintText="person@example.com"
            floatingLabelText="Email"
            component={renderInput}
          />
        </div>
        <div>
          <Field
            name="password"
            type="password"
            hintText="password"
            floatingLabelText="Password"
            component={renderInput}
          />
        </div>
        <div>
          <RaisedButton type="submit" label="Log In" primary />
        </div>
      </form>
    </CenteredWrapper>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};


export default reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm);
