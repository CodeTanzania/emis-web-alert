import React from 'react';
import L from 'leaflet';
import { baseMaps } from '../../common/lib/mapUtil';

class DrawSupport extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { map } = this.props;
        L.control.layers(baseMaps, {}, { position: 'bottomleft' }).addTo(map);
    }

    render () {
        return null;
    }
}

export default DrawSupport;