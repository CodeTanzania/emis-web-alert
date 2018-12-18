import moment from 'moment';

// converts ISO date string to human readable
// date and time
export const isoDateToHumanReadableDate = date =>
  moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

export const humanTimeToday = () => moment().format(' MMMM Do ');

// data about severity colors
export const severityColors = [
  { property: 'Extreme', value: '#d72e29' },
  { property: 'Severe', value: '#fe9901' },
  { property: 'Moderate', value: '#ffff00' },
  { property: 'Minor', value: '#88e729' },
  { property: 'Unknown', value: '#3366ff' },
];
// converts alert object to a GeoJSON object
export const alertToGeoJSON = alert => {
  const {
    _id,
    category,
    urgency,
    event,
    severity,
    color,
    area,
    geometry,
    centroid,
  } = alert;
  const properties = { id: _id, category, urgency, severity, color, event };
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
