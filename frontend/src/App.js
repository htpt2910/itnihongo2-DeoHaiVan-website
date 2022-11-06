import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/user/Navbar";
//import {Home} from "./pages/user/Home";
import {Logout} from "./pages/admin/Logout";
import {Posts} from "./pages/admin/Posts";
import {User} from "./pages/admin/User";
import {Footer} from "./components/user/Footer";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/admin";

function App() {
  return (
    <>
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" exact="true" element={<AdminLayout />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" exact="true" element={<Dashboard />} />
        </Routes>
       < Footer/>
      </Router>
    </>
  );
}

export default App;
