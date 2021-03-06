import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AlertsMap from './AlertsMap';

/**
 * Alerts  component
 * This component acts as a container for all components
 * involved with alerts
 *
 * @function
 * @name Alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function Alerts() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={AlertsMap} />
      </Switch>
    </div>
  );
}

export default Alerts;
