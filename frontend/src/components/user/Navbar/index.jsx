import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./navbar.css";

export const Navbar = () => {
  const [collapse, setCollapse] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("toggler__icon");

  const navItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "About us", href: "/about" },
    { id: 3, label: "Sign up", href: "/signup" },
    { id: 4, label: "Login", href: "/login" },
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
          <a href="/" className="nav__brand" style={{ textDecoration: "none" }}>
            Deo Hai Van
          </a>
          <div className="inputSearch">
            <input className="input" type="text" placeholder="Search..." />
            <div className="btnSearch">
              <SearchOutlined />
            </div>
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
  );
};
