import React, { useMemo } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { PostControlComponent } from './pages/admin/PostControl/PostControlComponent'
import UserControlComponent from './pages/admin/UserControl/UserControlComponent'
import { Home } from './pages/user/Home'
import Signup from './pages/user/Signup'
import { Login } from './pages/user/Login'
import { PostsSearch } from './pages/user/PostsSearch'
import ProfilePage from "./pages/user/profile"
import { useState } from "react"
import NotFound from './components/user/NotFound';
import { UserContext } from './userContext';

function App() {
  const [postsSearch, setPostsSearch] = useState([])
  const [myInfo, setMyInfo] = useState({is_admin:false})
  const providerValue = useMemo(() => ({ myInfo, setMyInfo}), [myInfo, setMyInfo])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact="true" element={<UserContext.Provider value={providerValue}><Home postsSearch={postsSearch} setPostsSearch={setPostsSearch}/></UserContext.Provider>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postssearch" element={<PostsSearch postsSearch={postsSearch} setPostsSearch={setPostsSearch}/>} />
          <Route path="/admin" exact="true" element={<Dashboard />} />
          <Route path="/admin/usercontrol" exact="true" element={<AdminLayout childcomp={<UserControlComponent />} />} />
          <Route path="/admin/postcontrol" exact="true" element={<AdminLayout childcomp={<PostControlComponent />} />} />
          <Route path="/login" exact="true" element={<Login />} />
          <Route path="/prof  ile" exact="true" element={<ProfilePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

