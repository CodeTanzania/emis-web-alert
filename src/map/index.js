import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import L from 'leaflet';
import 'leaflet-draw';
import { isEmpty, get } from 'lodash';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ReactLeaflet from 'react-leaflet';
import { alertsGetStart, alertGetStart } from './actions';
import WrappedAlertForm from './components/form';
import AlertDetails from './components/alertDetails';
import AlertActions from './components/alertActions';

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
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.map = this.mapRef.current.leafletElement;

    this.alertsLayer = L.geoJSON([], {
      filter: this.geoJsonFilter,
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
      alerts.map(alert => this.alertsLayer.addData(alert));
    }

    if (selected && selected !== prevProps.selected) {
      const { area } = selected;
      this.selectedAlertLayer = L.geoJSON([area], {
        filter: this.filterFeatures, style: this.styleFeatures
      }).addTo(this.map);
      this.selectedAlertLayer.on('remove', () => {
        alerts.map(alert => this.alertsLayer.addData(alert));
        this.alertsLayer.addTo(this.map);
      });
      // this.map.fitBounds(alertLayer.getBounds());
    } else if (selected !== prevProps.selected) {
      this.map.removeLayer(this.selectedAlertLayer);
      startGetAlerts();
    }
  }

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
        return true;
    }
  }

    
  styleFeatures = feature => {
    const { geometry, properties } = feature;
    const { urgency } = properties;
    const { type } = geometry;
    if( type === 'Polygon' || 'MultiPolygon') {
      switch (urgency) {
        case 'Immediate': {
          return {"color": "red"};
        }
        case 'Expected': {
          return {"color": "orange"};
        }
        case 'Future': {
          return {"color": "yellow"};
        }
        case 'Past': {
          return {"color": "green"};
        }
        case 'Unknown': {
          return {"color": "grey"};
        }
        default:
          return {"color": "grey"};
      }
    }
  }
  

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

  onclickGeoJson = e => {
    const id = get(e, 'target.feature.properties.id');
    const { startGetAlert } = this.props;
    this.map.removeLayer(this.alertsLayer);
    startGetAlert(id);
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
    const { selected, startGetAlert } = this.props;
    const position = [-6.179, 35.754];
    return (
      <div>
        <AlertActions hideAlerts={hideAlerts} />
        <AlertDetails selected={selected} unSelectAlert={startGetAlert} />

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

const mapStateToProps = state => ({
  alerts: state.alerts && state.alerts ? state.alerts.data : [],
  selected: state.alert && state.alert ? state.alert.data : null,
});

export default connect(
  mapStateToProps,
  {
    startGetAlerts: alertsGetStart,
    startGetAlert: alertGetStart,
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
  startGetAlerts: () => {},
  startGetAlert: () => {},
  alerts: [],
  selected: null,
};
