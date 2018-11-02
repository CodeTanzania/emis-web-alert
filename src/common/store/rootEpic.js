/**
 * Root epics for react observables
 */
import { combineEpics } from 'redux-observable';
import { getAlertsEpic, getAlertEpic } from '../../map/epics';

export default combineEpics(getAlertsEpic, getAlertEpic);
