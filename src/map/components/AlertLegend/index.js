import React from 'react';
import { Col, Row } from 'antd';
import  LegendItem  from './components/LegendItem';
import { severityColors } from '../../../common/lib/util';


export default function AlertLegend() {
    
  const renderLegendItems = data =>
    data.map(({ property, value }) => (
      <Col span={4}>
        <LegendItem property={property} value={value} />
      </Col>
    ));
  return (
    <div className="top-right">
      <div className="legend">
        <Row>
          <Col span={4}>
            <div style={{ marginBottom: '3px' }}>
              <strong>Severity Level: </strong>
            </div>
          </Col>
          {renderLegendItems(severityColors)}
        </Row>
      </div>
    </div>
  );
}
