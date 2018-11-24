/* eslint no-underscore-dangle: "off" */
import { ALERTS_STORE, ALERT_STORE, FILTER_SET_SEVERITY } from './actions';

export function alerts(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERTS_STORE: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}

export function alert(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_STORE: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}

export function filter(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case FILTER_SET_SEVERITY: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}
