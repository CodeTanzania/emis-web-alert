/* eslint no-underscore-dangle: "off" */
import {
  ALERTS_STORE,
  ALERT_STORE,
  FILTER_SET_SEVERITY,
  ALERT_NAV_SET_ACTIVE,
  FILTER_SET_DATE_RANGE,
  ALERT_CREATE_ERROR,
  ALERT_CREATE_SUCCESS,
  ALERT_CREATE_START,
  ALERTS_GET_START,
  ALERT_GET_START
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
    case ALERTS_GET_START: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}

export function alert(state = {isGettingAlert: false}, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_STORE: {
      return { ...state, ...payload };
    }

    case ALERT_GET_START: {
      return { ...state, ...payload };
    }

    case ALERT_CREATE_START: {
      return { ...state, ...payload };
    }

    case ALERT_CREATE_SUCCESS: {
      return { ...state, ...payload };
    }

    case ALERT_CREATE_ERROR: {
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

export function alertNav(state = { activeItem: 'filter' }, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_NAV_SET_ACTIVE: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}
