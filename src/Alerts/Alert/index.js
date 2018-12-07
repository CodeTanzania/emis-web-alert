import React from 'react';
import PropTypes from 'prop-types';
import AlertMap from './components/AlertMap';
import AlertNav from './components/AlertNav';

function Alert({
  match: {
    params: { id },
  },
}) {
  return (
    <div>
      <AlertMap />
      <AlertNav id={id} />
    </div>
  );
}

export default Alert;

Alert.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
