/**
 * Root epics for react observables
 */
import { combineEpics } from 'redux-observable';
import { testEpic } from '../../map/epics';

export default combineEpics(testEpic);
