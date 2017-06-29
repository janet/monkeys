/**
*
* ErrorMessage
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';


export const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
`;

export const ErrorStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fb4f4f;
  color: white;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0;
`;

export const ErrorMessageText = styled.p`
  margin: 0;
`;

export const ResetPasswordButton = styled.button`
  cursor: pointer;
  padding: 0;
  text-align: left;
  outline: 0;
`;

function ErrorMessage(props) {
  return (
    <ErrorWrapper>
      <ErrorStyled>
        <ErrorMessageText>{props.error}</ErrorMessageText>
        <ResetPasswordButton onClick={props.resetPasswordRedirect}>
          Need to reset password?
        </ResetPasswordButton>
      </ErrorStyled>
    </ErrorWrapper>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  resetPasswordRedirect: PropTypes.func.isRequired,
};

export default ErrorMessage;
