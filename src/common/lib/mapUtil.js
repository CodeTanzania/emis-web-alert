import L from 'leaflet';

export const popupContent = `<div>
<div class="ant-modal-body">
    <h2>To create new Alert, Draw the area that is involved  in the Alert</h2>
</div>
<div class="ant-modal-footer">
    <div>
        <button type="button" id="info-button" class="ant-btn ant-btn-primary"><span>OK</span></button>
    </div>
</div>
</div>`;

export const generateMarkerIcon = (fillColor = '#93c47d') => {
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
      iconAnchor: [15, 30],
      shadowAnchor: [4, 62],
      popupAnchor: [0, -25],
    },
  });

  const iconUrl = encodeURI(`data:image/svg+xml,${svg}`).replace('#', '%23');
  const icon = new CustomIcon({ iconUrl });
  return icon;
};

export const showMarkers = (feature, latlng) => {
  const { properties } = feature;
  const { color } = properties;
  const customIcon = generateMarkerIcon(color);

  return L.marker(latlng, { icon: customIcon });
};

export const styleFeatures = feature => {
  const { geometry, properties } = feature;
  const { color } = properties;
  const { type } = geometry;
  if (type === 'Polygon' || 'MultiPolygon') {
    return { color };
  }

  return {};
};

export const filterFeatures = feature => {
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

export const geoJsonFilter = feature => {
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

const mapboxAttribution =
  '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>' +
  ' © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
  '<strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">' +
  'Improve this map</a></strong>';

// const inundationAttribution =
//   '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>' +
//   ' © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
//   '© <a href="https://www.ramanihuria.org">Ramani Huria</a>' +
//   '<strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">' +
//   'Improve this map</a></strong>';

const osmAttr =
  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
  ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';

const osm = new L.TileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: osmAttr,
    maxZoom: 19,
  }
);

// const inundation = new L.TileLayer(
//   'https://api.mapbox.com/styles/v1/samtwesa/' +
//     'cj670gav2029o2rmrrg886sj7/tiles/256/{z}/{x}/{y}?access_token=' +
//     'pk.eyJ1Ijoic2FtdHdlc2EiLCJhIjoiZTc1OTQ4ODE0ZmY2MzY0MGYwMDNjOWNlYTYxMjU4NDYifQ.' +
//     'F1zCcOYqpXWd4C9l9xqvEQ',
//   {
//     attribution: inundationAttribution,
//     maxZoom: 18,
//   }
// );
const customOsmBright = new L.TileLayer(
  'https://api.mapbox.com/styles/v1/samtwesa/' +
    'cj6p13u2o25wa2rmj3k05qnrx/tiles/256/{z}/{x}/{y}?access_token=' +
    'pk.eyJ1Ijoic2FtdHdlc2EiLCJhIjoiZTc1OTQ4ODE0ZmY2MzY0MGYwMDNjOWNlYTYxMjU4NDYifQ.' +
    'F1zCcOYqpXWd4C9l9xqvEQ',
  {
    attribution: mapboxAttribution,
    maxZoom: 20,
  }
);

const defaultMap = new L.TileLayer(
  'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid29ybGRiYW5rLWVkdWNhdGlvbiIsImEiOiJIZ2VvODFjIn0.TDw5VdwGavwEsch53sAVxA#1.6/23.725906/-39.714135/0',
  {
    attribution: mapboxAttribution,
    maxZoom: 20,
  }
);

export const satelliteLayer = new L.TileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/' +
    'tiles/256/{z}/{x}/{y}?access_token=' +
    'pk.eyJ1Ijoic2FtdHdlc2EiLCJhIjoiZTc1OTQ4ODE0ZmY2MzY0MGYwMDNjOWNlYTYxMjU4NDYifQ.' +
    'F1zCcOYqpXWd4C9l9xqvEQ',
  {
    attribution: mapboxAttribution,
    maxZoom: 20,
  }
);

export const baseMaps = {
  OpenStreetMap: osm,
  Satellite: satelliteLayer,
  Standard: customOsmBright,
  Dafault: defaultMap,
};
