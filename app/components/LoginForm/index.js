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

function LoginForm(props) {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props;

  console.log('pristine', pristine);
  return (
    <CenteredWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            component={(email) =>
              <TextField
                hintText="person@example.com"
                floatingLabelText="Email"
                {...email.input}
              />
            }
          />
        </div>
        <div>
          <Field
            name="password"
            component={(password) =>
              <TextField
                type="password"
                hintText="password"
                floatingLabelText="Password"
                {...password.input}
              />
            }
          />
        </div>
        <div>
          <RaisedButton type="submit" disabled={pristine || submitting} label="Log In" primary />
        </div>
      </form>
    </CenteredWrapper>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};


export default reduxForm({
  form: 'LoginForm',
})(LoginForm);
