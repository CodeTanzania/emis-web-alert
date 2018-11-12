import markerIcon from '../../images/Dead.png';
import tsunami from '../../images/Tsunami.png';
import fire from '../../images/Fire.png';
import flood from '../../images/Flood.png';

export const alertToGeoJSON = alert => {
  const { _id, category, urgency, severity, color, area, geometry, centroid } = alert;
  const properties = { id: _id, category, urgency, severity, color };
  return {
    type: 'FeatureCollection',
    description: area,
    features: [
      {
        type: 'Feature',
        properties,
        geometry,
      },
      {
        type: 'Feature',
        properties,
        geometry: centroid,
      },
    ],
  };
};

export const selectIcon = (incidentType = '') => {
  switch (incidentType) {
    case 'Extreme': {
      return tsunami;
    }
    case 'Severe': {
      return markerIcon;
    }
    case 'Moderate': {
      return fire;
    }
    case 'Minor': {
      return flood;
    }
    case 'Unknown': {
      return markerIcon;
    }
    default:
      return markerIcon;
  }
};
