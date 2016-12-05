/**
*
* Heading
*
*/

import React, { PropTypes } from 'react';

import Button from 'components/Button';
import Item from './Item';

function Heading(props) {
  const { level,
          item,
          icon,
          href } = props;

  return (
    <Item level={level}>
      {item}
      {icon ?
        <Button icon={icon} href={href} /> :
        null}
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
