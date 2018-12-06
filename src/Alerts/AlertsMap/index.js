import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col, Button, Icon } from 'antd';
import L from 'leaflet';
import 'leaflet-draw';
import { get } from 'lodash';
import * as ReactLeaflet from 'react-leaflet';
import { getAlertsOperation, getAlertOperation } from './epics';
import { setAlertNavActive } from './actions';
import WrappedAlertForm from './components/form';
import AlertNav from './components/AlertNav';
import { alertPropTypes } from '../../common/lib/propTypesUtil';
import {
  baseMaps,
  showMarkers,
  styleFeatures,
  geoJsonFilter,
  filterFeatures,
  popupContent,
} from '../../common/lib/mapUtil';

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
      isPopupOPen: false,
      position: {},
    };

    this.mapRef = React.createRef();
    this.closePopup = this.closePopup.bind(this);
    this.removeDrawnAlert = this.removeDrawnAlert.bind(this);
  }

  componentDidMount() {
    const { startGetAlerts } = this.props;
    startGetAlerts();
    this.initializeMap();
  }

  componentDidUpdate(prevProps) {
    const { alerts, selected } = this.props;
    if (alerts !== prevProps.alerts) {
      this.showAllAlerts(alerts);
    }

    if (selected && selected !== prevProps.selected) {
      this.showSelectedAlert(selected);
    } else if (selected !== prevProps.selected) {
      this.map.removeLayer(this.selectedAlertLayer);
    }
  }

  onEachFeature = (feature, layer) => {
    const { geometry, properties } = feature;
    const { event } = properties;
    const { type } = geometry;
    switch (type) {
      case 'Point': {
        layer
          .on({ click: this.onclickGeoJson })
          .bindTooltip(`${event}`)
          .openTooltip();
        return true;
      }
      default:
        return false;
    }
  };

  initializeMap = () => {
    this.map = this.mapRef.current.leafletElement;
    this.createLayerControls();
    this.alertsLayer = this.createAlertsLayer();
    this.map.on('draw:created', e => {
      this.showDrawnAlert(e);
    });
  };

  showAllAlerts = alerts => {
    const checkForSelectedLayer = this.map.hasLayer(this.selectedAlertLayer);
    if (checkForSelectedLayer) {
      this.map.removeLayer(this.selectedAlertLayer);
    }
    this.alertsLayer.clearLayers();
    alerts.map(alert => this.alertsLayer.addData(alert));
    this.alertsLayer.addTo(this.map);
    this.map.setView([-6.179, 35.754], 7);
  };

  showPoint = area =>
    L.geoJSON([area], {
      filter: geoJsonFilter,
      pointToLayer: showMarkers,
    }).addTo(this.map);

  showPolygon = area =>
    L.geoJSON([area], {
      filter: filterFeatures,
      style: styleFeatures,
    }).addTo(this.map);

  showSelectedAlert = ({ area }) => {
    const { features } = area;
    const pointsOnly = features.filter(({ geometry }) => {
      const { type } = geometry;
      return type === 'Point';
    });

    if (pointsOnly.length > 1) {
      this.selectedAlertLayer = this.showPoint(area);
    } else {
      this.selectedAlertLayer = this.showPolygon(area);
      this.map.flyToBounds(this.selectedAlertLayer.getBounds());
      this.map.fitBounds(this.selectedAlertLayer.getBounds());
    }
  };

  showDrawnAlert = ({ layer }) => {
    this.drawnItems.addLayer(layer);
    const area = layer.toGeoJSON().geometry;
    this.setState({
      position: layer.getBounds().getCenter(),
      isPopupOPen: true,
      area,
    });
  };

  removeDrawnAlert = () => {
    this.drawnItems.clearLayers();
    this.setState({ isPopupOPen: false });
    this.map.closePopup();
  };

  createLayerControls = () => {
    // LayerSwitching Controls
    L.control
      .layers(
        baseMaps,
        {},
        {
          position: 'bottomleft',
        }
      )
      .addTo(this.map);

    // Zoom controls
    L.control
      .zoom({
        position: 'topleft',
      })
      .addTo(this.map);
  };

  createAlertsLayer = () =>
    L.geoJSON([], {
      filter: geoJsonFilter,
      pointToLayer: showMarkers,
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

  onclickGeoJson = e => {
    const id = get(e, 'target.feature.properties.id');
    const { startGetAlert, showAlertDetailsOnNav } = this.props;
    this.map.removeLayer(this.alertsLayer);
    startGetAlert(id);
    showAlertDetailsOnNav('details');
  };

  renderAlertActions = hideAlerts => (
    <div id="sidebar">
      <Row style={{ padding: '5px' }}>
        <Col span={24}>
          {hideAlerts ? (
            <Button type="primary" onClick={this.onClickBackButton}>
              <Icon type="arrow-left" />
              Back
            </Button>
          ) : (
            <Button type="primary" onClick={this.onclickNewAlertButton}>
              <Icon type="plus" />
              New Alert
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );

  storeEditableLayers = () => {
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

  // shows interface for new alert
  onclickNewAlertButton = () => {
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

    this.storeEditableLayers();
  };

  closePopup = () => {
    this.map.removeControl(this.drawControl);
    this.map.removeLayer(this.drawnItems);
    this.map.addLayer(this.alertsLayer);
    this.setState({ hideAlerts: false, isPopupOPen: false });
    this.map.closePopup();
  };

  onClickBackButton = () => {
    this.map.removeControl(this.drawControl);
    this.map.addLayer(this.alertsLayer);
    this.map.closePopup();
    this.setState({ hideAlerts: false });
  };

  // this shows popup on map
  showPopup() {
    const { position, area, isPopupOPen } = this.state;
    if (isPopupOPen) {
      return (
        <Popup
          position={position}
          minWidth={400}
          onClose={this.removeDrawnAlert}
        >
          <WrappedAlertForm
            area={area}
            closePopup={this.closePopup}
            removeDrawnAlert={this.removeDrawnAlert}
          />
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
        {this.renderAlertActions(hideAlerts)}
        <AlertNav hideNav={hideAlerts} />
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
  filter: state.filter,
});

export default connect(
  mapStateToProps,
  {
    startGetAlerts: getAlertsOperation,
    startGetAlert: getAlertOperation,
    showAlertDetailsOnNav: setAlertNavActive,
  }
)(AlertMap);

AlertMap.propTypes = {
  startGetAlerts: PropTypes.func,
  startGetAlert: PropTypes.func,
  showAlertDetailsOnNav: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
  alerts: PropTypes.arrayOf(PropTypes.shape(alertPropTypes)),
};

AlertMap.defaultProps = {
  startGetAlerts: () => {},
  startGetAlert: () => {},
  showAlertDetailsOnNav: () => {},
  alerts: [],
  selected: null,
};
