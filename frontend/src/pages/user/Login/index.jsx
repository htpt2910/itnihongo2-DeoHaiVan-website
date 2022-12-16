import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Result, Spin } from 'antd';

import './styles.css'
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../useAxios';
import useToken from '../../../useToken';


export const Login = () =>  {
  const {token, setToken} = useToken()
  const navigate = useNavigate()
  const { fetchData, response, error, loading } = useAxios();
  const { fetchData:fetchUser, response:r_user, loading:l_user } = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setToken(response)
    r_user.is_admin?navigate('/admin/usercontrol'):navigate('/')

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
  useEffect(() => {
    fetchUser({
        url:'/users/me',
        method:'get',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
  }, [])
  return (
  <>
  {l_user ? <Spin />:(!r_user.email?
  (<div className="app">
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
                      {!response.token?
                        (
                            <Result
                              status="error"
                              title={error.response.data.detail}
                              extra={
                                <Button type="primary" key="failed" onClick={handleCancel}>
                                  Check Again
                                </Button>
                              }
                            />
                        ):
                        (
                          <Result
                            status="success"
                            title="Successfully Logged!"
                            extra={[
                              <Button type="primary" key="success" onClick={handleOk}>
                                Go Home
                              </Button>                            
                            ]}
                          />)}
                    </div>
                )}
          </Modal>          
          Or <a href="\signup">register now!</a>
        </Form.Item>
      </Form>
    </div>
  </div>):(navigate('/')))}
  </>
  );
};

export default Login;
