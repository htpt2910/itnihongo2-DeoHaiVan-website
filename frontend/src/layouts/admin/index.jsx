import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { UserOutlined, VideoCameraOutlined, LogoutOutlined } from "@ant-design/icons"
import "antd/dist/antd.css"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/mountain.png"
import useToken from "../../useToken"
import "./layout.css"

const { Header, Sider, Content } = Layout
const AdminLayout = ({ childcomp }) => {
  let navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken();
  const [ admin, setAdmin] = useState()

  useEffect(() => {
  axios
    .get("http://localhost:8000/users/me", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ' Bearer ' + token
      }
    })
    .then((res) => {
      const dt = res.data
      if (dt.is_admin)
      {
        setAdmin(dt.name)
      }
      else
      {
        navigate("/")
        alert('Bạn không có quyền truy cập!!!')
      }
    })
    .catch((err) =>{ navigate("/");alert('Bạn không có quyền truy cập!!')})
  }, [])
  if(admin)
  return (
    <Layout>
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
          <img src={logo} alt="logo" className="logo" />
          <a className="mount" href="/" style={{textDecoration:'None'}}>Deo Hai Van</a>
          {<span className="userlogin" style={{color:'white',marginLeft: '700px'}}>{admin}</span>}
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
