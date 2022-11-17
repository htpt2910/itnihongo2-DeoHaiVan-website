import {
  LogoutOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import logo from '../../../assets/mountain.png';
import './styles.css';
import UserControlComponent from './UserControlComponent';

const { Header, Sider, Content } = Layout;
export const UserControl = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo-admin'>
          <p className='mount'>Deo Hai Van</p>
          <img src={logo} alt="logo" className='logo' />
        </div>
        <Menu

          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          // onClick={({key})} =>{

          // }
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'User Management',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Posts Management',
            },
            {
              key: '3',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, height: 67 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 720,
          }}
        >
          <UserControlComponent />
        </Content>
      </Layout>
    </Layout>
  );
};