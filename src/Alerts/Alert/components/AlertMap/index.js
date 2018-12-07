import React from 'react';
import * as ReactLeaflet from 'react-leaflet';
import classnames from 'classnames/bind';
import styles from './styles.css';

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
  componentDidMount() {}

  render() {
    const position = [-6.179, 35.754];
    return (
      <div className={cx('AlertMap')}>
        <LeafletMap center={position} zoom={7}>
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
