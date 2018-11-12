import React from 'react';
import PropTypes from 'prop-types';

function LegendItem({ property, value }) {
  return (
    <React.Fragment>
      <i style={{ background: value, opacity: 1 }} />
      <span> {property} </span>
      <br />
    </React.Fragment>
  );
}

LegendItem.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
};

LegendItem.defaultProps = {
  property: 'no data',
  value: 'no data',
};

export default LegendItem;
