import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import "./navbar.css";
import useToken from '../../../useToken';
import axios from 'axios';

export const Navbar = () => {
  const { token } = useToken();
  const [name, setName] = useState()
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
        setName(dt.name)
      })
      .catch((err) => console.log(err))
  }, [])

  const [collapse, setCollapse] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("toggler__icon");
  const navItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "About us", href: "/about" },
    { id: 3, label: name, href: "/profile" },
    { id: 4, label: "Logout", href: "/logout" },
  ];

  const onToggle = () => {
    collapse === "nav__menu"
      ? setCollapse("nav__menu nav__collapse")
      : setCollapse("nav__menu");

    toggleIcon === "toggler__icon"
      ? setToggleIcon("toggler__icon toggle")
      : setToggleIcon("toggler__icon");
  };

  return (
    <div className="nav__wrapper">
      <div className="container">
        <nav className="nav">
          <a href="/" className="nav__brand">
            Hai Van Quan
          </a>
          <div className="inputSearch">
            <input className='input' type="text" placeholder='Search...' />
            <div className="btnSearch">
              <SearchOutlined />
            </div>
          </div>
          <ul className={collapse}>
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a href={item.href} className="nav__link">
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
  );
};
