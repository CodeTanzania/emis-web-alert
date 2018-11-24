export const ALERTS_GET_START = 'ALERTS_GET_START';
export const ALERT_GET_START = 'ALERT_GET_START';
export const ALERTS_STORE = 'ALERTS_STORE';
export const ALERT_STORE = 'ALERT_STORE';
export const MAP_SET_POSITION = 'MAP_SET_POSITION';
export const FILTER_SET_SEVERITY = 'FILTER_SET_SEVERITY';

export const alertsGetStart = () => ({ type: ALERTS_GET_START });

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
export const alertGetStart = (id = null) => ({
  type: ALERT_GET_START,
  payload: {
    data: id,
  },
});

export const setSeverityFilter = severity => ({
  type: FILTER_SET_SEVERITY,
  payload: { severity },
});
