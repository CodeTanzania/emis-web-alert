import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import MoreDetails from '../MoreDetails';
import './styles.css';

/**
 * Alert Navigation  component
 * This component will provide Navigation menu for an Alert
 *
 * @function
 * @name AlertNav
 *
 * @version 0.1.0
 * @since 0.1.0
 */

class AlertNav extends React.Component {
  state = {
    current: 'alert-details',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  renderNavContent = current => {
    switch (current) {
      case 'alert-details': {
        const { id } = this.props;
        return <MoreDetails id={id} />;
      }
      case 'actions': {
        return <div>work on progress</div>;
      }
      case 'feed': {
        return <div>work on progress</div>;
      }
      default:
        return false;
    }
  };

  render() {
    const { current } = this.state;
    return (
      <div className="AlertNav">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="alert-details">Alert Details</Menu.Item>
          <Menu.Item key="actions">Actions</Menu.Item>
          <Menu.Item key="feed">Feed</Menu.Item>
        </Menu>
        <div className="MenuContents">
          <div className="Container">{this.renderNavContent(current)}</div>
        </div>
      </div>
    );
  }
}

export default AlertNav;

AlertNav.propTypes = {
  id: PropTypes.string,
};

AlertNav.defaultProps = {
  id: '',
};
