import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Icon, Tooltip, Button } from 'antd';
import { get } from 'lodash';
import { getAlertOperation, getAlertsOperation } from '../../../epics';
import styles from './styles.css';
import { alertPropTypes } from '../../../../common/lib/propTypesUtil';
import AlertDetailItem from './components/AlertDetailItem';
import { setAlertNavActive } from '../../../actions';
import AlertDetailsDrawer from '../AlertDetailsDrawer';

const cx = classnames.bind(styles);

/**
 * Alert Details  component
 * This component will provide visualization Alert details
 * based on CAP fields only
 *
 * @function
 * @name AlertDetails
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDrwaerOpen: false
    }
  }


   renderDetailItems = keys => {
     const { selected } = this.props;
     return keys.map(key => (
      <AlertDetailItem property={key} value={get(selected, key)} />
    ));
   }
   closeAlertDetails = () => {
     const  { setActiveItem, refreshAlerts, unSelectAlert }= this.props;
    setActiveItem('filter');
    refreshAlerts();
    unSelectAlert();
  };

  openDrawer = () => {
    this.setState({ isDrwaerOpen: true });
  }

  closeDrawer = () => {
    this.closeAlertDetails();
    this.setState({ isDrwaerOpen: false });
  }




  render () {

    const { isDrwaerOpen } = this.state;
    const { selected } = this.props;
    const detailsKeys = [
      'headline',
      'reportedAt',
      'expectedAt',
      'expiredAt',
      'instruction',
      'source',
    ];

    return selected ? (
      <div className={cx('AlertDetails')}>
        <div className={cx('AlertDetailsContent')}>
          {this.renderDetailItems(detailsKeys)}
          <Button
           type="primary"
           onClick={this.openDrawer}
           >
              more details
              <Icon type="right" style={{ fontSize: 14 }} />
            </Button>
          <AlertDetailsDrawer visible={isDrwaerOpen} onCloseDrawer={this.closeDrawer} />
        </div>
        <div
          className={cx('AlertDetailsBack')}
          onClick={this.closeAlertDetails}
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
  selected: {},
  setActiveItem: () => {},
  unSelectAlert: () => {},
  refreshAlerts: () => {},
};
