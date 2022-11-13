import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { Posts } from './pages/admin/Posts'
import { User } from './pages/admin/User'
import { Home } from './pages/user/Home'
import { Login } from './pages/user/Login'
import { PostControl } from './pages/admin/PostControl'

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
