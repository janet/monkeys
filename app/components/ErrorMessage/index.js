/**
*
* ErrorMessage
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';


const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: calc(100% -2em);
  margin: 0 auto;
  margin-bottom: 1em;
`;

const ErrorStyled = styled.p`
  background-color: #fb4f4f;
  color: white;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0;
`;

function ErrorMessage(props) {
  return (
    <ErrorWrapper>
      <ErrorStyled>
        {props.error}
      </ErrorStyled>
    </ErrorWrapper>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
