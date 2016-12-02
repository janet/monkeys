/**
*
* ClassSubTitle
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function ClassSubTitle() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default ClassSubTitle;
