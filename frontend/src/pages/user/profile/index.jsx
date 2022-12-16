import { Footer } from "../../../components/user/Footer"
import { Navbar } from "../../../components/user/Navbar/"
import Profile from "../../../components/user/profile"
const ProfilePage = ({ postsSearch, setPostsSearch }) => {
  return (
    <>
      <Navbar postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
      <Profile />
      <Footer />
    </>
  )
}
export default ProfilePage
