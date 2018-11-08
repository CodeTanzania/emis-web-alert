

export const alertToGeoJSON = alert => {
    const { area, _id, event } = alert;
    const { geometry, centroid } = area;
    const { category, urgency, severity } = event;
    const properties = { id: _id, category, urgency, severity };
    return {
      type: 'FeatureCollection',
      description: area.description,
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