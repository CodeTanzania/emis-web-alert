import React from 'react';
import L from 'leaflet';
import { Row, Col, Button, Icon } from 'antd';
import 'leaflet-draw';
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
      hideAlerts: false,
      map: {}
    }
  }



  // shows interface for new alert
  onclickNewAlertButton = () => {
    console.log('new alert buton clicked');

    L.popup({ minWidth: 450 })
      .setLatLng([-6.179, 35.754])
      .setContent('<h2>Select a Control to Draw on Map </h2>')
      .openOn(this.map);
    this.map.removeLayer(this.alertsGeoJsonLayer);
    this.setState({ hideAlerts: true });

    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: false,
        circlemarker: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });
    this.map.addControl(this.drawControl);

  }



  componentDidMount() {
    API.getAlerts()
      .then(alerts => this.setState({ alerts }));

    this.map = L.map('map', { zoomControl: false }).setView([-6.179, 35.754], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);
    this.alertsGeoJsonLayer = L.geoJSON().addTo(this.map);


    let form = `
    <form id="alert-form">
            Event:<br />
            <input type="text" id="event" />
            <br />
            Urgency: <br />
            <select id="urgency">
                <option value="imediate">Imediate</option>
                <option value="expected">Expected</option>
            </select>
            <br />
            Certainity: <br />
            <select id="certainity">
                <option value="observed">Observed</option>
                <option value="likely">Likely</option>
            </select>
            <br />
            Severity: <br />
            <select id="severity">
                <option value="extreme">Extreme</option>
                <option value="minor">Minor</option>
            </select>
            <br />
            Instructions:<br />
            <textarea rows="4" cols="50" id="instructions"> 
            </textarea>
            <br />
            <button type="submit">save</button>
        </form> 
    `;

    // shows popup when polygon is drawn
    // on map
    this.map.on('draw:created', (e) => {

      let layer = e.layer;
      this.drawnItems.addLayer(layer);
      this.popup = L.popup({ minWidth: 450 })
        .setLatLng(layer.getBounds().getCenter())
        .setContent(form)
        .openOn(this.map);



      document.querySelector("#alert-form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log('click just occured');
        let event = document.getElementById("event").value;
        let urgency = document.getElementById("urgency").value;
        let certainity = document.getElementById("certainity").value;
        let severity = document.getElementById("severity").value;
        let instructions = document.getElementById("instructions").value;
        const area = [layer.toGeoJSON()];
        let alert = { event, urgency, certainity, severity, instructions, area };
        console.log('this is our alert');
        console.log(alert);
        this.map.removeControl(this.drawControl);
        this.map.removeLayer(this.drawnItems);
        this.map.closePopup();
        this.setState({ hideAlerts: false });
        this.map.addLayer(this.alertsGeoJsonLayer);
      });





    });

    this.setState({ map: this.map })


  }

  componentDidUpdate(prevProps, prevState) {
    let geojsonFeature = {
      "type": "Feature",
      "properties": {
          "name": "Coors Field",
          "amenity": "Baseball Stadium",
          "popupContent": "This is where the Rockies play!"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-104.99404, 39.75621]
      }
  };

  let customGeometry = {"type": "", "coordinates": []}
    const { alerts } = this.state;
    if (alerts !== prevState.alerts) {
      alerts.map(({ area }) => {
        let { geometry } = area;
        customGeometry.type =  geometry.type;
        customGeometry.coordinates =  geometry.coordinates;
        geojsonFeature.geometry = customGeometry;
        this.alertsGeoJsonLayer.addData(geojsonFeature);
      })
    }
  }




  render() {
    const { hideAlerts } = this.state;
    return (
      <div>


        <div id="sidebar">
          <Row style={{ padding: "5px", display: hideAlerts ? 'none' : 'block' }}>
            <Col span={8}>
              <Button type="primary" onClick={this.onclickNewAlertButton}>+ New Alert</Button>
            </Col>
            <Col span={8}>
              <Button type="primary"><Icon type="export" theme="outlined" />Export</Button>
            </Col>
            <Col span={4}>
              <Button type="default"><Icon type="table" theme="outlined" /></Button>
            </Col>
            <Col span={4}><Button type="default"><Icon type="caret-up" theme="outlined" /></Button></Col>
          </Row>
        </div>

        <div id="map"></div>
      </div>

    );
  }
}

export default AlertMap;




