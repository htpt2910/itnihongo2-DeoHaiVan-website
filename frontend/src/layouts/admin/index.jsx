import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import "antd/dist/antd.css"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/mountain.png"
import "./layout.css"

const { Header, Sider, Content } = Layout
const AdminLayout = ({ childcomp }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-admin">
          <p className="mount">Deo Hai Van</p>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <Menu className="header-menu">
          <Menu.Item key="1">
            <Link
              to={"/admin/usercontrol"}
              style={{ color: "gray", textDecoration: "none" }}
            >
              User Management
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link
              to="/admin/postcontrol"
              style={{ color: "gray", textDecoration: "none" }}
            >
              Post Management
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ color: "gray" }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, height: 67 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 720,
          }}
        >
          {childcomp}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
