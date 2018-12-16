import axios from 'axios';

const API_END_POINT = `https://emis-plan.herokuapp.com/v1`;

/**
 * Initialize axios library
 *
 * Add headers to HTTP requests that sent to the server
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const Axios = axios.create({
  baseURL: `${API_END_POINT}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const generateFiter = (severityData, dates) => {
  let filter = {};

  if (severityData.length > 0) {
    const severity = { $in: severityData };
    filter = { ...filter, severity };
  }

  if (dates.length > 0) {
    const expectedAt = { $gte: dates[0], $lt: dates[1] };
    filter = { ...filter, expectedAt };
  }

  return filter;
};

const API = {
  /**
   * Get Alerts
   */
  getAlerts: ({ severity, dates } = {}) => {
    const filter = generateFiter(severity, dates);

    return Axios.get(`/alerts`, { params: { filter, limit: 100 } })
      .then(res => res.data)
      .then(res => res.data);
  },

  /**
   * Get Alert
   */
  getAlert: id =>
    fetch(`${API_END_POINT}/alerts/${id}`).then(res => res.json()),

  /**
   * Create new Alert
   * @param {Object} data alert data to create
   */
  createAlert: data => {
    const url = `${API_END_POINT}/alerts`;
    const config = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    };
    return fetch(url, config).then(res => res.json());
  },
};

export default API;
