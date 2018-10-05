import React from 'react';
import L from 'leaflet';
import { Row, Col, Button, Icon } from 'antd';
import 'leaflet-draw';
import { isEmpty } from 'lodash';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ReactLeaflet from 'react-leaflet';
import API from '../common/API';
import WrappedAlertForm from './components/form';
const { Map: LeafletMap, TileLayer, Popup } = ReactLeaflet



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
      area: {},
      hideAlerts: false,
      position: {},
      polygons: [],
      map: {}
    }

    this.closePopup = this.closePopup.bind(this);
  }


  // this shows popup on map
  showPopup() {
    const { position, area } = this.state;
    if (!isEmpty(position)) {
      return (
        <Popup position={position} minWidth={400}>
          <WrappedAlertForm area={area} closePopup={this.closePopup} />
        </Popup>
      );
    }

  }

  // shows interface for new alert
  onclickNewAlertButton = () => {

    const popupContent = `<div>
    <div class="ant-modal-body">
        <h2>To create new Alert, Draw the area that is involved  in the Alert</h2>
    </div>
    <div class="ant-modal-footer">
        <div>
            <button type="button" id="info-button" class="ant-btn ant-btn-primary"><span>OK</span></button>
        </div>
    </div>
</div>`

    L.popup({ minWidth: 450 })
      .setLatLng([-6.179, 35.754])
      .setContent(popupContent)
      .openOn(this.map);
    this.map.removeLayer(this.polygon);
    this.setState({ hideAlerts: true });

    document.querySelector("#info-button").addEventListener("click", (e) => {
      e.preventDefault();
      this.map.closePopup();
    });


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

  // converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinate arrays
  stringToArrayCoordinates = (stringCoordinates) => {
    const splitCoordinates = stringCoordinates.trim().split(' ');
    return splitCoordinates.map(splitCoordinate =>
      splitCoordinate.split(',').map(value => parseFloat(value)))
  }


  closePopup = () => {
    this.map.removeControl(this.drawControl);
    this.map.removeLayer(this.drawnItems);
    this.map.addLayer(this.polygon);
    this.setState({ hideAlerts: false });
    this.map.closePopup()
  };

  componentDidMount() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    API.getAlerts()
      .then(alerts => {
        const polygons = alerts.map(alert => this.stringToArrayCoordinates(alert.area.polygon));
        return this.setState({ alerts, polygons })
      });

    this.map = this.refs.map.leafletElement;

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    // shows popup when polygon is drawn
    // on map
    this.map.on('draw:created', (e) => {

      let layer = e.layer;
      this.drawnItems.addLayer(layer);
      console.log('this is supposed to be the value of the position');
      console.log(layer.getBounds().getCenter());
      const area = layer.toGeoJSON().geometry;
      console.log('this is the area');
      console.log(area);
      this.setState({ position: layer.getBounds().getCenter(), area });





    });

    this.setState({ map: this.map })


  }

  componentDidUpdate(prevProps, prevState) {
    const { polygons, hideAlerts } = this.state;
    if (this.state.polygons !== prevState.polygons) {
      // create a red polygon from an array of LatLng points
      var latlngs = this.state.polygons;
      this.polygon = L.polygon(latlngs, { color: 'red' }).addTo(this.map);
    }
  }




  render() {
    const { hideAlerts } = this.state;
    const position = [-6.179, 35.754];
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

        <LeafletMap center={position} zoom={7} zoomControl={false} ref='map'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.showPopup()}
        </LeafletMap>
      </div>

    );
  }
}

export default AlertMap;




