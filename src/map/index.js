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
// import WrappedAlertFilter from './components/alertFilter';

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
      alerts: [],
      position: {},
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

    API.getAlerts().then(res => {
      const alerts = res.map(({ info }) => {
        const { polygon } = info.area;
        return {
          area: {
            geometry: {
              type: 'Polygon',
              coordinates: this.stringToArrayCoordinates(polygon),
            },
          },
        };
      });
      console.log('looking at Alerts');
      console.log(alerts);
      this.setState({ alerts });
    });

    this.map = this.mapRef.current.leafletElement;

    this.alertsLayer = L.geoJSON().addTo(this.map);

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
    const { alerts } = this.state;
    if (alerts !== prevState.alerts) {
      alerts.map(({ area }) =>
        this.alertsLayer.addData({ ...area, type: 'Feature' })
      );
    }
  }

  // converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinate arrays
  stringToArrayCoordinates = stringCoordinates => {
    const splitCoordinates = stringCoordinates.trim().split(' ');
    const coord = splitCoordinates.map(splitCoordinate =>
      splitCoordinate
        .split(',')
        .reverse()
        .map(value => parseFloat(value))
    );
    return [coord];
  };

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
    this.map.removeLayer(this.alertsLayer);
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

  closePopup = () => {
    this.map.removeControl(this.drawControl);
    this.map.removeLayer(this.drawnItems);
    this.map.addLayer(this.alertsLayer);
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
        <div id="alert-actions">
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
        <div id="filters-header">
          <Row>
            <Col span={2}>
              <Icon
                type="caret-right"
                style={{ fontSize: '26px', paddingTop: '10px' }}
                theme="outlined"
              />
            </Col>
            <Col span={22}>
              <h1>Filter Alerts</h1>
            </Col>
          </Row>
        </div>
        {/* <div id="filters">
          <WrappedAlertFilter />
        </div> */}

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
