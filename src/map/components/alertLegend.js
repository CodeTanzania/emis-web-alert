import React from 'react';
import PropTypes from 'prop-types';

function AlertDetailsValue({ property, value }) {
  return (
    <React.Fragment>
      <i style={{ background: value, opacity: 1 }} />
      <span> {property} </span>
      <br />
    </React.Fragment>
  );
}

AlertDetailsValue.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
};

AlertDetailsValue.defaultProps = {
  property: 'no data',
  value: 'no data',
};

export default function AlertLegend(props) {
  const { selected } = props;
  const severityData = [
    { property: 'Extreme', value: '#d72e29' },
    { property: 'Severe', value: '#fe9901' },
    { property: 'Moderate', value: '#ffff00' },
    { property: 'Minor', value: '#88e729' },
    { property: 'Unknown', value: '#3366ff' },
  ];

  const renderLegendItems = data =>
    data.map(({ property, value }) => (
      <AlertDetailsValue property={property} value={value} />
    ));
  return !selected ? (
    <div className="top-right">
      <div className="legend">
        <div style={{ marginBottom: '3px' }}>
          <strong>Severity Level</strong>
        </div>
        {renderLegendItems(severityData)}
      </div>
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
AlertLegend.propTypes = {
  selected: PropTypes.shape(alertPropTypes),
};

AlertLegend.defaultProps = {
  selected: null,
};
