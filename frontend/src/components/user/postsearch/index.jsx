import {
  EllipsisOutlined
} from "@ant-design/icons";
import React from "react";
import "./post.css";

export const Post_Search = ({ post }) => {
  // const liked = false;
  // const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="post">
      <div className="post-container">
        <div className="user">
          <div className="userInfo">
            <img className="avatar" src={post.image} alt="" />
            <div className="details">
              <span className="name">User</span>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <EllipsisOutlined />
        </div>
        <div className="content">
          <p>{post.title}</p>
          <img className="post-image" src={post.image} alt="" />
        </div>
        {/* <div className="info">
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
        {commentOpen && <Comments />} */}
      </div>
    </div>
  );
};
