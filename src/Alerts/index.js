import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AlertMap from './AlertsMap';
import Alert from './Alert';

function Alerts() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={AlertMap} />
        <Route path="/alert" component={Alert} />
      </Switch>
    </div>
  );
}

export default Alerts;
