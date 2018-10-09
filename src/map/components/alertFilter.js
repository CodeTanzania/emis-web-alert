import React from 'react';
import {
  Form,
  Checkbox,
  Collapse,
  Select,
  Row,
  Col,
  Button,
  DatePicker,
  Divider,
} from 'antd';
import moment from 'moment';
import API from '../../common/API';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;
const plainOptions = [
  'Apple',
  'Pear',
  'plain',
  'butter',
  'Orange',
  'Maize',
  'plain',
  'butter',
];
const defaultCheckedList = [];

class AlertFilter extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  handleSubmit = e => {
    const { area, closePopup, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          event,
          category,
          urgency,
          severity,
          certainty,
          instructions,
        } = values;
        const payload = {
          source: {
            name: 'Tanzania Meteorological Agency',
            phone: '255 22 2460706-8',
            email: 'severe@meteo.go.tz',
            website: 'met@meteo.go.tz',
          },
          event: {
            name: event,
            category,
            urgency,
            severity,
            certainty,
            response: 'Monitor',
          },
          message: {
            instruction: instructions,
          },
          area: {
            description: 'Bedfordshire',
            geometry: area,
          },
        };

        API.createAlert(payload);
        closePopup();
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const dateFormat = 'YYYY/MM/DD';
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{
          height: '100vh',
        }}
      >
        <FormItem style={{ textAlign: 'center' }}>
          <h2>Create New Alert </h2>
          <Divider style={{ margin: 0 }} />
        </FormItem>
        <FormItem
          label="Incident-Type"
          {...formItemLayout}
          style={{
            marginLeft: '55px',
            marginBottom: '2px',
          }}
        >
          {getFieldDecorator('Incident-Type', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Incident-type of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Flood">Flood</Option>
              <Option value="Fire">Fire</Option>
              <Option value="Draught">Draught</Option>
              <Option value="Eartquick">Eartquick</Option>
              <Option value="Volcanic-erruption">Volcanic erruption</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Region"
          style={{
            marginLeft: '55px',
            marginBottom: '2px',
          }}
        >
          {getFieldDecorator('Region', {
            rules: [
              {},
              {
                required: true,
                message: 'Please region of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Dar es Salaam">Dar es Salaam</Option>
              <Option value="Mbeya">Mbeya</Option>
              <Option value="Morogoro">Morogoro</Option>
              <Option value="Iringa">Iringa</Option>
              <Option value="Arusha">Arusha</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Source"
          style={{
            marginLeft: '55px',
            marginBottom: '2px',
          }}
        >
          {getFieldDecorator('source', {
            rules: [
              {},
              {
                required: true,
                message: 'Please source of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="TMA">TMA</Option>
              <Option value="Flood-tags">Flood-tags</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Dates"
          style={{
            marginLeft: '55px',
            marginBottom: '2px',
          }}
        >
          {getFieldDecorator('DatePicker', {
            rules: [
              {},
              {
                required: true,
                message: 'Please dates of an Alert!',
              },
            ],
          })(
            <RangePicker
              style={{ width: '70%' }}
              defaultValue={[
                moment('2015/01/01', dateFormat),
                moment('2015/01/01', dateFormat),
              ]}
              format={dateFormat}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('checkbox')(
            <Collapse
              accordion
              style={{
                marginTop: '28px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <Panel header="CATEGORY" key="1">
                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={this.onChange}
                />
              </Panel>
              <Panel header="URGENCY" key="2">
                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={this.onChange}
                />
              </Panel>
              <Panel header="SEVERITY" key="3">
                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={this.onChange}
                />
              </Panel>
              <Panel header="RESPONSIBILITY" key="4">
                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={this.onChange}
                />
              </Panel>
            </Collapse>
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={12}>
              <Button type="default">Cancel</Button>
            </Col>
            <Col span={3} offset={1}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAlertFilter = Form.create()(AlertFilter);
export default WrappedAlertFilter;
