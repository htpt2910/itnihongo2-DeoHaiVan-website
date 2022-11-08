import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/user/Footer'
import { Navbar } from './components/user/Navbar'
import AdminLayout from './layouts/admin'
import Dashboard from './pages/admin/Dashboard'
import { Posts } from './pages/admin/Posts'
import { UserManagement } from './pages/admin/User'
import { NotFound } from './pages/NotFound'
import { About } from './pages/user/About'
import { Home } from './pages/user/Home'

function App() {
  const role = 2
  return (
    <BrowserRouter>
      {role === 1 ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/post" element={<Posts />} />
            <Route path="/" exact="true" element={<Home />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/admin/users"
              exact="true"
              element={<AdminLayout component={<UserManagement />} />}
            />
            <Route
              path="/admin"
              exact="true"
              element={<AdminLayout component={<Dashboard />} />}
            />
          </Routes>
        </>
      )}
      <Routes>
        <Route path="/admin/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
