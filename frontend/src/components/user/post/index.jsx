import {
  AliwangwangOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons"
import { Button, Dropdown, Form, Input, Modal, Spin } from "antd"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../../useAxios"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"
import { Comments } from "../comment"
import "./post.css"

export const Post = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false)
  const navigate = useNavigate()
  const { token } = useToken()
  const { myInfo } = useContext(UserContext)
  const [likes, setLikes] = useState(post.likes.length)
  const [comments, setComments] = useState(post.comments)
  const { fetchData:fetchLike} = useAxios();
  const { fetchData:fetchUser, response:r_user, loading:l_user} = useAxios();
  const { fetchData:fetchPost, response:r_post} = useAxios();

  const { TextArea } = Input
  const items = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
  ]

  const d = new Date()
  let month = d.getMonth() + 1
  var date = d.getFullYear() + "-" + month + "-" + d.getDate()
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

  const [imagebase64, setImage] = useState()

  useEffect(() => {
    if (myInfo) {
      post.likes.map((i) => {
        if (i.like_user_id === myInfo.id) {
          setLiked(true)
        }
      })
    }
  }, [])

  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  var dateCurrent = date + " " + time
  let base64String = ""

  const handleAction = async (e) => {
    if (e.key == 1) {
      setOpen(true)
      try {
        fetchPost({
          url:`/posts/${post.id}`,
          method:'get',
          headers:{
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        fetchPost({
          url:`/post/${post.id}`,
          method:'delete',
          headers:{
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
        });
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onFinish = (values) => {
    fetchPost({
      url:`/post/${post.id}`,
      method:'patch',
      body:{
        title: values.title ? values.title : r_post.title,
        content: values.content ? values.content : r_post.content,
        post_time: dateCurrent,
        image: imagebase64 ? imagebase64 : r_post.image,
        rating: 1,
        user_id: r_post.user_id,
        place_id: 1,
      },
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${token}`,
      },
    });
    setOpen(false)
    window.location.reload()
  }

  useEffect(() => {
    fetchUser({
      url:`/users/${post.user_id}`,
      method:'get',
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${token}`,
      },
    });
  }, [])

  const handleLike = (postId, userId) => {
    setLikes(likes + 1)
    fetchLike({
      url:'/like/',
      method:'post',
      body:{
        like_user_id: userId,
        post_id: postId,
      },
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${token}`,
      },
    });
  }

  const handleDeleteLike = (postId, userId) => {
    setLikes(likes - 1)
    fetchLike({
      url:`/like/${postId}/{user_like_id}?like_user_id=${userId}`,
      method:'delete',
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${token}`,
      },
    });
  }

  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0]
    if (file) {
      var reader = new FileReader()
      reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
        setImage(base64String)
      }
      reader.readAsDataURL(file)
    }
    setImage(r_post.image)
  }

  return (
    <div className="post">
      <div className="post-container" key={post.id}>
        <div className="user">
          {l_user ? <Spin />:
          <div className="userInfo">
            <img
              className="avatar"
              src={"data:image/png;base64," + r_user.image}
              alt=""
            />
            <div className="details">
              <span className="name">{r_user.name}</span>
              <span className="date">{moment(post.post_time).fromNow()}</span>
            </div>
          </div>}
          {post.user_id === myInfo?.id ? (
            <Dropdown.Button
              menu={{ items, onClick: handleAction }}
              className="action"
              onClick={handleAction}
            />
          ) : (
            <></>
          )}

          <Modal
            open={open}
            title="Edit post"
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={handleCancel}
          >
            {r_post.title != null && (
              <Form
                name="create_post"
                form={form}
                className="create_post_form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item name="title" label="Title">
                  <Input
                    name="title"
                    placeholder="Title..."
                    className="title input-post"
                    defaultValue={r_post.title}
                  />
                </Form.Item>
                <Form.Item name="content" label="Content">
                  <TextArea
                    name="content"
                    rows={4}
                    placeholder="Content..."
                    className="content input-post"
                    defaultValue={r_post.content}
                  />
                </Form.Item>

                <Form.Item name="image" label="Image">
                  <Input
                    type="file"
                    onChange={imageUploaded}
                    className="content input-post"
                    name="image"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submitButton"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Modal>
        </div>
        <div className="content">
          <p className="title-p">{post.title}</p>
          <p>{post.content}</p>
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
                style={{ color: "red" }}
                onClick={() => {
                  handleDeleteLike(post.id, myInfo.id)
                  setLiked(false)
                }}
              />
            ) : (
              <HeartOutlined
                onClick={() => {
                  if (myInfo.email == null) {
                    navigate("/login")
                  } else {
                    handleLike(post.id, myInfo.id)
                    setLiked(true)
                  }
                }}
              />
            )}
            {likes} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <AliwangwangOutlined />
            {comments.length} Comments
          </div>
        </div>
        {commentOpen && (
          <Comments
            comments={comments}
            setComments={setComments}
            post_id={post.id}
          />
        )}
      </div>
    </div>
  )
}
