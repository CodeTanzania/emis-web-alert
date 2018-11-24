import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Menu } from 'antd';
import { setAlertNavActive } from '../../actions';
import AlertDetails from '../AlertDetails';
import AlertLegend from '../AlertLegend';

import styles from './styles.css';

// constants
const cx = classnames.bind(styles);

class AlertNav extends React.Component {
  handleClick = e => {
    const { setActiveItem } = this.props;
    setActiveItem(e.key);
  };

  renderNavContent = current => {
    switch (current) {
      case 'legend': {
        return <AlertLegend />;
      }
      case 'filter': {
        return (
          <div className={cx('AlertNavLegend')}>This is Filters content</div>
        );
      }
      case 'details': {
        return <AlertDetails />;
      }
      default:
        return false;
    }
  };

  render() {
    const { current } = this.props;
    return (
      <div className={cx('AlertNav')}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="legend">Legend</Menu.Item>
          <Menu.Item key="filter">Filters</Menu.Item>
          <Menu.Item key="details">Details</Menu.Item>
        </Menu>
        {this.renderNavContent(current)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current: state.alertNav && state.alertNav.activeItem,
});

export default connect(
  mapStateToProps,
  {
    setActiveItem: setAlertNavActive,
  }
)(AlertNav);

AlertNav.propTypes = {
  current: PropTypes.string,
  setActiveItem: PropTypes.func,
};

AlertNav.defaultProps = {
  current: '',
  setActiveItem: () => {},
};
