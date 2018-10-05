const API = {
  /**
   * Get Alerts
   */
  getAlerts: () =>
    fetch('http://localhost:3000/test-data/alerts.json')
      .then(res => res.json())
      .then(res => res.data),
};

export default API;
