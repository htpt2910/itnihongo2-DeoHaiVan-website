import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/user/Navbar";
import {Home} from "./pages/user/Home";
import {Login} from "./pages/user/Login";
import {Signup} from "./pages/user/Signup";
import {About} from "./pages/user/About";
import {Footer} from "./components/user/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
