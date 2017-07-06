import { ConfirmEmail, EMAIL_CONFIRM_ERROR_MESSAGE } from '../index';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CenteredWrapper from 'components/Wrappers/CenteredWrapper';
import ColumnWrapper from 'components/Wrappers/ColumnWrapper';
import TopLineWrapper from 'components/Wrappers/TopLineWrapper';
import { mountWithContext } from 'tests/helpers';
import { EMPTY_FUNCTION,
         token,
         emailNotConfirmedData,
         emailConfirmedData } from 'tests/fixtures';

import expect from 'expect';
import React from 'react';


describe('<ConfirmEmail />', () => {
  it('to render with token', () => {
    const onLoadProcessConfirmSpy = expect.createSpy();
    const wrapper = mountWithContext(
      <ConfirmEmail
        params={{ token }}
        data={emailNotConfirmedData}
        loading={false}
        loaded={false}
        loginRedirect={EMPTY_FUNCTION}
        onLoadProcessConfirm={onLoadProcessConfirmSpy}
      />
    );
    expect(wrapper.find(ColumnWrapper).length).toEqual(1);
    expect(wrapper.find(CenteredWrapper).length).toEqual(2);
    expect(wrapper.find(FlatButton).length).toEqual(1);
    expect(wrapper.find(FlatButton).node.props.label).toEqual('Back to Login');
    expect(wrapper.node.props.params.token).toEqual(token);
    expect(onLoadProcessConfirmSpy).toHaveBeenCalledWith(token);
  });

  it('should render LoadingAnimation when email is being confirmed', () => {
    const onLoadProcessConfirmSpy = expect.createSpy();
    const wrapper = mountWithContext(
      <ConfirmEmail
        params={{ token }}
        data={emailNotConfirmedData}
        loading
        loaded={false}
        loginRedirect={EMPTY_FUNCTION}
        onLoadProcessConfirm={onLoadProcessConfirmSpy}
      />
    );
    expect(wrapper.find(ColumnWrapper).length).toEqual(1);
    expect(wrapper.find(CenteredWrapper).length).toEqual(2);
    expect(wrapper.find(FlatButton).length).toEqual(1);
    expect(wrapper.find(FlatButton).node.props.label).toEqual('Back to Login');
    expect(wrapper.find(CircularProgress).length).toEqual(1);
    expect(wrapper.find(TopLineWrapper).length).toEqual(0);
    expect(wrapper.node.props.params.token).toEqual(token);
    expect(onLoadProcessConfirmSpy).toHaveBeenCalledWith(token);
  });

  it('should render EmailConfirmedMessage when email is confirmed', () => {
    const onLoadProcessConfirmSpy = expect.createSpy();
    const wrapper = mountWithContext(
      <ConfirmEmail
        params={{ token }}
        data={emailConfirmedData}
        loading={false}
        loaded
        loginRedirect={EMPTY_FUNCTION}
        onLoadProcessConfirm={onLoadProcessConfirmSpy}
      />
    );
    expect(wrapper.find(ColumnWrapper).length).toEqual(1);
    expect(wrapper.find(CenteredWrapper).length).toEqual(2);
    expect(wrapper.find(FlatButton).length).toEqual(1);
    expect(wrapper.find(FlatButton).node.props.label).toEqual('Back to Login');
    expect(wrapper.find(TopLineWrapper).length).toEqual(1);
    expect(wrapper.find(TopLineWrapper).text()).toEqual('Your email is confirmed.');
    expect(wrapper.node.props.params.token).toEqual(token);
    expect(onLoadProcessConfirmSpy).toHaveBeenCalledWith(token);
  });

  it('should render EmailConfirmErrorMessage when email is not confirmed', () => {
    const onLoadProcessConfirmSpy = expect.createSpy();
    const wrapper = mountWithContext(
      <ConfirmEmail
        params={{ token }}
        data={emailNotConfirmedData}
        loading={false}
        loaded
        loginRedirect={EMPTY_FUNCTION}
        onLoadProcessConfirm={onLoadProcessConfirmSpy}
      />
    );
    expect(wrapper.find(ColumnWrapper).length).toEqual(1);
    expect(wrapper.find(CenteredWrapper).length).toEqual(2);
    expect(wrapper.find(FlatButton).length).toEqual(1);
    expect(wrapper.find(FlatButton).node.props.label).toEqual('Back to Login');
    expect(wrapper.find(TopLineWrapper).length).toEqual(1);
    expect(wrapper.find(TopLineWrapper).text()).toEqual(EMAIL_CONFIRM_ERROR_MESSAGE);
    expect(wrapper.node.props.params.token).toEqual(token);
    expect(onLoadProcessConfirmSpy).toHaveBeenCalledWith(token);
  });
});
