import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import API from '../common/API';

class AlertMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: -6.817523270254579,
      lng: 39.25610303878784,
      zoom: 13,
      alerts: [],
      geoJsonData: []
    }
  }


  // converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinates
  stringToArrayCoordinates = (stringCoordinates) => {
    const polygon_array = [];
    const splitCoordinates = stringCoordinates.trim().split(' ')
    for (let splitCoordinate of splitCoordinates) {
      polygon_array.push(
        splitCoordinate.split(',').map(value => parseFloat(value))
      )
    }

    return [polygon_array];
  }


  // creates Array of polygons
  generateGeoJson = (alerts) => {
    let polygon = []
    let geoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": []
          }
        }
      ]
    }

    for (let alert of alerts) {
      geoJson.features[0].geometry.coordinates = this.stringToArrayCoordinates(alert.area.polygon)
      polygon.push(geoJson);
    }

    return polygon;
  }
  rendePolygons = (data) => data.map(obj => <GeoJSON data={obj} />)
  componentDidMount() {
    API.getAlerts()
      .then(alerts => this.setState({ alerts }));
  }
  render() {
    const { alerts } = this.state;
    const data = this.generateGeoJson(alerts);
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.rendePolygons(data)}
      </Map>
    );
  }
}

export default AlertMap;