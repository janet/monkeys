/**
*
* LoginForm
*
*/

import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';

function LoginForm(props) {
  const {
    tryLogin,
  } = props;

  return (
    <CenteredWrapper>
      <form onSubmit={tryLogin}>
        <div>
          <TextField
            hintText="person@example.com"
            floatingLabelText="Email"
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Password"
            type="password"
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
  tryLogin: PropTypes.func.isRequired,
};


export default LoginForm;
