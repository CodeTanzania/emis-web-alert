import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

export default function AlertDetails(props) {
  const { selected, unSelectAlert } = props;
  const closeAlertDetails = () => {
    unSelectAlert();
  };
  return selected ? (
    <div id="filters-header">
      <h1>
        <strong
          role="button"
          onClick={closeAlertDetails}
          onKeyPress={() => {}}
          tabIndex={0}
        >
          x
        </strong>{' '}
        Alert Details{' '}
      </h1>
      <p>
        {' '}
        <strong>Event:</strong> {get(selected, 'event.name')}{' '}
      </p>
      <p>
        {' '}
        <strong>Category:</strong> {get(selected, 'event.category')}{' '}
      </p>
      <p>
        {' '}
        <strong>Urgency:</strong> {get(selected, 'event.urgency')}{' '}
      </p>
      <p>
        {' '}
        <strong>Severity:</strong> {get(selected, 'event.severity')}{' '}
      </p>
      <p>
        {' '}
        <strong>Certainty:</strong> {get(selected, 'event.certainty')}{' '}
      </p>
      <p>
        {' '}
        <strong>Instructions:</strong> {get(selected, 'message.instruction')}{' '}
      </p>
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
