import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import Display from '../Display';
import './styles.css';

function AlertNavBar({ hideAlerts, onClickBack, onClickNew }) {
  return (
    <div className="AlertNavBar">
      <div className="ActionButtons">
        {hideAlerts ? (
          <Button type="primary" onClick={onClickBack}>
            <Icon type="left" style={{ fontSize: 14 }} />
            Back
          </Button>
        ) : (
          <Button type="primary" onClick={onClickNew}>
            <Icon type="plus" />
            New Alert
          </Button>
        )}
      </div>
      <div>{!hideAlerts ? <Display /> : null}</div>
    </div>
  );
}

export default AlertNavBar;

AlertNavBar.propTypes = {
  hideAlerts: PropTypes.bool.isRequired,
  onClickBack: PropTypes.func,
  onClickNew: PropTypes.func,
};

AlertNavBar.defaultProps = {
  onClickBack: () => {},
  onClickNew: () => {},
};
