import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, Menu, notification, Spin } from "antd"
import { UserOutlined, VideoCameraOutlined, LogoutOutlined } from "@ant-design/icons"
import "antd/dist/antd.css"
import React, { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import useToken from "../../useToken"
import "./layout.css"
import { useAxios } from "../../useAxios"

const { Header, Sider, Content } = Layout
const AdminLayout = ({ childcomp }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken();
  const { fetchData:fetchInfo, response:info, loading:info_loading} = useAxios();

  useEffect(() => {
    fetchInfo({
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
    {info_loading?<Spin />:
    (info.is_admin?<Layout>  
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <div className="logo-admin">
          
        </div>
        <Menu className="header-menu">
          {/* <Menu.Item key="1">
            <img src={logo} alt="logo" className="logo" />
            <a className="mount" href="/" style={{textDecoration:'None' , color:'white',fontSize:'15px'}}>Deo Hai Van</a>
          </Menu.Item> */}
          <Menu.Item key="1"><UserOutlined />
            <Link
              to={"/admin/usercontrol"}
              style={{ color: "white", textDecoration: "none" }}
            >
              User Management
            </Link>
          </Menu.Item>
          <Menu.Item key="2"><VideoCameraOutlined />
            <Link
              to="/admin/postcontrol"
              style={{ color: "white", textDecoration: "none" }}
            >
              Post Management
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ color: "gray" }}><LogoutOutlined />
            <Link
              to="/logout"
              style={{ color: "white", textDecoration: "none" }}
            >
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, height: 67}}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <img src={"data:image/png;base64," + info.image} alt="logo" className="logo" />
          <a className="mount" href="/" style={{textDecoration:'None'}}>{info.name}</a>
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
    </Layout>:<Navigate to={'/'} replace/>)}
    </>
  )
}

export default AdminLayout
