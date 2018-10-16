/* eslint no-console: "off" */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TEST, startGetAlerts } from './actions';

export const testEpic = action$ =>
  action$.pipe(
    ofType(TEST),
    switchMap(() => of(startGetAlerts()))
  );

export const getAlertsEpic = () => {};
