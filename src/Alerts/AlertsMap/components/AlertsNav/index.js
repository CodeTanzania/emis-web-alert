import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Menu } from 'antd';
import { setAlertNavActive } from '../../../actions';
import AlertDetails from '../AlertDetails';
import AlertLegend from '../AlertLegend';
import AlertFilter from '../AlertFilter';
import { alertPropTypes } from '../../../../common/lib/propTypesUtil';

import styles from './styles.css';

// constants
const cx = classnames.bind(styles);

class AlertsNav extends React.Component {
  handleClick = e => {
    const { setActiveItem } = this.props;
    setActiveItem(e.key);
  };

  renderNavContent = current => {
    switch (current) {
      case 'filter': {
        return <AlertFilter />;
      }
      case 'details': {
        return <AlertDetails />;
      }
      default:
        return false;
    }
  };

  render() {
    const { current, hideNav, selected } = this.props;
    return !hideNav ? (
      <div className={cx('AlertsNav')}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="filter">Filters</Menu.Item>
          {selected ? <Menu.Item key="details">Details</Menu.Item> : null}
        </Menu>
        <div>{this.renderNavContent(current)}</div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  current: state.alertNav && state.alertNav.activeItem,
  selected: state.alert && state.alert ? state.alert.data : null,
});

export default connect(
  mapStateToProps,
  {
    setActiveItem: setAlertNavActive,
  }
)(AlertsNav);

AlertsNav.propTypes = {
  current: PropTypes.string,
  hideNav: PropTypes.bool.isRequired,
  setActiveItem: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
};

AlertsNav.defaultProps = {
  current: '',
  selected: null,
  setActiveItem: () => {},
};
