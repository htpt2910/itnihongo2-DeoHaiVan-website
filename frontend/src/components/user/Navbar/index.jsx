import { SearchOutlined } from '@ant-design/icons';
import "./navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Navbar = ({postsSearch,setPostsSearch}) => {
  const [collapse, setCollapse] = useState("nav__menu")
  const [toggleIcon, setToggleIcon] = useState("toggler__icon")
  const [posts, setPost] = useState([])
  const [valueInput, setValueInput] = useState([])
  const navigate = useNavigate();
  const [oldPosts, setOldPosts] = useState("")
  const { token } = useToken();
  const [ navItems, setNavItems ]= useState([]);
  useEffect(() => {
    if (oldPosts!=posts){
      setOldPosts(postsSearch)
      setPostsSearch(posts)
      navigate("/postssearch")
      console.log(postsSearch)
    }
  },[postsSearch]);
 
  
    useEffect(() => {
      setNavItems([
        { id: 1, label: "Home", href: "/" },
        { id: 2, label: "About us", href: "/about" },
        { id: 3, label: "Login", href: "/login" },
        { id: 4, label: "Signup", href: "/signup" },
      ]);
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
      })
      .then((res) => {
        const dt = res.data
        setNavItems([
            { id: 1, label: "Home", href: "/" },
            { id: 2, label: "About us", href: "/about" },
            { id: 3, label: dt.name, href: "/profile" },
            { id: 4, label: "Logout", href: "/logout" },
          ]);
      })
      .catch((err) => console.log(err))
  }, [])

  const onToggle = () => {
    collapse === "nav__menu"
      ? setCollapse("nav__menu nav__collapse")
      : setCollapse("nav__menu");

    toggleIcon === "toggler__icon"
      ? setToggleIcon("toggler__icon toggle")
      : setToggleIcon("toggler__icon");
  };
  
  
  
  async function handleChange(event) {
    const val = event.target.value;
    setValueInput(val);
    console.log(val);
    
  }

  const postSearch = async () => {
   
    const data = await axios({
      method:"get",
      url:"http://localhost:8000/postssearch/"+ valueInput,
    })
    setPost(data.data);
    setPostsSearch(posts)
    
  }


  
  return (
    <div className="nav__wrapper">
      <div className="container">
        <nav className="nav">
          <a href="/" className="nav__brand" style={{textDecoration:'none'}}>
            Hai Van Quan
          </a>
          <div className="inputSearch">
            <input className='input' type="text" placeholder='Search...' onChange={handleChange} />
           <button className="btnSearch" onClick={postSearch} ><SearchOutlined /></button>
          </div>
          <ul className={collapse}>
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a href={item.href} className="nav__link" style={{textDecoration:'none'}}>
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
