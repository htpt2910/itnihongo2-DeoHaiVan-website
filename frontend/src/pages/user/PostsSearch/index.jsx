import { Footer } from "../../../components/user/Footer"
import { Navbar } from "../../../components/user/Navbar"
import { PostSearch } from "../../../components/user/postssearch"
import "./homepage.css"

export const PostsSearch = ({ postsSearch, setPostsSearch }) => {
  return (
    <div>
      <Navbar postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
      <PostSearch postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
      <Footer />
    </div>
  )
}
