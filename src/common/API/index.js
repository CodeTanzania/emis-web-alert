const API = {
  /**
   * Get Alerts
   */
  getAlerts: () =>
    fetch(`http://localhost:3000/test-data/alerts.json`)
      .then(res => res.json())
      .then(res => res.data),

  /**
   * Get Alert
   */
  getAlert: () =>
    fetch(`http://localhost:3000/test-data/alert.json`)
      .then(res => res.json())
      .then(res => res.data),

  /**
   * Create new Alert
   * @param {Object} data alert data to create
   */
  createAlert: data => {
    const url = `https://emis-alert.herokuapp.com/v1/alerts`;
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
