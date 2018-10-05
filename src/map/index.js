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

const { Map: LeafletMap, TileLayer, Popup } = ReactLeaflet;

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
    super(props);
    this.state = {
      area: {},
      hideAlerts: false,
      position: {},
      polygons: [],
    };

    this.mapRef = React.createRef();
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    API.getAlerts().then(alerts => {
      const polygons = alerts.map(alert =>
        this.stringToArrayCoordinates(alert.area.polygon)
      );
      return this.setState({ polygons });
    });

    this.map = this.mapRef.current.leafletElement;

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(this.map);

    // shows popup when polygon is drawn
    // on map
    this.map.on('draw:created', e => {
      const { layer } = e;
      this.drawnItems.addLayer(layer);
      const area = layer.toGeoJSON().geometry;
      this.setState({ position: layer.getBounds().getCenter(), area });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { polygons } = this.state;
    if (polygons !== prevState.polygons) {
      // create a red polygon from an array of LatLng points
      const latlngs = polygons;
      this.polygon = L.polygon(latlngs, { color: 'red' }).addTo(this.map);
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
</div>`;

    L.popup({ minWidth: 450 })
      .setLatLng([-6.179, 35.754])
      .setContent(popupContent)
      .openOn(this.map);
    this.map.removeLayer(this.polygon);
    this.setState({ hideAlerts: true });

    document.querySelector('#info-button').addEventListener('click', e => {
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
        featureGroup: this.drawnItems,
      },
    });
    this.map.addControl(this.drawControl);
  };

 

  // converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinate arrays
  stringToArrayCoordinates = stringCoordinates => {
    const splitCoordinates = stringCoordinates.trim().split(' ');
    return splitCoordinates.map(splitCoordinate =>
      splitCoordinate.split(',').map(value => parseFloat(value))
    );
  };

  closePopup = () => {
    this.map.removeControl(this.drawControl);
    this.map.removeLayer(this.drawnItems);
    this.map.addLayer(this.polygon);
    this.setState({ hideAlerts: false });
    this.map.closePopup();
  };

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
    return null;
  }

  render() {
    const { hideAlerts } = this.state;
    const position = [-6.179, 35.754];
    return (
      <div>
        <div id="sidebar">
          <Row
            style={{ padding: '5px', display: hideAlerts ? 'none' : 'block' }}
          >
            <Col span={8}>
              <Button type="primary" onClick={this.onclickNewAlertButton}>
                + New Alert
              </Button>
            </Col>
            <Col span={8}>
              <Button type="primary">
                <Icon type="export" theme="outlined" />
                Export
              </Button>
            </Col>
            <Col span={4}>
              <Button type="default">
                <Icon type="table" theme="outlined" />
              </Button>
            </Col>
            <Col span={4}>
              <Button type="default">
                <Icon type="caret-up" theme="outlined" />
              </Button>
            </Col>
          </Row>
        </div>

        <LeafletMap
          center={position}
          zoom={7}
          zoomControl={false}
          ref={this.mapRef}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.showPopup()}
        </LeafletMap>
      </div>
    );
  }
}

export default AlertMap;
