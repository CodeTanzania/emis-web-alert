import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import AlertNav from './components/AlertNav';
import './styles.css';

class AlertDetailsDrawer extends React.Component {

  render() {
      const { visible, onCloseDrawer } = this.props;
    return (
      <div className={AlertDetailsDrawer}>
      contenrnrnrnrnrnrnrnrn
        <Drawer
          placement="right"
          closable={false}
          onClose={onCloseDrawer}
          visible={visible}
          width={'98vw'}
        >
        <AlertNav />
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
