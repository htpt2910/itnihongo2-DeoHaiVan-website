import { DeleteTwoTone } from "@ant-design/icons"
import { Popconfirm } from "antd"
import axios from "axios"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"

export const Comment = ({ comment, comments, setComments }) => {
  const { token } = useToken()
  const [user, setUser] = useState({})
  const { myInfo } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${comment.comment_user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => setComments(comments.filter((cmt) => cmt.id !== id)))
      .catch((err) => console.log(err))
  }

  return (
    <div className="comment" key={user.name}>
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
    </div>
  )
}
