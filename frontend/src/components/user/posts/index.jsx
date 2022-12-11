import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import useToken from "../../../useToken";
import { Post } from "../post";
import "./posts.css";

export const Posts = () => {

  const [posts, setPosts] = useState([])
  const { token } = useToken();

  useEffect(() => {
    axios.get(`http://localhost:8000/posts?skip=0&limit=10`,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
    }).then((res) =>{
      setPosts(res.data.reverse())
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    })
  },[])

  return (
    <div className="posts">
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
