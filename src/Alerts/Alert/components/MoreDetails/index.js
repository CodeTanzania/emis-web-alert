import { connect } from 'react-redux';
import MoreDetails from './MoreDetails';
import { getAlertDetailsOperation } from '../../../epics';

const mapStateToProps = state => ({
  alert: state.alert.data ? state.alert.data : {},
});
const mapDispatchToProps = {
  getAlert: getAlertDetailsOperation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoreDetails);
