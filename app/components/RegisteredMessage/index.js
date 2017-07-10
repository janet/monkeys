/**
*
* RegisteredMessage
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

export const RegisteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
`;

export const RegisteredStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #B2EBF2;
`;

export const RegisteredText = styled.p`
  text-align: center;
`;


function RegisteredMessage(props) {
  const text = props.registerSuccess ? 'Registration was successful! Please check email for confirmation.' : '';

  return (
    <RegisteredWrapper>
      <RegisteredStyled>
        <RegisteredText>{text}</RegisteredText>
      </RegisteredStyled>
    </RegisteredWrapper>
  );
}


RegisteredMessage.propTypes = {
  registerSuccess: PropTypes.bool.isRequired,
};

export default RegisteredMessage;
