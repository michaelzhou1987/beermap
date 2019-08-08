import React, { Component } from 'react';
// import obj from './home.module.scss';
import { graphql, compose, Query, ApolloConsumer } from 'react-apollo';
import { CREATE_USER } from '../../queries/mutations';
import { checkExistingUserQuery } from '../../queries/queries';
import axios from 'axios';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();

    let formData = this.props.form.getFieldsValue();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    this.props
      .CREATE_USER({
        variables: {
          userInput: formData
        }
      })
      .then(resp => {
        console.log(resp);
      });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPwd'], { force: true });
    }
    callback();
  };


  checkExistingUser = async (rule, value, callback) => {
    let { data } = await axios.post(
      'http://127.0.0.1:8000/api/checkUserEmail',
      {
        email: value
      }
    );
    console.log(data.error);
    if(data.error === 1) {
      console.log(data.msg);
      callback(data.msg);
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1'
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            validate: [
              {
                trigger: 'onBlur',
                rules: [
                  {
                    validator: this.checkExistingUser
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              },
              {
                trigger: 'onChange',
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              }
            ]
          })(<Input />)}
          {/* onBlur={this.checkExistingUser} */}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('pwd', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirmPwd', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              First Name&nbsp;
              <Tooltip title="First Name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: false,
                message: 'Please input your firstname!',
                whitespace: false
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Last Name&nbsp;
              <Tooltip title="Last Name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: false,
                message: 'Please input your lastname!',
                whitespace: false
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                required: false,
                message: 'Please input your phone number!'
              }
            ]
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        {/* <Form.Item label="Website">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }]
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item> */}
        {/* <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the captcha you got!'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked'
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.form.getFieldsValue());
  }
  componentDidUpdate() {}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default compose(
  graphql(CREATE_USER, {
    name: 'CREATE_USER'
  }),
  graphql(checkExistingUserQuery, {
    name: 'checkExistingUserQuery'
  })
)(WrappedRegistrationForm);
