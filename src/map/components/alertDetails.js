import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Icon } from 'antd';
import { get } from 'lodash';

function AlertDetailsValue ({ property, value }) {

  return (
    <div style={{marginBottom: '20px'}}>
      <div style={{color: '#189ad1',
    display: 'table',
    textTransform: 'uppercase'}}> { property }</div>
      <div style={{fontWeight: 700,
    fontSize: '13px',
    color: '#8a8a8a'}}> { value } </div>
    </div>
  );
}

export default function AlertDetails(props) {
  const { selected, unSelectAlert } = props;
  const closeAlertDetails = () => {
    unSelectAlert();
  };
  return selected ? (
    <div id="filters-header">
      <Row style={{paddingTop: '10px'}}>
      <Col span={20}>
        <h2>ALERT DETAILS</h2>
        </Col>
        <Col span={4} onClick={closeAlertDetails}>
        <Icon onClick={closeAlertDetails} type="close-square" style={{fontSize: '20px'}} theme="outlined" />
        </Col>
      </Row>
      <Divider style={{margin: 0}} />
      <Row>
        <Col span={24} style={{textAlign: 'left', paddingLeft: '10px', marginTop: '15px'}}>
        <AlertDetailsValue property={'event'} value={get(selected, 'event.name')} />
        <AlertDetailsValue property={'category'} value={get(selected, 'event.category')} />
        <AlertDetailsValue property={'urgency'} value={get(selected, 'event.urgency')} />
        <AlertDetailsValue property={'severity'} value={get(selected, 'event.severity')} />
        <AlertDetailsValue property={'certainty'} value={get(selected, 'event.certainty')} />
        <AlertDetailsValue property={'area description'} value={get(selected, 'area.description')} />
        <AlertDetailsValue property={'instructions'} value={get(selected, 'message.instruction')} />
        </Col>
      </Row>
    </div>
  ) : null;
}

const geometry = PropTypes.shape({
  type: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
}).isRequired;
const feature = PropTypes.shape({
  type: PropTypes.string,
  properties: PropTypes.shape({ id: PropTypes.string }),
  geometry,
});

const sourcePropTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
};

const eventPropTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  urgency: PropTypes.string,
  severity: PropTypes.string,
  certainty: PropTypes.string,
  response: PropTypes.string,
};

const messagePropTpes = {
  status: PropTypes.string,
  type: PropTypes.string,
  scope: PropTypes.string,
  restriction: PropTypes.string,
  addresses: PropTypes.arrayOf(PropTypes.string),
  code: PropTypes.string,
  note: PropTypes.string,
  headline: PropTypes.string,
  instruction: PropTypes.string,
  website: PropTypes.string,
};

const areaPropTypes = {
  type: PropTypes.string,
  features: PropTypes.arrayOf(feature),
};

const resourcePropTypes = {
  description: PropTypes.string,
  mime: PropTypes.string,
  uri: PropTypes.string,
};

const alertPropTypes = {
  source: PropTypes.shape({ sourcePropTypes }),
  event: PropTypes.shape({ eventPropTypes }),
  message: PropTypes.shape({ messagePropTpes }),
  area: PropTypes.shape({ areaPropTypes }),
  resources: PropTypes.shape({ resourcePropTypes }),
  reportedAt: PropTypes.string,
  expectedAt: PropTypes.string,
  expiredAt: PropTypes.string,
  occuredAt: PropTypes.string,
  endedAt: PropTypes.string,
  direction: PropTypes.string,
  _id: PropTypes.string,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
};
AlertDetails.propTypes = {
  unSelectAlert: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
};

AlertDetails.defaultProps = {
  selected: null,
  unSelectAlert: () => {},
};
