/**
 * Root Reducer for the application
 */
import { combineReducers } from 'redux';
import { alerts, alert} from '../../map/reducer';

export default combineReducers({ alerts, alert });
