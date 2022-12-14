import React from "react";
import { Post_Search } from "../postsearch";
import { useEffect } from "react";
import "./posts.css";
import { useAxios } from "../../../useAxios";
import useToken from "../../../useToken";

export const PostSearch = ({postsSearch,setPostsSearch}) => {
  const {token} = useToken()
  const { fetchData:fetchInfo, response:info } = useAxios();
  useEffect(() => {
    setPostsSearch(postsSearch);
  }, [postsSearch]);
  useEffect(() => {
    fetchInfo({
        url:'/users/me',
        method:'get',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
  }, [])

  return (
    <div className="posts">
      {postsSearch.map((post) => (
        <Post_Search post={post} key={post.id} myInfo={info} />
      ))}
    </div>
  );
};

