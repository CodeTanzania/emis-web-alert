import PropTypes from 'prop-types';

export const geometry = PropTypes.shape({
  type: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
}).isRequired;

export const feature = PropTypes.shape({
  type: PropTypes.string,
  properties: PropTypes.shape({ id: PropTypes.string }),
  geometry,
});

export const sourcePropTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
};

export const eventPropTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  urgency: PropTypes.string,
  severity: PropTypes.string,
  certainty: PropTypes.string,
  response: PropTypes.string,
};

export const messagePropTpes = {
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

export const areaPropTypes = {
  type: PropTypes.string,
  features: PropTypes.arrayOf(feature),
};

export const resourcePropTypes = {
  description: PropTypes.string,
  mime: PropTypes.string,
  uri: PropTypes.string,
};

export const alertPropTypes = {
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
