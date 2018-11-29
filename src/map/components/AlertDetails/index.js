import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Icon, Tooltip } from 'antd';
import { get } from 'lodash';
import { getAlertOperation, getAlertsOperation } from '../../epics';
import styles from './styles.css';
import { alertPropTypes } from '../../../common/lib/propTypesUtil';
import AlertDetailItem from './components/AlertDetailItem';
import { setAlertNavActive } from '../../actions';

const cx = classnames.bind(styles);

function AlertDetails(props) {
  const { selected, unSelectAlert, setActiveItem, refreshAlerts } = props;
  const detailsKeys = [
    'source',
    'status',
    'type',
    'scope',
    'category',
    'event',
    'response',
    'urgency',
    'severity',
    'certainty',
    'headline',
    'reportedAt',
    'expectedAt',
    'expiredAt',
    'description',
    'area.description',
    'instruction',
  ];

  const renderDetailItems = keys =>
    keys.map(key => (
      <AlertDetailItem property={key} value={get(selected, key)} />
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
      <div
        className={cx('AlertDetailsBack')}
        onClick={closeAlertDetails}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
      >
        <Tooltip placement="topLeft" title={<span>Close</span>}>
          <Icon type="close-square" />
        </Tooltip>
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
