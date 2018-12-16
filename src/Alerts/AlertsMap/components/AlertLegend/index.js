import React from 'react';
import classnames from 'classnames/bind';
import LegendItem from './components/LegendItem';
import styles from './styles.css';
import { severityColors } from '../../../../common/lib/util';

const cx = classnames.bind(styles);

export default function AlertLegend() {
  const renderLegendItems = data =>
    data.map(({ property, value }) => (
      <LegendItem property={property} value={value} />
    ));
  return (
    <div className={cx('AlertLegend')}>
      <div className={cx('AlertLegendHeader')}>CAP Severity:</div>
      <div className={cx('AlertLegendContents')}>
        {renderLegendItems(severityColors)}
      </div>
    </div>
  );
}
