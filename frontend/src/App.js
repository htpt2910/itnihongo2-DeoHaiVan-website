import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { PostControlComponent } from './pages/admin/PostControl/PostControlComponent'
import { Posts } from './pages/admin/Posts'
import UserControlComponent from './pages/admin/UserControl/UserControlComponent'
import { Home } from './pages/user/Home'
import Signup from './pages/user/Signup'
import { Login } from './pages/user/Login'
import { PostsSearch } from './pages/user/PostsSearch'
import ProfilePage from "./pages/user/profile"
import { Navbar } from "./components/user/Navbar"
import { useState } from "react"
import useToken from './useToken';
import NotFound from './components/user/NotFound';

function App() {
  const [postsSearch, setPostsSearch] = useState([])
  const { token, setToken } = useToken();
  return (
    <>
      <Router>
        <Navbar postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={token? (<Navigate replace to={"/"} />):(<Signup />)} />
          <Route path="/postssearch" element={<PostsSearch postsSearch={postsSearch} setPostsSearch={setPostsSearch}/>} />
          <Route path="/admin" exact="true" element={<Dashboard />} />
          <Route path="/admin/usercontrol" exact="true" element={<AdminLayout childcomp={<UserControlComponent />} />} />
          <Route path="/admin/postcontrol" exact="true" element={<AdminLayout childcomp={<PostControlComponent />} />} />
          <Route path="/login" exact="true" element={token? (<Navigate replace to={"/"} />):(<Login setToken={setToken}/>)} />
          <Route path="/profile" exact="true" element={token? (<ProfilePage />):(<Login setToken={setToken}/>)} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

