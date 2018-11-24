import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col, Button } from 'antd';
import L from 'leaflet';
import 'leaflet-draw';
import { isEmpty, get } from 'lodash';
import * as ReactLeaflet from 'react-leaflet';
import { getAlertsOperation, getAlertOperation } from './epics';
import { setAlertNavActive } from './actions';
import WrappedAlertForm from './components/form';
import AlertNav from './components/AlertNav';
import { alertPropTypes } from '../common/lib/propTypesUtil';
import {
  baseMaps,
  showMarkers,
  styleFeatures,
  geoJsonFilter,
  filterFeatures,
  popupContent,
} from '../common/lib/mapUtil';

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

  componentDidMount() {
    const { startGetAlerts } = this.props;
    startGetAlerts();
    this.map = this.mapRef.current.leafletElement;

    L.control.layers(baseMaps, {}, { position: 'bottomleft' }).addTo(this.map);

    this.alertsLayer = L.geoJSON([], {
      filter: geoJsonFilter,
      pointToLayer: showMarkers,
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

    L.control
      .zoom({
        position: 'topleft',
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
      this.alertsLayer.clearLayers();
      alerts.map(alert => this.alertsLayer.addData(alert));
      this.map.setView([-6.179, 35.754], 7);
      this.map.flyTo([-6.179, 35.754]);
    }

    if (selected && selected !== prevProps.selected) {
      const { area } = selected;
      this.selectedAlertLayer = L.geoJSON([area], {
        filter: filterFeatures,
        style: styleFeatures,
      }).addTo(this.map);
      this.selectedAlertLayer.on('remove', () => {
        this.alertsLayer.addTo(this.map);
      });
      this.map.flyToBounds(this.selectedAlertLayer.getBounds());
      this.map.fitBounds(this.selectedAlertLayer.getBounds());
    } else if (selected !== prevProps.selected) {
      this.map.removeLayer(this.selectedAlertLayer);
      startGetAlerts();
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

  onclickGeoJson = e => {
    const id = get(e, 'target.feature.properties.id');
    const { startGetAlert, showAlertDetailsOnNav } = this.props;
    this.map.removeLayer(this.alertsLayer);
    startGetAlert(id);
    showAlertDetailsOnNav('details');
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
        {this.renderAlertActions(hideAlerts)}
        <AlertNav />
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
