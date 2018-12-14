import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isoDateToHumanReadableDate } from '../../../../../../common/lib/util';

function AlertDetailItem({ property, value }) {
  const formatTitle = title => {
    switch (title) {
      case 'area.description': {
        return ' AREA DESCRIPTION:';
      }
      case 'description': {
        return ' ALERT DESCRIPTION:';
      }
      case 'reportedAt': {
        return 'WHEN WAS REPORTED:';
      }
      case 'expectedAt': {
        return 'WHEN IS EXPECTED:';
      }

      case 'expiredAt': {
        return 'WHEN WILL EXPIRE:';
      }

      case 'source': {
        return 'ISSUED BY:';
      }

      default:
        return title;
    }
  };

  const formatValue = (title, data) => {
    switch (title) {
      case 'reportedAt': {
        const m = isoDateToHumanReadableDate(data);
        return m;
      }
      case 'expectedAt': {
        const m = isoDateToHumanReadableDate(data);
        return m;
      }

      case 'expiredAt': {
        const m = isoDateToHumanReadableDate(data);
        return m;
      }

      default:
        return data;
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          color: '#189ad1',
          display: 'table',
          textTransform: 'uppercase',
        }}
      >
        {' '}
        {formatTitle(property)}
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: '13px',
          color: '#8a8a8a',
        }}
      >
        {' '}
        {formatValue(property, value)}{' '}
      </div>
    </div>
  );
}

AlertDetailItem.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
};

AlertDetailItem.defaultProps = {
  property: 'no data',
  value: 'no data',
};

export default AlertDetailItem;
