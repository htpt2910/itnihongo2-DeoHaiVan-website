import { Footer } from "../../../components/user/Footer";
import { Navbar } from "../../../components/user/Navbar";
import { PostSearch } from "../../../components/user/postssearch";
import { useState } from "react";
import "./homepage.css";
import { useEffect } from "react";

export const PostsSearch = ({postsSearch,setPostsSearch}) => {

  return (
    <div>
      <PostSearch postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
      <Footer />
    </div>
  );
};
// export default PostsSearch;
