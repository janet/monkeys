import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';

const styles = css`
  text-align: center;
`;

const Item = styled(({ level, children, ...props }) => { // eslint-disable-line arrow-body-style
  return React.createElement(`h${level}`, props, children);
})`${styles}`;

Item.propTypes = {
  level: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

Item.defaultProps = {
  level: 1,
};

export default Item;
