import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col, Button } from 'antd';
import L from 'leaflet';
import 'leaflet-draw';
import { isEmpty, get } from 'lodash';
import * as ReactLeaflet from 'react-leaflet';
import { getAlertsOperation, getAlertOperation } from './epics';
import WrappedAlertForm from './components/form';
import AlertDetails from './components/alertDetails';
import { selectIcon } from '../common/lib/util';

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
    };

    this.mapRef = React.createRef();
    this.closePopup = this.closePopup.bind(this);
  }

  generateMarkerIcon = (fillColor = '#93c47d') => {
    const svg = `<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.54 566.93">
    <defs>
      <style>
        .cls-1 {
          fill: ${fillColor};
        }
      </style>
    </defs>
    <title>Severity-Minor</title>
    <path class="cls-1" d="M198.43,17.57A160.05,160.05,0,0,0,54.1,246.69c.56,1.19,144.33,282.88,144.33,282.88L341,250.19A160,160,0,0,0,198.43,17.57Zm0,256a96,96,0,1,1,96-96A96,96,0,0,1,198.43,273.57Z"/>
    </svg>
    `;

    const CustomIcon = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
      }
    });

    const iconUrl = encodeURI("data:image/svg+xml," + svg).replace('#', '%23');
    const icon = new CustomIcon({ iconUrl })
    return icon;
  }
  componentDidMount() {

    const { startGetAlerts } = this.props;
    startGetAlerts();

    // L.Marker.prototype.options.icon = this.generateMarkerIcon();

    this.map = this.mapRef.current.leafletElement;

    this.alertsLayer = L.geoJSON([], {
      filter: this.geoJsonFilter,
      pointToLayer: this.showMarkers,
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

    L.control
      .zoom({
        position: 'bottomright',
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

  componentDidUpdate(prevProps) {
    const { alerts, selected, startGetAlerts } = this.props;
    if (alerts !== prevProps.alerts) {
      alerts.map(alert => this.alertsLayer.addData(alert));
      this.map.setView([-6.179, 35.754], 7 );
      this.map.flyTo([-6.179, 35.754]);
    }

    if (selected && selected !== prevProps.selected) {
      const { area } = selected;
      this.selectedAlertLayer = L.geoJSON([area], {
        filter: this.filterFeatures,
        style: this.styleFeatures,
      }).addTo(this.map);
      this.selectedAlertLayer.on('remove', () => {
        this.alertsLayer.addTo(this.map);
      });
      this.map.flyToBounds(this.selectedAlertLayer.getBounds())
      this.map.fitBounds(this.selectedAlertLayer.getBounds());
    } else if (selected !== prevProps.selected) {
      this.map.removeLayer(this.selectedAlertLayer);
      startGetAlerts();
    }
  }

  showMarkers = (feature, latlng) => {
    const { properties } = feature;
    const { color } = properties;
    const customIcon = this.generateMarkerIcon(color)

    return L.marker(latlng, { icon: customIcon });
  };

  geoJsonFilter = feature => {
    const { geometry } = feature;
    const { type } = geometry;
    switch (type) {
      case 'Point': {
        return true;
      }
      default:
        return false;
    }
  };

  filterFeatures = feature => {
    const { geometry } = feature;
    const { type } = geometry;
    switch (type) {
      case 'Polygon': {
        return true;
      }
      default:
        return false;
    }
  };

  styleFeatures = feature => {
    const { geometry, properties } = feature;
    const { color } = properties;
    const { type } = geometry;
    if (type === 'Polygon' || 'MultiPolygon') {
      return { color };
    }

    return {};
  };

  onEachFeature = (feature, layer) => {
    const { geometry } = feature;
    const { type } = geometry;
    switch (type) {
      case 'Point': {
        layer.on({ click: this.onclickGeoJson });
        return true;
      }
      default:
        return false;
    }
  };

  showAlertMarkers = (feature, latlng) => {
    const { properties } = feature;
    const { severity } = properties;
    const customIcon = L.icon({
      iconUrl: selectIcon(severity),
      iconSize: [30, 30], // size of the icon
    });

    return L.marker(latlng, { icon: customIcon });
  };

  onclickGeoJson = e => {
    const id = get(e, 'target.feature.properties.id');
    const { startGetAlert } = this.props;
    this.map.removeLayer(this.alertsLayer);
    startGetAlert(id);
  };

  renderAlertActions = hideAlerts =>
    !hideAlerts ? (
      <div id="sidebar">
        <Row style={{ padding: '5px' }}>
          <Col span={24}>
            <Button type="primary" onClick={this.onclickNewAlertButton}>
              + New Alert
            </Button>
          </Col>
        </Row>
      </div>
    ) : null;

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
    const { selected, startGetAlert } = this.props;
    const position = [-6.179, 35.754];
    return (
      <div>
        {this.renderAlertActions(hideAlerts)}
        <AlertDetails selected={selected} unSelectAlert={startGetAlert} />

        <LeafletMap
          center={position}
          zoom={7}
          zoomControl={false}
          ref={this.mapRef}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            id="mapbox.light"
            url="https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid29ybGRiYW5rLWVkdWNhdGlvbiIsImEiOiJIZ2VvODFjIn0.TDw5VdwGavwEsch53sAVxA#1.6/23.725906/-39.714135/0"
          />

          {this.showPopup()}
        </LeafletMap>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts && state.alerts ? state.alerts.data : [],
  selected: state.alert && state.alert ? state.alert.data : null,
});

export default connect(
  mapStateToProps,
  {
    startGetAlerts: getAlertsOperation,
    startGetAlert: getAlertOperation,
  }
)(AlertMap);

const geometry = PropTypes.shape({
  type: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
}).isRequired;
const feature = PropTypes.shape({
  type: PropTypes.string,
  properties: PropTypes.shape({ id: PropTypes.string }),
  geometry,
});

const sourcePropTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
};

const eventPropTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  urgency: PropTypes.string,
  severity: PropTypes.string,
  certainty: PropTypes.string,
  response: PropTypes.string,
};

const messagePropTpes = {
  status: PropTypes.string,
  type: PropTypes.string,
  scope: PropTypes.string,
  restriction: PropTypes.string,
  addresses: PropTypes.arrayOf(PropTypes.string),
  code: PropTypes.string,
  note: PropTypes.string,
  headline: PropTypes.string,
  instruction: PropTypes.string,
  website: PropTypes.string,
};

const areaPropTypes = {
  type: PropTypes.string,
  features: PropTypes.arrayOf(feature),
};

const resourcePropTypes = {
  description: PropTypes.string,
  mime: PropTypes.string,
  uri: PropTypes.string,
};

const alertPropTypes = {
  source: PropTypes.shape({ sourcePropTypes }),
  event: PropTypes.shape({ eventPropTypes }),
  message: PropTypes.shape({ messagePropTpes }),
  area: PropTypes.shape({ areaPropTypes }),
  resources: PropTypes.shape({ resourcePropTypes }),
  reportedAt: PropTypes.string,
  expectedAt: PropTypes.string,
  expiredAt: PropTypes.string,
  occuredAt: PropTypes.string,
  endedAt: PropTypes.string,
  direction: PropTypes.string,
  _id: PropTypes.string,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
};
AlertMap.propTypes = {
  startGetAlerts: PropTypes.func,
  startGetAlert: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
  alerts: PropTypes.arrayOf(PropTypes.shape(alertPropTypes)),
};

AlertMap.defaultProps = {
  startGetAlerts: () => { },
  startGetAlert: () => { },
  alerts: [],
  selected: null,
};
