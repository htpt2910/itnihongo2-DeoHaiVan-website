import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './layout.css';
import logo from '../../assets/mountain.png'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';


const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo-admin'>
          <p className='mount'>Deo Hai Van</p>
          <img src={logo} alt="logo" className='logo'/>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
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
              icon: <LogoutOutlined  />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, height:67 }}>
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
