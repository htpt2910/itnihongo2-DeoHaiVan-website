import React from "react";
import { Post_Search } from "../postsearch";
import { useEffect, useState } from "react";
import axios from "axios";
import "./posts.css";

export const PostSearch = ({postsSearch,setPostsSearch}) => {
  useEffect(() => {
    setPostsSearch(postsSearch);
  }, [postsSearch]);

  return (
    <div className="posts">
      {postsSearch.map((post) => (
        <Post_Search post={post} key={post.id} />
      ))}
    </div>
  );
};

