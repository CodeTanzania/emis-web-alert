import React from 'react';
import { alertPropTypes } from '../../../../../../../../common/lib/propTypesUtil';

function MoreDetailsArea({ alert }) {
  const { area } = alert || {};
  const { description } = area || {};
  return (
    <div>
      <p>
        <b>Area(s) involved:</b> {description}
      </p>
    </div>
  );
}

export default MoreDetailsArea;

MoreDetailsArea.propTypes = {
  alert: alertPropTypes,
};

MoreDetailsArea.defaultProps = {
  alert: {},
};
