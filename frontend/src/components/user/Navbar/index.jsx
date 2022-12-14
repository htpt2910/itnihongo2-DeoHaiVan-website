import { SearchOutlined } from "@ant-design/icons"
import axios from "axios"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../../useAxios"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"
import "./navbar.css"

export const Navbar = ({ postsSearch, setPostsSearch }) => {
  const [collapse, setCollapse] = useState("nav__menu")
  const [toggleIcon, setToggleIcon] = useState("toggler__icon")
  const [posts, setPost] = useState([])
  const navigate = useNavigate()
  const [oldPosts, setOldPosts] = useState("")
  const [navItems, setNavItems] = useState([])
  const { myInfo } = useContext(UserContext)
  const { fetchData,response } = useAxios()
  useEffect(() => {
    if (oldPosts != posts) {
      setOldPosts(postsSearch)
      setPostsSearch(posts)
      navigate("/postssearch")
      console.log(postsSearch)
    }
  }, [postsSearch])

  useEffect(() => {
    if(myInfo.email)
    {
      setNavItems([
        { id: 1, label: "Home", href: "/" },
        { id: 2, label: "About us", href: "/about" },
        { id: 3, label: myInfo.name, href: "/profile" },
        { id: 4, label: "Logout", href: "/logout" },
      ])
    }
    else
    {
      setNavItems([
        { id: 1, label: "Home", href: "/" },
        { id: 2, label: "About us", href: "/about" },
        { id: 3, label: "Login", href: "/login" },
        { id: 4, label: "Signup", href: "/signup" },
      ])
    }
  }, [myInfo])

  const onToggle = () => {
    collapse === "nav__menu"
      ? setCollapse("nav__menu nav__collapse")
      : setCollapse("nav__menu")

    toggleIcon === "toggler__icon"
      ? setToggleIcon("toggler__icon toggle")
      : setToggleIcon("toggler__icon")
  }

  async function handleChange(event) {
    const val = event.target.value
    fetchData({
      url:`/postssearch/${val}`,
      method:'get',
      headers:{
        'Content-Type': 'application/json',
      },
    });
  }

  const postSearch = async () => {
    setPost(response)
    setPostsSearch(response.reverse())
  }

  return (
    <div className="nav__wrapper">
      <div className="container">
        <nav className="nav">
          <a href="/" className="nav__brand" style={{ textDecoration: "none" }}>
            Hai Van Quan
          </a>
          <div className="inputSearch">
            <input
              className="input"
              type="text"
              placeholder="Search..."
              onChange={handleChange}
            />
            <button className="btnSearch" onClick={postSearch}>
              <SearchOutlined />
            </button>
          </div>
          <ul className={collapse}>
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a
                  href={item.href}
                  className="nav__link"
                  style={{ textDecoration: "none" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={toggleIcon} onClick={onToggle}>
            <div className="line__1"></div>
            <div className="line__2"></div>
            <div className="line__3"></div>
          </div>
        </nav>
      </div>
    </div>
  )
}
