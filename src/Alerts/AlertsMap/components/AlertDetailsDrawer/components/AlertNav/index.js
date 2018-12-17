import React from 'react';
import { Menu } from 'antd';
import MoreDetails from '../MoreDetails';
import AlertResources from '../AlertResources';
import AlertActions from '../AlertActions';
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
    current: 'details',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  renderNavContent = current => {
    switch (current) {
      case 'details': {
        return <MoreDetails />;
      }
      case 'resources': {
        return <AlertResources />;
      }
      case 'actions': {
        return <AlertActions />;
      }
      case 'references': {
        return <div>Referenced Alerts will be placed here</div>;
      }
      case 'incidents': {
        return <div>Associated Incidents will be placed here</div>;
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
          <Menu.Item key="details">Alert Details</Menu.Item>
          <Menu.Item key="resources">Alert Resources</Menu.Item>
          <Menu.Item key="actions">Actions</Menu.Item>
          {/* <Menu.Item key="references">Referenced Alerts</Menu.Item>
          <Menu.Item key="incidents">Associated Incidents</Menu.Item> */}
        </Menu>
        <div className="MenuContents">
          <div className="Container">{this.renderNavContent(current)}</div>
        </div>
      </div>
    );
  }
}

export default AlertNav;
