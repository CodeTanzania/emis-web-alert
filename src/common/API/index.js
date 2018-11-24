import axios from 'axios';

const API_END_POINT = `https://emis-alert.herokuapp.com/v1`;

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

const API = {
  /**
   * Get Alerts
   */
  getAlerts: (severity = []) => {
    const filter = {
      severity: { $in: severity },
    };

    const params = severity.length > 0 ? { filter } : {};

    return Axios.get(`/alerts`, { params })
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
    const url = `${API_END_POINT}/v1/alerts`;
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
