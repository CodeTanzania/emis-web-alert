import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './styles.css';

const cx = classnames.bind(styles);

function LegendItem({ property, value }) {
  return (
    <div
      onKeyPress={() => {}}
      role="button"
      tabIndex="0"
      className={cx('LegendItem')}
    >
      <i style={{ background: value, opacity: 1 }} />
      <span> {property} </span>
    </div>
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
