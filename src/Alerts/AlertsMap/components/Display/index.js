import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import { Select } from 'antd';
import { setDateRageFilter } from '../../../actions';
import { humanTimeToday } from '../../../../common/lib/util';
import { getAlertsOperation } from '../../../epics';
import './styles.css';

const { Option } = Select;

function Display(props) {
  const handleChange = ({ key }) => {
    const { getalerts, setCurrentDate } = props;

    if (key === 'all') {
      setCurrentDate([]);
    }

    if (key === 'current') {
      const today = moment().toISOString();
      const future = moment()
        .add(1, 'year')
        .toISOString();
      const dateRange = [today, future];
      setCurrentDate(dateRange);
    }

    getalerts();
  };

  return (
    <div className="Display">
      <Select
        labelInValue
        defaultValue={{ key: 'current' }}
        onChange={handleChange}
      >
        <Option value="all">Display: All Alerts</Option>
        <Option value="current">{`Display: Today (${humanTimeToday()}) and on wards`}</Option>
      </Select>
    </div>
  );
}

const mapDispatchToProps = {
  getalerts: getAlertsOperation,
  setCurrentDate: setDateRageFilter,
};

export default connect(
  null,
  mapDispatchToProps
)(Display);

Display.propTypes = {
  getalerts: PropTypes.func,
  setCurrentDate: PropTypes.func,
};

Display.defaultProps = {
  getalerts: () => {},
  setCurrentDate: () => {},
};
