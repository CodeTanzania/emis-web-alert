
const API = {
  /**
   * Get Alerts
   */
  getAlerts: () =>
    fetch('https://emis-web-alerts.herokuapp.com/test-data/alerts.json')
    .then(res => res.json())
    .then(res => res.data),
};

export default API;