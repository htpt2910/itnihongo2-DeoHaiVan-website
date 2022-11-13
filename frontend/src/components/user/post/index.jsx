import {
  AliwangwangOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Comments } from "../comment";
import "./post.css";

export const Post = ({ post }) => {
  const liked = false;
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="post">
      <div className="post-container">
        <div className="user">
          <div className="userInfo">
            <img className="avatar" src={post.profilePic} alt="" />
            <div className="details">
              <span className="name">{post.name}</span>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <EllipsisOutlined />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img className="post-image" src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <HeartFilled /> : <HeartOutlined />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <AliwangwangOutlined />
            12 Comments
          </div>
          <div className="item">
            <ShareAltOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};
