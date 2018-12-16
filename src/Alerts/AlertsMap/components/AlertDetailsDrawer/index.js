import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';

class AlertDetailsDrawer extends React.Component {

  render() {
      const { visible, onCloseDrawer } = this.props;
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onCloseDrawer}
          visible={visible}
          width={'98vw'}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default AlertDetailsDrawer;

AlertDetailsDrawer.propTypes = {
    onCloseDrawer: PropTypes.func,
    visible: PropTypes.bool
}

AlertDetailsDrawer.defaultProps = {
    onCloseDrawer: () => {},
    visible: false
}
