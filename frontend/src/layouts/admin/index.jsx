import { HomeOutlined, LogoutOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import logo from '../../assets/mountain.png';
import { AdminHeader } from '../../components/admin/header/Header';
import './layout.css';

const { Sider } = Layout;

const AdminLayout = ({ component }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [ selectedKey, setSelectedKey ] = useState(['1'])

  function handleSelectKey(key) {
    setSelectedKey([`${key}`])
  }
  
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
          defaultSelectedKeys={selectedKey}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'User Management',
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'Posts Management',
            },
            {
              key: '4',
              icon: <LogoutOutlined  />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} component={component} />
    </Layout>
  );
};

export default AdminLayout;
