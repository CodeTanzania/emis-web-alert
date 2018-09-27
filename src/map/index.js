import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css';
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
  // to an array of coordinate arrays
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

    this.map = L.map('map').setView([-6.179, 35.754], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    
    
    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      polyline: false,
      circle: false, // Turns off this drawing tool
      rectangle: false,
      marker: false,
        edit: {
            featureGroup: this.drawnItems
        }
    });
    this.map.addControl(this.drawControl);
    this.map.on('draw:created', (e) => {
      let layer = e.layer;
      this.drawnItems.addLayer(layer);
      L.popup()
      .setLatLng(layer.getBounds().getCenter())
      .setContent('Add form for new Alert here')
      .openOn(this.map);
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