/**
*
* ClassTitle
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function ClassTitle() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default ClassTitle;
