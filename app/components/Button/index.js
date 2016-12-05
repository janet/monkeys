/**
*
* Button
*
*/

import React, { PropTypes } from 'react';

import StyledButton from './StyledButton';

function Button(props) {
  const { icon } = props;

  return (
    <StyledButton>
      <i className={icon} />
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
};

export default Button;
