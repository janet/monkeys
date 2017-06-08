/*
 *
 * Logout
 *
 */

import React from 'react';

import CenteredWrapper from 'components/Wrappers/CenteredWrapper';


export default class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CenteredWrapper>
        <div style={{ margin: 14 }}>
        You are successfully logged out.
        </div>
      </CenteredWrapper>
    );
  }
}
