import axios from "axios";
import React, {useEffect, useState} from "react";
import useMyInfo from "../../../useMyInfo";
import useToken from "../../../useToken";
import {Comment} from "./Comment";
import "./comments.css";

export const Comments = ({comments, post_id}) => {
  const {myInfo} = useMyInfo();
  const {token} = useToken();
  const [message, setMessage] = useState("");

  var datetime = new Date();
  var day =
    datetime.getFullYear() +
    "-" +
    datetime.getMonth() +
    "-" +
    datetime.getDay();
  var time =
    datetime.getHours() +
    ":" +
    datetime.getMinutes() +
    ":" +
    datetime.getSeconds();
  var dateCurrent = day + " " + time;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleComment = (postId, userId, content) => {
    axios
      .post(
        "http://localhost:8000/comment/",
        {
          content: content,
          comment_time: dateCurrent,
          comment_user_id: userId,
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

  return (
    <div className="comments">
      {myInfo !== null && (
        <div className="write">
          <img
            className="avatar"
            src={"data:image/png;base64," + myInfo.image}
            alt=""
          />
          <input
            className="input-text"
            type="text"
            placeholder="write a comment"
            onChange={handleChange}
            value={message}
          />
          <button
            onClick={() => {
              handleComment(post_id, myInfo.id, message);
              window.location.reload();
            }}
          >
            Send
          </button>
        </div>
      )}
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};
