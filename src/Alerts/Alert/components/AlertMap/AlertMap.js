import React from 'react';
import * as ReactLeaflet from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import classnames from 'classnames/bind';
import styles from './styles.css';
import {
  showMarkers,
  styleFeatures,
  geoJsonFilter,
  filterFeatures,
} from '../../../../common/lib/mapUtil';

const cx = classnames.bind(styles);
const { Map: LeafletMap, TileLayer } = ReactLeaflet;

/**
 * Alert Map  component
 * This component will provide Map visulization for an Alert
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
    this.alertMapRef = React.createRef();
  }

  componentDidMount() {
    this.map = this.alertMapRef.current.leafletElement;
    this.initilizeFullScreen();
  }

  showAlert = ({ area }) => {
    const { features } = area;
    const pointsOnly = features.filter(({ geometry }) => {
      const { type } = geometry;
      return type === 'Point';
    });

    if (pointsOnly.length > 1) {
      this.alertLayer = this.showPoint(area);
    } else {
      this.alertLayer = this.showPolygon(area);
      this.map.flyToBounds(this.alertLayer.getBounds());
      this.map.fitBounds(this.alertLayer.getBounds());
    }
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

  initilizeFullScreen = () => {
    L.control
      .fullscreen({
        position: 'topleft',
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        content: null,
        forceSeparateButton: true,
        forcePseudoFullscreen: true,
        fullscreenElement: false,
      })
      .addTo(this.map);
  };

  render() {
    const position = [-6.179, 35.754];
    return (
      <div className={cx('AlertMap')}>
        <LeafletMap center={position} zoom={6} ref={this.alertMapRef}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            id="mapbox.light"
            url="https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid29ybGRiYW5rLWVkdWNhdGlvbiIsImEiOiJIZ2VvODFjIn0.TDw5VdwGavwEsch53sAVxA#1.6/23.725906/-39.714135/0"
          />
        </LeafletMap>
      </div>
    );
  }
}

export default AlertMap;
