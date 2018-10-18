/* eslint no-console: "off" */
import { ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ALERTS_GET_START,
  ALERT_GET_START,
  alertsStore,
  alertStore,
} from './actions';
import API from '../common/API/index';

export const getAlertsEpic = action$ =>
  action$.pipe(
    ofType(ALERTS_GET_START),
    switchMap(() => from(API.getAlerts())),
    switchMap(data => of(alertsStore(data)))
  );

export const getAlertEpic = action$ =>
  action$.pipe(
    ofType(ALERT_GET_START),
    switchMap(() => from(API.getAlert())),
    switchMap(data => of(alertStore(data)))
  );
