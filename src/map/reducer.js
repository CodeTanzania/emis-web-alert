/* eslint no-underscore-dangle: "off" */
import {
  ALERTS_STORE,
  ALERT_STORE,
  FILTER_SET_SEVERITY,
  ALERT_NAV_SET_ACTIVE,
  FILTER_SET_DATE_RANGE,
} from './actions';

const initialFilter = {
  severity: [],
  dates: [],
};
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

export function filter(state = initialFilter, action) {
  const { type, payload } = action;
  switch (type) {
    case FILTER_SET_SEVERITY: {
      const severity = payload;
      return { ...state, severity };
    }
    case FILTER_SET_DATE_RANGE: {
      const dates = payload;
      return { ...state, dates };
    }
    default:
      return state;
  }
}

export function alertNav(state = { activeItem: 'legend' }, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_NAV_SET_ACTIVE: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}
