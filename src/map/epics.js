/* eslint no-console: "off" */

import { get } from 'lodash';
import {
  alertsGetStart,
  alertGetStart,
  alertsStore,
  alertStore,
} from './actions';
import { alertToGeoJSON } from '../common/lib/util';

export const getAlertsOperation = () => (dispatch, getState, { API }) => {
  const state = getState();
  const filter = get(state, 'filter');

  dispatch(alertsGetStart());
  API.getAlerts(filter).then(alerts =>
    dispatch(alertsStore(alerts.map(alert => alertToGeoJSON(alert))))
  );
};

export const getAlertOperation = (id = null) => (
  dispatch,
  getState,
  { API }
) => {
  dispatch(alertGetStart(id));
  if (id) {
    API.getAlert(id).then(alert => {
      const area = alertToGeoJSON(alert);
      dispatch(alertStore({ ...alert, area }));
    });
  } else {
    dispatch(alertStore(alert.data));
  }
};
