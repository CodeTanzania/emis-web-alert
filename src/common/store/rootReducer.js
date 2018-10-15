/**
 * Root Reducer for the application
 */
import { combineReducers } from 'redux';
import alerts from '../../map/reducer';

export default combineReducers({ alerts });