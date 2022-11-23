import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { PostControlComponent } from './pages/admin/PostControl/PostControlComponent'
import { Posts } from './pages/admin/Posts'
import { User } from './pages/admin/User'
import UserControlComponent from './pages/admin/UserControl/UserControlComponent'
import { Home } from './pages/user/Home'
import Signup from './pages/user/Signup'
import { Login } from './pages/user/Login'
import ProfilePage from "./pages/user/profile"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" exact="true" element={<Dashboard />} />
          <Route path="/admin/usercontrol" exact="true" element={<AdminLayout childcomp={<UserControlComponent />} />} />
          <Route path="/admin/postcontrol" exact="true" element={<AdminLayout childcomp={<PostControlComponent />} />} />
          <Route path="/login" exact="true" element={<Login />} />
          <Route path="/profile" exact="true" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

