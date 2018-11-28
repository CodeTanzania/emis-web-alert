import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Button } from 'antd';
import moment from 'moment';
import { get } from 'lodash';
import { getAlertOperation, getAlertsOperation } from '../../epics';
import styles from './styles.css';
import { alertPropTypes } from '../../../common/lib/propTypesUtil';
import { setAlertNavActive } from '../../actions';

const cx = classnames.bind(styles);

function AlertDetailsValue({ property, value }) {
  const formatTitle = title => {
    switch (title) {
      case 'area.description': {
        return ' AREA DESCRIPTION';
      }
      case 'description': {
        return ' ALERT DESCRIPTION';
      }
      case 'reportedAt': {
        return 'WHEN WAS REPORTED';
      }
      case 'expectedAt': {
        return 'WHEN IS EXPECTED';
      }

      case 'expiredAt': {
        return 'WHEN WILL EXPIRE';
      }

      default:
        return title;
    }
  };

  const formatValue = (title, data) => {
    switch (title) {
      case 'reportedAt': {
        const m = moment(data, 'YYYY-MM-DD');
        return `${m.calendar()}`;
      }
      case 'expectedAt': {
        const m = moment(data, 'YYYY-MM-DD');
        return `${m.calendar()}`;
      }

      case 'expiredAt': {
        const m = moment(data, 'YYYY-MM-DD');
        return `${m.calendar()}`;
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

AlertDetailsValue.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
};

AlertDetailsValue.defaultProps = {
  property: 'no data',
  value: 'no data',
};

function AlertDetails(props) {
  const { selected, unSelectAlert, setActiveItem, refreshAlerts } = props;
  const detailsKeys = [
    'category',
    'urgency',
    'severity',
    'severity',
    'certainty',
    'reportedAt',
    'expectedAt',
    'expiredAt',
    'description',
    'area.description',
    'instruction',
  ];

  const renderDetailItems = keys =>
    keys.map(key => (
      <AlertDetailsValue property={key} value={get(selected, key)} />
    ));
  const closeAlertDetails = () => {
    setActiveItem('legend');
    refreshAlerts();
    unSelectAlert();
  };
  return selected ? (
    <div className={cx('AlertDetails')}>
      <div className={cx('AlertDetailsContent')}>
        {renderDetailItems(detailsKeys)}
      </div>

      <div className={cx('AlertDetailsBack')}>
        <Button onClick={closeAlertDetails} type="primary">
          Back
        </Button>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = state => ({
  selected: state.alert && state.alert ? state.alert.data : null,
});

export default connect(
  mapStateToProps,
  {
    unSelectAlert: getAlertOperation,
    setActiveItem: setAlertNavActive,
    refreshAlerts: getAlertsOperation,
  }
)(AlertDetails);

AlertDetails.propTypes = {
  unSelectAlert: PropTypes.func,
  setActiveItem: PropTypes.func,
  refreshAlerts: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
};

AlertDetails.defaultProps = {
  selected: null,
  setActiveItem: () => {},
  unSelectAlert: () => {},
  refreshAlerts: () => {},
};
