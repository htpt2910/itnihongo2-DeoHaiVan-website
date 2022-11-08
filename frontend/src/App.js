import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer } from './components/user/Footer'
import { Navbar } from './components/user/Navbar'
import Dashboard from './pages/admin/Dashboard'
import { Posts } from './pages/admin/Posts'
import { User } from './pages/admin/User'
import { About } from './pages/user/About'
import { Home } from './pages/user/Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/admin" exact="true" element={<Dashboard />} />
        <Route path="/" exact="true" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
