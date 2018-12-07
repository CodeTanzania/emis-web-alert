/**
 * Root Reducer for the application
 */
import { combineReducers } from 'redux';
import * as reducers from '../../Alerts/reducer';

export default combineReducers({ ...reducers });
