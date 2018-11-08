/* eslint no-console: "off" */
import {
  alertsGetStart,
  alertGetStart,
  alertsStore,
  alertStore,
} from './actions';
import { alertToGeoJSON } from '../common/lib/util';


export const getAlertsOperation = () => (dispatch, getState, { API }) => {
  dispatch(alertsGetStart());
  API.getAlerts()
    .then(alerts => dispatch(alertsStore(alerts.map(alert => alertToGeoJSON(alert)))));
}

export const getAlertOperation = (id = null) => (dispatch, getState, { API }) => {
  dispatch(alertGetStart(id));
  if (id) {
    API.getAlert(id)
      .then(alert => {
        const area = alertToGeoJSON(alert);
        dispatch(alertStore({ ...alert, area }));
      });
  }
  else {
    dispatch(alertStore(alert.data));
  }
}