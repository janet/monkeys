import { ConfirmEmail } from '../index';
import FlatButton from 'material-ui/FlatButton';
import CenteredWrapper from 'components/Wrappers/CenteredWrapper';
import { mountWithContext } from 'tests/helpers';

import expect from 'expect';
import React from 'react';

describe('<ConfirmEmail />', () => {
  it('Expect to have unit tests specified', () => {
    const wrapper = mountWithContext(
      <ConfirmEmail
        params={{ token: '1234' }}
      />
    );
    expect(wrapper.find(CenteredWrapper).length).toEqual(1);
    expect(wrapper.find(FlatButton).length).toEqual(1);
    expect(wrapper.find(FlatButton).node.props.label).toEqual('Back to Login');
    expect(wrapper.node.props.params.token).toEqual('1234');
  });
});
