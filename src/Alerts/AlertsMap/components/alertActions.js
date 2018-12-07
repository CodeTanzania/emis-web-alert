import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'antd';

class AlertActions extends React.Component {
  render() {
    const { hideAlerts } = this.props;
    return hideAlerts ? (
      <div id="sidebar">
        <Row style={{ padding: '5px' }}>
          <Col span={8}>
            <Button type="primary" onClick={this.onclickNewAlertButton}>
              + New Alert
            </Button>
          </Col>
          <Col span={8}>
            <Button type="primary">
              <Icon type="export" theme="outlined" />
              Export
            </Button>
          </Col>
          <Col span={4}>
            <Button type="default">
              <Icon type="table" theme="outlined" />
            </Button>
          </Col>
          <Col span={4}>
            <Button type="default">
              <Icon type="caret-up" theme="outlined" />
            </Button>
          </Col>
        </Row>
      </div>
    ) : null;
  }
}

export default AlertActions;

AlertActions.propTypes = {
  hideAlerts: PropTypes.bool,
};

AlertActions.defaultProps = {
  hideAlerts: false,
};
