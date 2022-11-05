import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./user/pages/Home";
import { About } from "./user/pages/About";
import { Signup } from "./user/pages/Signup";
import { Login } from "./user/pages/Login";
import { Footer } from "./user/components/Footer";
import { Navbar } from "./user/components/Navbar";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" exact="true" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/" exact="true" element={<Dashboard />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
