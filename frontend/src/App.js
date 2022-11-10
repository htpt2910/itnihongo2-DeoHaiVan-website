import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer } from './components/user/Footer'
import { Navbar } from './components/user/Navbar'
import Dashboard from './pages/admin/Dashboard'
import { Logout } from './pages/admin/Logout'
import { Posts } from './pages/admin/Posts'
import { User } from './pages/admin/User'
import { Home } from './pages/user/Home'
import Signup from './pages/user/Signup'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" exact="true" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
