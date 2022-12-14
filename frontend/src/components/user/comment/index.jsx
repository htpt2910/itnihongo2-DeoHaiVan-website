import { Spin } from "antd"
import React, { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useAxios } from "../../../useAxios"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"
import { Comment } from "./Comment"
import "./comments.css"

export const Comments = ({ comments, post_id, setComments }) => {
  const { myInfo }  = useContext(UserContext)
  const { token } = useToken()
  const [message, setMessage] = useState("")
  const { fetchData, response, loading} = useAxios();

  const d = new Date()
  let month = d.getMonth() + 1
  var date = d.getFullYear() + "-" + month + "-" + d.getDate()
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
  var dateCurrent = date + " " + time

  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  useEffect(() => {
    if(response.content){
    setComments((prev) => [...prev, response])
    setMessage("")
  }
  }, [response])
  const handleComment = (postId, userId, content) => {
    fetchData({
        url:'/comment/',
        method:'post',
        body:{
          content: content,
          comment_time: dateCurrent,
          comment_user_id: userId,
          post_id: postId,
        },
        headers:{
          'Content-Type': 'application/json',
          Authorization: ` Bearer ${token}`,
        },
      });
  }
  return (
    <div className="comments">
      {myInfo.email != null && (
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
              handleComment(post_id, myInfo.id, message)
            }}
          > 
            Send
          </button>
        </div>
      )}
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </div>
  )
}
