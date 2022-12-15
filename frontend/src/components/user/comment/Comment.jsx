import { DeleteTwoTone } from "@ant-design/icons"
import { Popconfirm, Spin } from "antd"
import axios from "axios"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { useAxios } from "../../../useAxios"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"

export const Comment = ({ comment, comments, setComments }) => {
  const { token } = useToken()
  const { myInfo } = useContext(UserContext)
  const { fetchData:fetchUser, response:user, loading:user_loading} = useAxios();
  const { fetchData:deleteComment} = useAxios();

  useEffect(() => {
    fetchUser({
        url:`/users/${comment.comment_user_id}`,
        method:'get',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
  }, [])

  const handleDelete = (id) => {
      deleteComment({
        url:`/comment/${id}`,
        method:'delete',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
      setComments(comments.filter((cmt) => cmt.id !== id))
  }

  return (
    <>
    {user_loading ? (<Spin size="medium" />):
    (<div className="comment" key={user.name}>
      <img
        className="avatar"
        src={"data:image/png;base64," + user.image}
        alt=""
      />
      <div className="info">
        <span>{user.name}</span>
        <p>{comment.content}</p>
      </div>
      <span className="date">{moment(comment.comment_time).fromNow()}</span>
      {comment.comment_user_id === myInfo.id && (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            handleDelete(comment.id)
          }}
        >
          <DeleteTwoTone />
        </Popconfirm>
      )}
    </div>)}
    </>
  )
}
