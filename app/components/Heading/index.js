/**
*
* Heading
*
*/

import React, { PropTypes } from 'react';

import Button from 'components/Button';
import Item from './Item';
import SpaceBetweenWrapper from './SpaceBetweenWrapper';

function Heading(props) {
  const { level,
          item,
          icon,
          href } = props;

  return (
    <Item level={level}>
      <SpaceBetweenWrapper>
        {item}
        {icon ?
          <Button icon={icon} href={href} /> :
          null}
      </SpaceBetweenWrapper>
    </Item>
  );
}

Heading.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  icon: PropTypes.string,
  href: PropTypes.string,
};

Heading.defaultProps = {
  level: 1,
};

export default Heading;
