const API = {
  /**
   * Get Alerts
   */
  getAlerts: () =>
    fetch(`https://emis-alert.herokuapp.com/v1/alerts`)
      .then(res => res.json())
      .then(res => res.data),

  /**
   * Get Alert
   */
  getAlert: id =>
    fetch(`https://emis-alert.herokuapp.com/v1/alerts/${id}`).then(res =>
      res.json()
    ),

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
