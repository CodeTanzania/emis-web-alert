import React from 'react';
import L from 'leaflet';
import { Row, Col, Button, Icon } from 'antd';
import 'leaflet-draw';
import API from '../common/API';

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
      map: {}
    }
  }



  // shows interface for new alert
  onclickNewAlertButton = () => {
    console.log('new alert buton clicked');

    L.popup({ minWidth: 450 })
      .setLatLng([-6.179, 35.754])
      .setContent('<h2>Select a Control to Draw on Map </h2>')
      .openOn(this.map);
    this.map.removeLayer(this.alertsGeoJsonLayer);
    this.setState({ hideAlerts: true });

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



  componentDidMount() {
    API.getAlerts()
      .then(alerts => this.setState({ alerts }));

    this.map = L.map('map', { zoomControl: false }).setView([-6.179, 35.754], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);
    this.alertsGeoJsonLayer = L.geoJSON().addTo(this.map);


    let form = `
    <form id="alert-form">
            Event:<br />
            <input type="text" id="event" />
            <br />
            Urgency: <br />
            <select id="urgency">
                <option value="Immediate">Imediate</option>
                <option value="Expected">Expected</option>
            </select>
            <br />
            Certainity: <br />
            <select id="certainity">
                <option value="Observed">Observed</option>
                <option value="Likely">Likely</option>
            </select>
            <br />
            Severity: <br />
            <select id="severity">
                <option value="Extreme">Extreme</option>
                <option value="Minor">Minor</option>
            </select>
            <br />
            Instructions:<br />
            <textarea rows="4" cols="50" id="instructions"> 
            </textarea>
            <br />
            <button type="submit">save</button>
        </form> 
    `;

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
        const area = layer.toGeoJSON();
        this.map.removeControl(this.drawControl);
        this.map.removeLayer(this.drawnItems);
        this.map.closePopup();
        this.setState({ hideAlerts: false });
        this.map.addLayer(this.alertsGeoJsonLayer);

        let alert =  {
          "source": {
            "name": "Parker - Rice",
            "phone": "544.252.1361 x8021",
            "email": "isac.simonis@gmail.com",
            "website": "http://waldo.com"
          },
          "event": {
            "code": "c75541c3-5e00-4896-9a20-ad2f2750ac9a",
            "name": event,
            "category": "Geo",
            "description": "Quos quam molestias sed assumenda. Ullam minima repudiandae quia enim. Doloribus eum ea quasi deleniti non inventore a sapiente. Officia consequatur maiores aut. Hic et perferendis quos. Perferendis qui vitae atque repellendus eaque quia hic voluptatem.",
            "urgency": urgency,
            "severity": severity,
            "certainty": certainity,
            "response": "Prepare"
          },
          "message": {
            "status": "Actual",
            "type": "Update",
            "scope": "Private",
            "restriction": "Non tempore occaecati autem.",
            "addresses": [
              "alta_lindgren@yahoo.com"
            ],
            "code": "turquoise",
            "note": "Consequatur tenetur beatae qui.",
            "headline": "Qui porro fuga necessitatibus tempora.",
            "instruction": instructions,
            "website": "https://magali.com"
          },
          "area": {
            "description": "Avon",
            "geometry": area.geometry,
            "altitude": 4716265329393664,
            "ceiling": 2912052882440192
          },
          "resources": [
            {
              "description": "Expedita perspiciatis beatae laudantium sit atque.",
              "mime": "application/cms",
              "uri": "https://s3.amazonaws.com/uifaces/faces/twitter/weavermedia/128.jpg"
            }
          ],
          "reportedAt": "2018-08-19T18:47:03.379Z",
          "expectedAt": "2018-07-20T10:23:09.375Z",
          "expiredAt": "2018-08-23T20:34:57.716Z",
          "occuredAt": "2018-09-10T05:25:48.213Z",
          "endedAt": "2018-07-16T16:48:49.568Z",
          "direction": "Inbound",
          "_id": "5bb31edb82319900042e970e",
          "updatedAt": "2018-10-02T07:31:41.891Z",
          "createdAt": "2018-10-02T07:31:41.891Z"
        };

        const payload = {
          ...alert,
          "event": {
            "name": event,
            "urgency": urgency,
            "severity": severity,
            "certainty": certainity
          },
          "message": {
            "instruction": instructions
          },
          "area": {
            "geometry": area,
          }

        };

        API.createAlert({ payload })
          .then(res => {
            console.log('looking at the response object');
            console.log(res);
          });

      });





    });

    this.setState({ map: this.map })


  }

  componentDidUpdate(prevProps, prevState) {

    const { alerts } = this.state;
    if (alerts !== prevState.alerts) {
      alerts.map(({ area }) => {
        const { createdAt, updatedAt } = area.geometry;
        if (createdAt || updatedAt) {
          delete area.geometry.createdAt;
          delete area.geometry.updatedAt;
        }
        this.alertsGeoJsonLayer.addData({ ...area, "type": "Feature" });
      })
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




