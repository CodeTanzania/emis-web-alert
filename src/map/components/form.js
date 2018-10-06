import React from 'react';
import { Form, Input, Select, Row, Col, Button, Divider } from 'antd';
import API from '../../common/API';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AlertForm extends React.Component {
  handleSubmit = e => {
    const { area, closePopup, form } = this.props;
    
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { event, category, urgency, severity, certainty, instructions } = values;
        let payload = {
          "source":
          {
            "name": "Tanzania Meteorological Agency",
            "phone": "255 22 2460706-8",
            "email": "severe@meteo.go.tz",
            "website": "met@meteo.go.tz"
          },
          "event":
          {
            "name": event,
            "category": category,
            "urgency": urgency,
            "severity": severity,
            "certainty": certainty,
            "response": "Monitor"
          },
          "message":
          {
            "instruction": instructions
          },
          "area":
          {
            "description": "Bedfordshire",
            "geometry": area
          }
        }

        console.log('looking At payload');
        console.log(payload);
        API.createAlert(payload)
        .then(res => {
          console.log('looking at the response');
          console.log(res);
        })
        closePopup();
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={{ textAlign: 'center' }}>
          <h2>Create New Alert </h2>
          <Divider style={{ margin: 0 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="Event">
          {getFieldDecorator('event', {
            rules: [
              {},
              {
                required: true,
                message: 'Please input Alert Event!',
              },
            ],
          })(<Input style={{ width: 250 }} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Category">
          {getFieldDecorator('category', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Category of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Geo">Geo</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Urgency">
          {getFieldDecorator('urgency', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Urgency of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Immediate">Immediate</Option>
              <Option value="Expected">Expected</Option>
              <Option value="Future">Future</Option>
              <Option value="Past">Past</Option>
              <Option value="Unknown">Unknown</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Severity">
          {getFieldDecorator('severity', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Severity of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Extreme">Extreme</Option>
              <Option value="Severe">Severe</Option>
              <Option value="Moderate">Moderate</Option>
              <Option value="Minor">Minor</Option>
              <Option value="Unknown">Unknown</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Certainty">
          {getFieldDecorator('certainty', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Certainty of an Alert!',
              },
            ],
          })(
            <Select showSearch style={{ width: 250 }}>
              <Option value="Observed">Observed</Option>
              <Option value="Likely">Likely</Option>
              <Option value="Possible">Possible</Option>
              <Option value="Unlikely">Unlikely</Option>
              <Option value="Unknown">Unknown</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Instructions">
          {getFieldDecorator('instructions', {
            rules: [
              {},
              {
                required: true,
                message: 'Please Write instructions for an Alert!',
              },
            ],
          })(
            <TextArea
              style={{ width: 250 }}
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </FormItem>

        <FormItem>
          <Divider style={{ margin: '0px 0px 20px 0px' }} />
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

const WrappedAlertForm = Form.create()(AlertForm);
export default WrappedAlertForm;
