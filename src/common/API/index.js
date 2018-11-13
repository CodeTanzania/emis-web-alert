const API = {
  /**
   * Get Alerts
   */
  getAlerts: () =>
    fetch(`http://192.168.43.78:5000/v1/alerts?limit=50`)
      .then(res => res.json())
      .then(res => res.data),

  /**
   * Get Alert
   */
  getAlert: id =>
    fetch(`http://192.168.43.78:5000/v1/alerts/${id}`).then(res =>
      res.json()
    ),

  /**
   * Create new Alert
   * @param {Object} data alert data to create
   */
  createAlert: data => {
    const url = `http://192.168.43.78:5000/v1/alerts`;
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
