/**
 * Root Reducer for the application
 */
import { combineReducers } from 'redux';
import * as reducers from '../../map/reducer';

export default combineReducers({ ...reducers });
