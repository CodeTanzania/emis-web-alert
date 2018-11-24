import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find, remove } from 'lodash';
import { setSeverityFilter } from '../../../actions';

class LegendItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: [] };
  }

  handleOnclick = value => {
    const { selected } = this.state;
    const { setFilter } = this.props;
    setFilter([...selected, value]);
    if (find(selected, value)) {
      const selectedRemoved = remove(selected, data => data === value);
      this.setState({ selected: selectedRemoved });
    } else {
      this.setState({ selected: [...selected, value] });
    }
  };

  render() {
    const { property, value } = this.props;
    return (
      <div
        onClick={() => this.handleOnclick(property)}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
      >
        <i style={{ background: value, opacity: 1 }} />
        <span> {property} </span>
        <br />
      </div>
    );
  }
}

LegendItem.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
  setFilter: PropTypes.arrayOf(PropTypes.string),
};

LegendItem.defaultProps = {
  property: 'no data',
  value: 'no data',
  setFilter: [],
};

const mapDispatchToProps = dispatch => ({
  setFilter: bindActionCreators(setSeverityFilter, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(LegendItem);
