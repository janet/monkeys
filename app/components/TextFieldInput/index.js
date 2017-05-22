/**
*
* TextFieldInput
*
*/

import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';


function TextFieldInput({ hintText, floatingLabelText, type, input, meta: { touched, error } }) {
  return (
    <TextField
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      type={type}
      errorText={touched && error ? error : ''}
      {...input}
    />
  );
}

TextFieldInput.propTypes = {
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default TextFieldInput;
