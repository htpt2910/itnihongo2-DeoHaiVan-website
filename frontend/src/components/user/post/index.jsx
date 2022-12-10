import {
  AliwangwangOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Comments} from "../comment";
import moment from "moment";
import "./post.css";
import useToken from "../../../useToken";
import axios from "axios";
import useMyInfo from "../../../useMyInfo";
import {useNavigate} from "react-router-dom";

export const Post = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const navigate = useNavigate();
  const {token} = useToken();
  const [imagebase64, setImage] = useState();
  const [userID, setUserID] = useState(0);
  const [hajimete_email, setHajimete_email] = useState("");
  const {myInfo} = useMyInfo();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  });

  useEffect(() => {
    if (token) {
      post.likes.map((i) => {
        if (i.like_user_id === myInfo.id) {
          setLiked(true);
        }
      });
    }
  }, [post, liked]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/" + post.user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then(async (res) => {
        const dt = res.data;
        console.log("data: ", dt);
        setUserID(dt.id);
        setProfile({
          name: dt.name,
          email: dt.email,
          gender: dt.gender ? "Nam" : "Nữ",
          age: dt.age,
          image: dt.image,
        });
        setImage(dt.image);
        setHajimete_email(dt.email);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleLike = (postId, userId) => {
    axios
      .post(
        "http://localhost:8000/like/",
        {
          like_user_id: userId,
          post_id: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelateLike = (postId, userId) => {
    axios
      .delete(
        `http://localhost:8000/like/${postId}/{user_like_id}?like_user_id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="post">
      <div className="post-container">
        <div className="user">
          <div className="userInfo">
            <img
              className="avatar"
              src={"data:image/png;base64," + profile.image}
              alt=""
            />
            <div className="details">
              <span className="name">{profile.name}</span>
              <span className="date">{moment(post.post_time).fromNow()}</span>
            </div>
          </div>
          <EllipsisOutlined />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img
            className="post-image"
            src={"data:image/png;base64," + post.image}
            alt=""
          />
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <HeartFilled
                style={{color: "red"}}
                onClick={() => {
                  handleDelateLike(post.id, myInfo.id);
                  window.location.reload();
                }}
              />
            ) : (
              <HeartOutlined
                onClick={() => {
                  if (myInfo === null) {
                    navigate("/login");
                  } else {
                    handleLike(post.id, myInfo.id);
                    window.location.reload();
                  }
                }}
              />
            )}
            {post.likes.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <AliwangwangOutlined />
            {post.comments.length} Comments
          </div>
          <div className="item">
            <ShareAltOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments comments={post.comments} post_id={post.id} />}
      </div>
    </div>
  );
};
