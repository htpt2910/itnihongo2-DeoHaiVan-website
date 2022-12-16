import { Button, Form, Input, Modal, notification, Spin } from "antd"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../../../components/user/Footer"
import { Navbar } from "../../../components/user/Navbar"
import { Posts } from "../../../components/user/posts"
import { Stories } from "../../../components/user/stories"
import { useAxios } from "../../../useAxios"
import { UserContext } from "../../../userContext"
import useToken from "../../../useToken"
import "./homepage.css"

const { TextArea } = Input
const d = new Date()
let month = d.getMonth() + 1
var date = d.getFullYear() + "-" + month + "-" + d.getDate()
var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

export const Home = ({ postsSearch, setPostsSearch }) => {
  const navigate = useNavigate()
  const { token } = useToken()
  const [open, setOpen] = useState(false)
  const { fetchData: createPost } = useAxios()
  const {
    fetchData: fetchInfo,
    response: info,
    loading: info_loading,
  } = useAxios()

  const [form] = Form.useForm()
  const [imagebase64, setImage] = useState()
  const { myInfo, setMyInfo } = useContext(UserContext)
  const [id, setId] = useState()
  var dateCurrent = date + " " + time

  useEffect(() => {
    fetchInfo({
      url: "/users/me",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
  }, [])
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        setId(res.data.id)
      })
      .catch((err) => console.log(err))
  })
  const [websckt, setWebsckt] = useState()
  const openNotification = (data) => {
    console.log("data.title")
    if (data.status)
      notification.success({
        message: "Thông Báo",
        description: `Bài đăng ${data.title} được bạn tạo vào lúc ${data.post_time} đã được chấp thuận, hãy tải lại trang để kiểm tra hoặc bấm vào để chuyển thẳng đến bài đăng.`,
        duration: 10,
      })
    else {
      notification.error({
        message: "Thông Báo",
        description: `Bài đăng ${data.title} được bạn tạo vào lúc ${data.post_time} đã bị từ chối vì đã bị vi phạm tiêu chuẩn cộng đồng.`,
        duration: 10,
      })
    }
  }
  useEffect(() => {
    const url = `ws://localhost:8000/ws/${token}`
    const ws = new WebSocket(url)
    ws.onmessage = (e) => {
      if (JSON.parse(e.data).user_id) openNotification(JSON.parse(e.data))
    }
    setWebsckt(ws)
    return () => ws.close()
  }, [])

  const onFinish = (values) => {
    createPost({
      url: "/post/",
      method: "post",
      body: {
        title: values.title,
        content: values.content,
        post_time: dateCurrent,
        image: imagebase64,
        rating: 1,
        user_id: myInfo.id,
        place_id: 1,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
    websckt.send(
      JSON.stringify({
        id: myInfo.id,
        title: values.title,
        name: myInfo.name,
        post_time: dateCurrent,
      })
    )
    form.resetFields()
    setOpen(false)
  }
  let base64String = ""
  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0]

    var reader = new FileReader()
    console.log("next")

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
      setImage(base64String)
    }
    reader.readAsDataURL(file)
  }

  const showModal = () => {
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <div>{info_loading ? <Spin size="large" /> : setMyInfo(info)}</div>
      <div>
        {!myInfo.is_admin && (
          <div>
            <Navbar postsSearch={postsSearch} setPostsSearch={setPostsSearch} />
            <Stories />
            <>
              <div className="createPost">
                <div className="postContainer">
                  {token ? (
                    <Button className="btnCreate" onClick={showModal}>
                      Create Post
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <Modal
                open={open}
                title="Create post"
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                onCancel={handleCancel}
              >
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
                      placeholder="Title..."
                      className="title input-post"
                    />
                  </Form.Item>
                  <Form.Item name="content" label="Content">
                    <TextArea
                      rows={4}
                      placeholder="Content..."
                      className="content input-post"
                    />
                  </Form.Item>

                  <Form.Item name="image" label="Image">
                    <Input
                      type="file"
                      onChange={imageUploaded}
                      className="content input-post"
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
              </Modal>
            </>
            <Posts />
            <Footer />
          </div>
        )}
        {myInfo.is_admin && navigate("/admin/postcontrol")}
      </div>
    </div>
  )
}
