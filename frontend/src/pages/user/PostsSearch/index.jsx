import { Footer } from "../../../components/user/Footer";
import { PostSearch } from "../../../components/user/postssearch";
import "./homepage.css";

export const PostsSearch = ({postsSearch,setPostsSearch}) => {

  return (
    <div>
      <PostSearch postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
      <Footer />
    </div>
  );
};
// export default PostsSearch;
