import React from 'react';
import L from 'leaflet';
import API from '../common/API';
/**
 * Alerts Map  component
 * This component will provide Map visulization for Alerts
 *
 * @function
 * @name AlertMap
 *
 * @version 0.1.0
 * @since 0.1.0
 */

class AlertMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alerts: [],
      polygons: []
    }
  }

// converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinates
  stringToArrayCoordinates = (stringCoordinates) => {
    const splitCoordinates = stringCoordinates.trim().split(' ');
    return splitCoordinates.map(splitCoordinate => 
      splitCoordinate.split(',').map(value => parseFloat(value)))
  }


  componentDidMount() {
    API.getAlerts()
    .then(alerts => {
      const polygons = alerts.map(alert => this.stringToArrayCoordinates(alert.area.polygon));
      return this.setState({ alerts, polygons })
    });
    // create map
    this.map = L.map('map', {
      center: [-6.179, 35.754],
      zoom: 7,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.polygons !== prevState.polygons) {
       // create a red polygon from an array of LatLng points
    var latlngs = this.state.polygons;
    this.polygon = L.polygon(latlngs, { color: 'red' }).addTo(this.map);
    }
  }




  render() {
    return <div id="map"></div>
  }
}

export default AlertMap;