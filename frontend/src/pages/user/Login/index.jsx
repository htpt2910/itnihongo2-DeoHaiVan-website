import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Result, Spin } from 'antd';

import './styles.css'
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../useAxios';
import useToken from '../../../useToken';


export const Login = () =>  {
  const {setToken} = useToken()
  const navigate = useNavigate()
  const { fetchData, response, error, loading } = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (token) => {
    setIsModalOpen(false);
    setToken(token)
    navigate('/')
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    fetchData({
      url:'/login',
      method:'post',
      body:{
        email: values.email,
        password: values.password
      },
      headers:{
        'Content-Type': 'application/json',
      },
    });
  };
  return (
  <div className="app">
    <div className="login-form">
    <a className='title' href='/'>Hải Vân Quán</a>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={showModal}>
            Log in
          </Button>
          <Modal open={isModalOpen} footer={null}>
            {loading ? (
                    <Spin size="large"/>
                ) : (
                    <div>
                        {error && (
                            <Result
                              status="warning"
                              title="There are some problems with your operation."
                              extra={
                                <Button type="primary" key="console" onClick={handleCancel}>
                                  Check Again
                                </Button>
                              }
                            />
                        )}
                        <div>{response && 
                          <Result
                            status="success"
                            title="Successfully Logged!"
                            extra={[
                              <Button type="primary" key="console" onClick={handleOk(response)}>
                                Go Home
                              </Button>
                            ]}
                          />}</div>
                    </div>
                )}
          </Modal>          
          Or <a href="\signup">register now!</a>
        </Form.Item>
      </Form>
    </div>
  </div>
  );
};

export default Login;
