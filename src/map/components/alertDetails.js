import React from 'react';
import { get } from 'lodash';

class AlertDetails extends React.Component {


    render() {
        const { selected } = this.props;
        return selected ? (
            <div id="filters-header">
                <h1>Alert Details</h1>
                <p> <strong>Event:</strong> {get( selected, "event.name")} </p>
                <p> <strong>Category:</strong> {get( selected, "event.name")} </p>
                <p> <strong>Urgency:</strong> {get( selected, "event.name")} </p>
                <p> <strong>Severity:</strong> {get( selected, "event.name")} </p>
                <p> <strong>Certainty:</strong> {get( selected, "event.name")} </p>
                <p> <strong>Instructions:</strong> {get( selected, "event.name")} </p>
            </div>
        ) : null;
    }
}


export default AlertDetails;
