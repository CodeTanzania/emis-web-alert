import React from 'react';

class AlertDetails extends React.Component {


    render() {
        const { selected } = this.props;
        return selected ? (
            <div id="filters-header">
                <h1>Alert Details</h1>
            </div>
        ) : null;
    }
}


export default AlertDetails;
