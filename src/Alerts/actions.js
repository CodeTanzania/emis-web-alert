export const ALERTS_GET_START = 'ALERTS_GET_START';
export const ALERT_GET_START = 'ALERT_GET_START';
export const ALERTS_STORE = 'ALERTS_STORE';
export const ALERT_STORE = 'ALERT_STORE';
export const MAP_SET_POSITION = 'MAP_SET_POSITION';
export const FILTER_SET_SEVERITY = 'FILTER_SET_SEVERITY';
export const FILTER_SET_DATE_RANGE = 'FILTER_SET_DATE_RANGE';
export const ALERT_NAV_SET_ACTIVE = 'ALERT_NAV_SET_ACTIVE';
export const ALERT_CREATE_START = 'ALERT_CREATE_START';
export const ALERT_CREATE_SUCCESS = 'ALRERT_CREATE_SUCCESS';
export const ALERT_CREATE_ERROR = 'ALERT_CREATE_ERROR';

export const alertsGetStart = (isGettingAlerts = true) => ({
  type: ALERTS_GET_START,
  payload: { isGettingAlerts },
});

export const alertsStore = alerts => ({
  type: ALERTS_STORE,
  payload: {
    data: alerts,
  },
});

export const alertStore = alert => ({
  type: ALERT_STORE,
  payload: {
    data: alert,
  },
});

export const alertGetStart = (isGettingAlert = true) => ({
  type: ALERT_GET_START,
  payload: { isGettingAlert },
});

export const setSeverityFilter = severity => ({
  type: FILTER_SET_SEVERITY,
  payload: severity,
});

export const setDateRageFilter = dates => ({
  type: FILTER_SET_DATE_RANGE,
  payload: dates,
});

export const setAlertNavActive = activeItem => ({
  type: ALERT_NAV_SET_ACTIVE,
  payload: { activeItem },
});

export const startCreateAlert = (startCreate = true) => ({
  type: ALERT_CREATE_START,
  payload: { startCreate },
});

export const createAlertSuccess = created => ({
  type: ALERT_CREATE_SUCCESS,
  payload: { created },
});

export const createAlertError = error => ({
  type: ALERT_CREATE_ERROR,
  payload: { error },
});
