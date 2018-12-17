import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { createAlertOperation } from '../../../epics';
import { geometry } from '../../../../common/lib/propTypesUtil';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AlertForm extends React.Component {
  handleSubmit = e => {
    const { area, onClickSave, form, createAlert } = this.props;

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
          headline,
          expectedAt,
          expiredAt,
        } = values;
        const payload = {
          category,
          headline,
          expectedAt: expectedAt.toISOString(),
          expiredAt: expiredAt.toISOString(),
          event,
          urgency,
          severity,
          certainty,
          instruction: instructions,
          geometry: area,
          source: 'testing',
          area: 'testing',
        };
        createAlert(payload);
        onClickSave();
      }
    });
  };

  renderSelectOptions = options =>
    options.map(option => <Option value={option}>{option}</Option>);

  render() {
    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;
    const messageTypes = ['Alert', 'Update', 'Cancel', 'Error', 'Ask'];

    const categoryOptions = [
      'Geo',
      'Met',
      'Safety',
      'Security',
      'Rescue',
      'Fire',
      'Health',
      'Env',
      'Transport',
      'Infra',
      'CBRNE',
      'Other',
    ];

    const responseTypes = [
      'Shelter',
      'Evacuate',
      'Prepare',
      'Execute',
      'Avoid',
      'Monitor',
      'Assess',
      'AllClear',
      'None',
    ];

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
      <div>
        <Form>
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
          <FormItem {...formItemLayout} label="Headline">
            {getFieldDecorator('headline', {
              rules: [
                {},
                {
                  required: true,
                  message: 'Please input Alert Headline!',
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
                {this.renderSelectOptions(categoryOptions)}
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
          <FormItem {...formItemLayout} label="Message Type">
            {getFieldDecorator('type', {
              rules: [
                {},
                {
                  required: true,
                  message: 'Please Message Type of an Alert!',
                },
              ],
            })(
              <Select showSearch style={{ width: 250 }}>
                {this.renderSelectOptions(messageTypes)}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Response Type">
            {getFieldDecorator('response', {
              rules: [
                {},
                {
                  required: true,
                  message: 'Please Response Type of an Alert!',
                },
              ],
            })(
              <Select showSearch style={{ width: 250 }}>
                {this.renderSelectOptions(responseTypes)}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="OnSet">
            {getFieldDecorator('expectedAt', {
              rules: [
                {
                  required: true,
                  type: 'object',
                  message: 'Please input when Alert Onsets!',
                },
              ],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Expires">
            {getFieldDecorator('expiredAt', {
              rules: [
                {
                  required: true,
                  type: 'object',
                  message: 'Please input when Alert Expires!',
                },
              ],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Instructions">
            {getFieldDecorator('instructions', {
              rules: [
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
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} type="primary">
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const WrappedAlertForm = Form.create()(AlertForm);

export default connect(
  null,
  {
    createAlert: createAlertOperation,
  }
)(WrappedAlertForm);

WrappedAlertForm.propTypes = {
  createAlert: PropTypes.func,
  onCancel: PropTypes.func,
  onClickSave: PropTypes.func,
  area: geometry,
};

WrappedAlertForm.defaultProps = {
  createAlert: () => {},
  onClickSave: () => {},
  onCancel: () => {},
  area: {},
};
