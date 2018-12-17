import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Checkbox, Collapse, DatePicker } from 'antd';
import { setSeverityFilter, setDateRageFilter } from '../../../actions';
import { getAlertsOperation } from '../../../epics';
import styles from './styles.css';

// constants
const cx = classnames.bind(styles);
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

class WrappedAlertFilter extends React.Component {
  onChangeSeverity = checkedValues => {
    const { updateFilter, refreshMap } = this.props;
    updateFilter(checkedValues);
    refreshMap();
  };

  onDateChangeChange = dateString => {
    const { updateDateRengeFilter, refreshMap } = this.props;
    const formatedDate = dateString.map(date => date.toISOString());
    updateDateRengeFilter(formatedDate);
    refreshMap();
  };

  render() {
    const { filter } = this.props;
    const { severity } = filter;
    return (
      <div className={cx('AlertFilter')}>
        <div className={cx('AlertFilterDates')}>
          <div>View Alerts Expected Within:</div>
          <RangePicker
            style={{ width: 'auto' }}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onChange={this.onDateChangeChange}
          />
        </div>
        <Collapse
          accordion
          defaultActiveKey={['1']}
          style={{
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
        >
          <Panel header="SEVERITY" key="1">
            <Checkbox.Group
              onChange={this.onChangeSeverity}
              defaultValue={severity}
            >
              <Checkbox className="Extreme" value="Extreme">Extreme</Checkbox>
              <Checkbox className="Severe" value="Severe">Severe</Checkbox>
              <Checkbox className="Moderate" value="Moderate">Moderate</Checkbox>
              <Checkbox className="Minor" value="Minor">Minor</Checkbox>
              <Checkbox className="Unknown" value="Unknown">Unknown</Checkbox>
            </Checkbox.Group>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

const AlertFilter = Form.create()(WrappedAlertFilter);

const mapStateToProps = state => ({
  filter: state.filter,
});

export default connect(
  mapStateToProps,
  {
    updateFilter: setSeverityFilter,
    refreshMap: getAlertsOperation,
    updateDateRengeFilter: setDateRageFilter,
  }
)(AlertFilter);

WrappedAlertFilter.propTypes = {
  updateFilter: PropTypes.func,
  updateDateRengeFilter: PropTypes.func,
  refreshMap: PropTypes.func,
  filter: PropTypes.arrayOf(PropTypes.string),
};

WrappedAlertFilter.defaultProps = {
  updateFilter: () => { },
  refreshMap: () => { },
  updateDateRengeFilter: () => { },
  filter: [],
};
