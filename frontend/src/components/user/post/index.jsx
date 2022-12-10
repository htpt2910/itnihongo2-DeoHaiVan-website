import {
  AliwangwangOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Comments } from "../comment";
import moment from 'moment';
import "./post.css";
import useToken from "../../../useToken";
import axios from "axios";

export const Post = ({ post }) => {
  const liked = false;
  const [commentOpen, setCommentOpen] = useState(false);
  const {token} = useToken()
  const [imagebase64, setImage] = useState()
  const [userID, setUserID] = useState(0)
  const [hajimete_email, setHajimete_email] = useState("")
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  })

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/"+post.user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then(async (res) => {
        const dt = res.data
        console.log("data: ", dt)
        setUserID(dt.id)
        setProfile({
          name: dt.name,
          email: dt.email,
          gender: dt.gender ? "Nam" : "Nữ",
          age: dt.age,
          image: dt.image,
        })
        setImage(dt.image)
        setHajimete_email(dt.email)
      })

      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="post">
      <div className="post-container">
        <div className="user">
          <div className="userInfo">
            <img className="avatar" src={"data:image/png;base64," + profile.image} alt="" />
            <div className="details">
              <span className="name">{profile.name}</span>
              <span className="date">{moment(post.post_time).fromNow()}</span>
            </div>
          </div>
          <EllipsisOutlined />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img className="post-image" src={"data:image/png;base64," + post.image} alt="" />
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
