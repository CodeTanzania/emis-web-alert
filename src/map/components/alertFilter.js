// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import {
//   Form,
//   Checkbox,
//   Collapse,
//   Row,
//   Col,
//   Badge,
//   Icon,
//   Divider,
//   List,
// } from 'antd';
// import leafletOveridenStyles from '../leaflet-overide.css';

// classnames.bind(leafletOveridenStyles);
// const { Panel } = Collapse;

// const data = [
//   'Racing car sprays burning fuel into crowd.',
//   'Japanese princess to wed commoner.',
//   'Australian walks 100km after outback crash.',
//   'Man charged over missing wedding girl.',
//   'Los Angeles battles huge wildfires.',
// ];

// class AlertFilter extends React.Component {
//   render() {
//     return (
//       <Collapse
//         accordion
//         defaultActiveKey={['1']}
//         style={{
//           backgroundColor: '#fff',
//           textAlign: 'center',
//         }}
//       >
//         <Panel header="CATEGORY" key="1">
//           <div style={{ backgroundColor: '#f7f7f7' }}>
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Met</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Safety</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Rescue</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Health</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Env</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Transport</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>Infra</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//             <Divider />
//             <Row style={{ padding: '16px 0px 0px 0px' }}>
//               <Col span={3}>
//                 <Icon type="medicine-box" theme="outlined" />
//               </Col>
//               <Col span={3}>
//                 <p>CBRNE</p>
//               </Col>
//               <Col span={2} offset={13}>
//                 <Badge
//                   count={25}
//                   style={{ backgroundColor: '#fff', color: '#2d2d2d' }}
//                 />
//               </Col>
//               <Col span={3}>
//                 <Checkbox onChange={this.onChange} />
//               </Col>
//             </Row>
//           </div>
//         </Panel>
//         <Panel header="URGENCY" key="2">
//           <List
//             size="small"
//             bordered
//             dataSource={data}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Panel>
//         <Panel header="CERTAINTY" key="3">
//           <List
//             size="small"
//             bordered
//             dataSource={data}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Panel>
//         <Panel header="SEVERITY" key="4">
//           <List
//             size="small"
//             bordered
//             dataSource={data}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Panel>
//       </Collapse>
//     );
//   }
// }

// const WrappedAlertFilter = Form.create()(AlertFilter);
// export default WrappedAlertFilter;
// AlertFilter.propTypes = {
//   form: PropTypes.object,
// };
