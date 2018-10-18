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

const alertToGeoJSON = alert => {
 
  const { area, _id } = alert;
  const { geometry, centroid } = area;
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { id: _id },
        geometry: geometry
      },
      {
        type: 'Feature',
        properties: { id: _id },
        geometry: centroid
      }
    ],
  }
}
export const getAlertsEpic = action$ =>
  action$.pipe(
    ofType(ALERTS_GET_START),
    switchMap(() => from(API.getAlerts())),
    switchMap(alerts => of(alertsStore(alerts.map ( alert => alertToGeoJSON(alert)))))
  );

export const getAlertEpic = action$ =>
  action$.pipe(
    ofType(ALERT_GET_START),
    switchMap( ({ payload }) =>{
      const { data } = payload;
      return from(API.getAlert(data))
    }),
    switchMap(alert => of(alertStore(alertToGeoJSON(alert))))
  );
