
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';

const { Header, Content } = Layout;

export const AdminHeader = ({ collapsed, setCollapsed, component }) => {
  return (
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
          {component}
        </Content>
      </Layout>
  )
}
