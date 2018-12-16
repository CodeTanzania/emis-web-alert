import { connect } from 'react-redux';
import AlertActions from './AlertActions';

const mapStateToProps = state => ({
  alert: state.alert.data ? state.alert.data : {},
});

export default connect(
  mapStateToProps
)(AlertActions);
