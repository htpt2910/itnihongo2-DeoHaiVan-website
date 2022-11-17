import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { PostControl } from './pages/admin/PostControl'
import { Posts } from './pages/admin/Posts'
import { User } from './pages/admin/User'
import { UserControl } from './pages/admin/UserControl'
import { Home } from './pages/user/Home'
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
          <Route path="/admin" exact="true" element={<Dashboard />} />
          <Route path="/login" exact="true" element={<Login />} />
          <Route path="/postcontrol" exact="true" element={<PostControl />} />
          <Route path="/usercontrol" exact="true" element={<UserControl />} />
          <Route path="/profile" exact="true" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

