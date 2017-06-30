import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function mockApiResponse(status, body) {
  const mockResponse = {
    status,
    body,
  };
  return mockResponse;
}

export const mountWithContext = (node) => mount(node, {
  context: {
    muiTheme: getMuiTheme(),
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },
});
