import React from 'react';
import classnames from 'classnames/bind';
// import LegendItem from './components/LegendItem';
import styles from './alertlegend.css';

const cx = classnames.bind(styles);

export default function AlertLegend() {
  // const renderLegendItems = data =>
  //   data.map(({ property, value }) => (
  //     <Col span={4}>
  //       <LegendItem property={property} value={value} />
  //     </Col>
  //   ));
  return (
    <div className={cx('AlertLegend')}>
      <h1>This is a legend </h1>
    </div>
  );
}
