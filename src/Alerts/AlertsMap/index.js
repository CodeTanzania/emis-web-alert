import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Spin } from 'antd';
import L from 'leaflet';
import 'leaflet-draw';
import { get } from 'lodash';
import * as ReactLeaflet from 'react-leaflet';
import { getAlertsOperation, getAlertOperation } from '../epics';
import { setAlertNavActive, setDateRageFilter } from '../actions';
import AlertsNav from './components/AlertsNav';
import AlertLegend from './components/AlertLegend';
import AlertNavBar from './components/AlertNavBar';
import { alertPropTypes } from '../../common/lib/propTypesUtil';
import NewAlert from './components/NewAlert';
import {
  baseMaps,
  showMarkers,
  styleFeatures,
  geoJsonFilter,
  filterFeatures,
  popupContent,
} from '../../common/lib/mapUtil';

import './styles.css';

const { Map: LeafletMap, TileLayer } = ReactLeaflet;

/**
 * Alerts Map  component
 * This component will provide Map visulization for Alerts
 *
 * @function
 * @name AlertsMap
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideAlerts: false,
      area: {},
      isNewAlertDrawerOpen: false,
    };

    this.mapRef = React.createRef();
    this.closePopup = this.closePopup.bind(this);
    this.removeDrawnAlert = this.removeDrawnAlert.bind(this);
    this.onClickBackButton = this.onClickBackButton.bind(this);
    this.onclickNewAlertButton = this.onclickNewAlertButton.bind(this);
    this.openNewAlertDrawer = this.openNewAlertDrawer.bind(this);
    this.closeNewAlertDrawer = this.closeNewAlertDrawer.bind(this);
  }

  componentDidMount() {
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

  openNewAlertDrawer = () => {
    this.setState({ isNewAlertDrawerOpen: true });
  };

  closeNewAlertDrawer = () => {
    this.setState({ isNewAlertDrawerOpen: false });
  };

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
    this.showActiveAlerts();
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
    this.setState({ area });
    this.openNewAlertDrawer();
  };

  removeDrawnAlert = () => {
    this.drawnItems.clearLayers();
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
        position: 'bottomleft',
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
    this.closeNewAlertDrawer();
  };

  showActiveAlerts = () => {
    const { startGetAlerts, setCurrentDate } = this.props;
    const today = moment().toISOString();
    const future = moment()
      .add(1, 'year')
      .toISOString();
    const dateRange = [today, future];
    setCurrentDate(dateRange);
    startGetAlerts();
  };

  onClickBackButton = () => {
    this.map.removeControl(this.drawControl);
    this.map.addLayer(this.alertsLayer);
    this.map.closePopup();
    this.setState({ hideAlerts: false });
  };

  getSpinValue = () => {
    const { isLoadingAlerts, isLoadingAlert } = this.props;
    let spin = false;
    if (isLoadingAlert) {
      spin = isLoadingAlert;
    } else if (isLoadingAlerts) {
      spin = isLoadingAlerts;
    }

    return spin;
  };

  render() {
    const { hideAlerts, isNewAlertDrawerOpen, area } = this.state;
    const spin = this.getSpinValue();
    const position = [-6.179, 35.754];
    return (
      <Spin
        spinning={spin}
        tip="Loading..."
        size="large"
        style={{ position: 'absolute', top: '25%', right: '5%' }}
      >
        <div className="AlertsMap">
          <AlertsNav hideNav={hideAlerts} />
          <AlertLegend />
          <AlertNavBar
            hideAlerts={hideAlerts}
            onClickBack={this.onClickBackButton}
            onClickNew={this.onclickNewAlertButton}
          />
          <NewAlert
            visible={isNewAlertDrawerOpen}
            onClose={this.closeNewAlertDrawer}
            onClickSave={this.closePopup}
            area={area}
          />
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
          </LeafletMap>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts && state.alerts ? state.alerts.data : [],
  isLoadingAlerts: state.alerts.isGettingAlerts,
  isLoadingAlert: state.alert.isGettingAlert,
  selected: state.alert && state.alert ? state.alert.data : null,
  filter: state.filter,
});

export default connect(
  mapStateToProps,
  {
    startGetAlerts: getAlertsOperation,
    startGetAlert: getAlertOperation,
    showAlertDetailsOnNav: setAlertNavActive,
    setCurrentDate: setDateRageFilter,
  }
)(AlertsMap);

AlertsMap.propTypes = {
  startGetAlerts: PropTypes.func,
  isLoadingAlerts: PropTypes.bool.isRequired,
  isLoadingAlert: PropTypes.bool.isRequired,
  startGetAlert: PropTypes.func,
  setCurrentDate: PropTypes.func,
  showAlertDetailsOnNav: PropTypes.func,
  selected: PropTypes.shape(alertPropTypes),
  alerts: PropTypes.arrayOf(PropTypes.shape(alertPropTypes)),
};

AlertsMap.defaultProps = {
  startGetAlerts: () => {},
  startGetAlert: () => {},
  setCurrentDate: () => {},
  showAlertDetailsOnNav: () => {},
  alerts: [],
  selected: null,
};
