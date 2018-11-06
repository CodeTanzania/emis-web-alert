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
  const { area, _id, event } = alert;
  const { geometry, centroid } = area;
  const { category, urgency, severity } = event;
  const properties = { id: _id, category, urgency, severity };
  return {
    type: 'FeatureCollection',
    description: area.description,
    features: [
      {
        type: 'Feature',
        properties,
        geometry,
      },
      {
        type: 'Feature',
        properties,
        geometry: centroid,
      },
    ],
  };
};
export const getAlertsEpic = action$ =>
  action$.pipe(
    ofType(ALERTS_GET_START),
    switchMap(() => from(API.getAlerts())),
    switchMap(alerts =>
      of(alertsStore(alerts.map(alert => alertToGeoJSON(alert))))
    )
  );

export const getAlertEpic = action$ =>
  action$.pipe(
    ofType(ALERT_GET_START),
    switchMap(({ payload }) => {
      const { data } = payload;
      return data ? from(API.getAlert(data)) : of(payload);
    }),
    switchMap(alert => {
      if (!alert.area) {
        return of(alertStore(alert.data));
      }
      const area = alertToGeoJSON(alert);
      return of(alertStore({ ...alert, area }));
    })
  );
