import React from 'react';
import L from 'leaflet';
import { Row, Col, Button, Icon } from 'antd';
import 'leaflet-draw';
import API from '../common/API';
import AlertForm from './components/form';

/**
 * Alerts Map  component
 * This component will provide Map visulization for Alerts
 *
 * @function
 * @name AlertMap
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alerts: [],
      hideAlerts: false,
      polygons: [],
      map: {}
    }
  }



  // shows interface for new alert
  onclickNewAlertButton = () => {

    const popupContent = `<div>
    <div class="ant-modal-body">
        <h2>To create new Alert, Draw the area that is involved  in the Alert</h2>
    </div>
    <div class="ant-modal-footer">
        <div>
            <button type="button" id="info-button" class="ant-btn ant-btn-primary"><span>OK</span></button>
        </div>
    </div>
</div>`

    L.popup({ minWidth: 450 })
      .setLatLng([-6.179, 35.754])
      .setContent(popupContent)
      .openOn(this.map);
    this.map.removeLayer(this.polygon);
    this.setState({ hideAlerts: true });

    document.querySelector("#info-button").addEventListener("click", (e) => {
      e.preventDefault();
      this.map.closePopup();
    });


    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: false,
        circlemarker: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });
    this.map.addControl(this.drawControl);

  }

  // converts a string containig whitespace-delimited list of  coordinate pairs
  // to an array of coordinate arrays
  stringToArrayCoordinates = (stringCoordinates) => {
    const splitCoordinates = stringCoordinates.trim().split(' ');
    return splitCoordinates.map(splitCoordinate =>
      splitCoordinate.split(',').map(value => parseFloat(value)))
  }


  componentDidMount() {
    API.getAlerts()
      .then(alerts => {
        const polygons = alerts.map(alert => this.stringToArrayCoordinates(alert.area.polygon));
        return this.setState({ alerts, polygons })
      });

    this.map = L.map('map', { zoomControl: false }).setView([-6.179, 35.754], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    const form =  `<div>
    <div class="ant-modal-header">
        <div class="ant-modal-title" id="rcDialogTitle0"> Create New Alert </div>
    </div>
    <div class="ant-modal-body">
        <form class="ant-form ant-form-horizontal" id="alert-form">
            <div class="ant-row ant-form-item">
                <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                    <label for="event" class="ant-form-item-required" title="event">Event</label>
                </div>
                <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                    <div class="ant-form-item-control"><span class="ant-form-item-children"><input type="text" id="event" data-__meta="[object Object]" data-__field="[object Object]" class="ant-input" value=""></span></div>
                </div>
            </div>
            <div class="ant-row ant-form-item">
                <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                    <label for="urgency" class="ant-form-item-required" title="Urgency">Urgency</label>
                </div>
                <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                    <div class="ant-form-item-control"><span class="ant-form-item-children"><div id="urgency" class="ant-select ant-select-enabled"><div class="ant-select-selection
            ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" data-__meta="[object Object]" data-__field="[object Object]" tabindex="0"><div class="ant-select-selection__rendered"></div><span class="ant-select-arrow" unselectable="on" style="user-select: none;"><i class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div>
                </div>
                </span>
            </div>
    </div>
</div>
<div class="ant-row ant-form-item">
    <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
        <label for="severity" class="ant-form-item-required" title="Severity">Severity</label>
    </div>
    <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
        <div class="ant-form-item-control"><span class="ant-form-item-children"><div id="severity" class="ant-select ant-select-enabled"><div class="ant-select-selection
            ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" data-__meta="[object Object]" data-__field="[object Object]" tabindex="0"><div class="ant-select-selection__rendered"></div><span class="ant-select-arrow" unselectable="on" style="user-select: none;"><i class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div>
    </div>
    </span>
</div>
</div>
</div>
<div class="ant-row ant-form-item">
    <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
        <label for="certainty" class="ant-form-item-required" title="Certainty">Certainty</label>
    </div>
    <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
        <div class="ant-form-item-control"><span class="ant-form-item-children"><div id="certainty" class="ant-select ant-select-enabled"><div class="ant-select-selection
            ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" data-__meta="[object Object]" data-__field="[object Object]" tabindex="0"><div class="ant-select-selection__rendered"></div><span class="ant-select-arrow" unselectable="on" style="user-select: none;"><i class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div>
    </div>
    </span>
</div>
</div>
</div>

<div class="ant-row ant-form-item">
    <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
        <label for="category" class="ant-form-item-required" title="Category">Category</label>
    </div>
    <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
        <div class="ant-form-item-control"><span class="ant-form-item-children"><div id="category" class="ant-select ant-select-enabled"><div class="ant-select-selection
            ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" data-__meta="[object Object]" data-__field="[object Object]" tabindex="0"><div class="ant-select-selection__rendered"></div><span class="ant-select-arrow" unselectable="on" style="user-select: none;"><i class="anticon anticon-down ant-select-arrow-icon"><svg viewBox="64 64 896 896" class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div>
    </div>
    </span>
</div>

</div>
</div>
<div class="ant-row ant-form-item">
    <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
        <label for="instructions" class="ant-form-item-required" title="instructions">Instructions</label>
    </div>
    <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
        <div class="ant-form-item-control"><span class="ant-form-item-children"><textarea class="ant-input" style="height: 52px; min-height: 52px; max-height: 136px; overflow-y: hidden;"></textarea></span></div>
    </div>
</div>
</div>
</div>
</form>
</div>
<div class="ant-modal-footer">
    <div>
        <button type="button" id="info-button" class="ant-btn"><span>Cancel</span></button>
        <button type="button" class="ant-btn ant-btn-primary"><span>Save</span></button>
    </div>
</div>
</div>`

    // shows popup when polygon is drawn
    // on map
    this.map.on('draw:created', (e) => {

      let layer = e.layer;
      this.drawnItems.addLayer(layer);
      this.popup = L.popup({ minWidth: 450 })
        .setLatLng(layer.getBounds().getCenter())
        .setContent(form)
        .openOn(this.map);



      document.querySelector("#alert-form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log('click just occured');
        let event = document.getElementById("event").value;
        let urgency = document.getElementById("urgency").value;
        let certainity = document.getElementById("certainity").value;
        let severity = document.getElementById("severity").value;
        let instructions = document.getElementById("instructions").value;
        const area = [layer.toGeoJSON()];
        let alert = { event, urgency, certainity, severity, instructions, area };
        console.log('this is our alert');
        console.log(alert);
        this.map.removeControl(this.drawControl);
        this.map.removeLayer(this.drawnItems);
        this.map.closePopup();
        this.setState({ hideAlerts: false });
        this.map.addLayer(this.polygon);
      });





    });

    this.setState({ map: this.map })


  }

  componentDidUpdate(prevProps, prevState) {
    const { polygons, hideAlerts } = this.state;
    if (this.state.polygons !== prevState.polygons) {
      // create a red polygon from an array of LatLng points
      var latlngs = this.state.polygons;
      this.polygon = L.polygon(latlngs, { color: 'red' }).addTo(this.map);
    }
  }




  render() {
    const { hideAlerts } = this.state;
    return (
      <div>


        <div id="sidebar">
          <Row style={{ padding: "5px", display: hideAlerts ? 'none' : 'block' }}>
            <Col span={8}>
              <Button type="primary" onClick={this.onclickNewAlertButton}>+ New Alert</Button>
            </Col>
            <Col span={8}>
              <Button type="primary"><Icon type="export" theme="outlined" />Export</Button>
            </Col>
            <Col span={4}>
              <Button type="default"><Icon type="table" theme="outlined" /></Button>
            </Col>
            <Col span={4}><Button type="default"><Icon type="caret-up" theme="outlined" /></Button></Col>
          </Row>
        </div>

        <div id="map"></div>
      </div>

    );
  }
}

export default AlertMap;




