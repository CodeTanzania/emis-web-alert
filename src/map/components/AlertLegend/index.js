import React from 'react';
import classnames from 'classnames/bind';
import LegendItem from './components/LegendItem';
import styles from './styles.css';
import { severityColors } from '../../../common/lib/util';

const cx = classnames.bind(styles);

export default function AlertLegend() {
  const renderLegendItems = data =>
    data.map(({ property, value }) => (
      <LegendItem property={property} value={value} />
    ));
  return (
    <div className={cx('AlertLegend')}>
      <div className={cx('AlertLegendHeader')}>
        <strong>Severity Level: </strong>
      </div>
      {renderLegendItems(severityColors)}
    </div>
  );
}
