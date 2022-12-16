import React, { useMemo, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NotFound from "./components/user/NotFound"
import AdminLayout from "./layouts/admin"
import Dashboard from "./pages/admin/Dashboard"
import { Logout } from "./pages/admin/Logout"
import { PostControlComponent } from "./pages/admin/PostControl/PostControlComponent"
import UserControlComponent from "./pages/admin/UserControl/UserControlComponent"
import { Home } from "./pages/user/Home"
import { Login } from "./pages/user/Login"
import { PostsSearch } from "./pages/user/PostsSearch"
import ProfilePage from "./pages/user/profile"
import Signup from "./pages/user/Signup"
import { UserContext } from "./userContext"

function App() {
  const [postsSearch, setPostsSearch] = useState([])
  const [myInfo, setMyInfo] = useState({ is_admin: false })
  const providerValue = useMemo(
    () => ({ myInfo, setMyInfo }),
    [myInfo, setMyInfo]
  )
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact="true"
            element={
              <UserContext.Provider value={providerValue}>
                <Home
                  postsSearch={postsSearch}
                  setPostsSearch={setPostsSearch}
                />
              </UserContext.Provider>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/postssearch"
            element={
              <UserContext.Provider value={providerValue}>
                <PostsSearch
                  postsSearch={postsSearch}
                  setPostsSearch={setPostsSearch}
                />{" "}
              </UserContext.Provider>
            }
          />
          <Route
            path="/profile"
            exact="true"
            element={
              <UserContext.Provider value={providerValue}>
                <ProfilePage
                  postsSearch={postsSearch}
                  setPostsSearch={setPostsSearch}
                />
              </UserContext.Provider>
            }
          />
          <Route path="/admin" exact="true" element={<Dashboard />} />
          <Route
            path="/admin/usercontrol"
            exact="true"
            element={<AdminLayout childcomp={<UserControlComponent />} />}
          />
          <Route
            path="/admin/postcontrol"
            exact="true"
            element={<AdminLayout childcomp={<PostControlComponent />} />}
          />
          <Route path="/login" exact="true" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
