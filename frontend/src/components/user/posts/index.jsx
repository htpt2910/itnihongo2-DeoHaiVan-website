import { Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAxios } from "../../../useAxios";
import useToken from "../../../useToken";
import { Post } from "../post";
import "./posts.css";

export const Posts = () => {

  const { token } = useToken();
  const { fetchData, response, loading} = useAxios();

  useEffect(() => {
  fetchData({
      url:'/posts-approve/',
      method:'get',
      headers:{
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
  },[])

  return (
    <>
    {loading ? (<Spin size="large"/>):

    (<div className="posts">

      {response.reverse()?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>)}
    </>
  );
};
