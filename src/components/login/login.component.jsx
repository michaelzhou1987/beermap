import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { graphql, compose, Query, ApolloConsumer } from 'react-apollo';
import { LOGIN } from '../../queries/mutations';
import { Redirect } from "react-router-dom";
// import { useApolloClient } from '@apollo/react-hooks';

const NormalLoginForm = (props) => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const token = await props.LOGIN({
          variables: {
            email: values.username,
            pwd: values.password,
            rememberMe: values.remember
          }
        });

        // console.log(token.data.login.token);
        if (!token) {
          return;
        }

        window.localStorage.setItem('beermapAuth', token.data.login.token);

        // props.closePopup();
        props.onSignin();

        // return <Redirect to="/home" />
      }
    });
  };

  const handleRegistration = () => {
    props.closePopup();
  }

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a
          className="login-form-forgot"
          href="javascript:viod(0);"
          style={{ float: 'right' }}
        >
          Forgot password
        </a>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: '100%'
            }}
          >
            Log in
          </Button>
        </div>
        Or{' '}
        <a
          href="javascript:void(0);"
          onClick={e => {
            handleRegistration(e);
          }}
        >
          register now!
        </a>
      </Form.Item>
    </Form>
  );

}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default graphql(LOGIN, {
  name: 'LOGIN'
})(WrappedNormalLoginForm);
