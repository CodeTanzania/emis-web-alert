import React, { Component } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import API from '../common/API';

class AlertMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: -6.817523270254579,
      lng: 39.25610303878784,
      zoom: 6,
      alerts: [],
      geoJsonData: []
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
      .then(alerts => this.setState({ alerts }));
  }
  render() {
    const { alerts } = this.state;
    const data = alerts.map(alert => this.stringToArrayCoordinates(alert.area.polygon))
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={data} />
      </Map>
    );
  }
}

export default AlertMap;