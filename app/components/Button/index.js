/**
*
* Button
*
*/

import React, { PropTypes, Children } from 'react';

import StyledButton from './StyledButton';

class Button extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      	<StyledButton>
      		<i className="fa fa-play" />
      	</StyledButton>
      </div>
    );
  }
}

export default Button;
