import React from 'react';
import { isoDateToHumanReadableDate } from '../../../../../../common/lib/util';
import { alertPropTypes } from '../../../../../../common/lib/propTypesUtil';

function MoreDetailsAlert({
  alert: { source, status, type, scope, reportedAt, number },
}) {
  return (
    <div>
      <p>
        <b>Source of the Alert:</b> {source}
      </p>
      <p>
        <b>Status of the Alert:</b> {status}
      </p>
      <p>
        <b>Scope of the Alert:</b> {scope}
      </p>
      <p>
        <b>Type of the Alert:</b> {type}
      </p>
      <p>
        <b>This Alert was sent on:</b> {isoDateToHumanReadableDate(reportedAt)}
      </p>
      <p>
        <b>Number:</b> {number}
      </p>
    </div>
  );
}

export default MoreDetailsAlert;

MoreDetailsAlert.propTypes = {
  alert: alertPropTypes,
};

MoreDetailsAlert.defaultProps = {
  alert: {},
};
