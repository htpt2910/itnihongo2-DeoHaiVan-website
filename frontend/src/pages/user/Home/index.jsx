import { Button, Form, Input, Modal } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../../../components/user/Footer"
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

export const Home = () => {
  const navigate = useNavigate()
  const { token } = useToken()
  const [open, setOpen] = useState(false)
  const { fetchData, response, error } = useAxios();

  const [form] = Form.useForm()
  const [imagebase64, setImage] = useState()
  const { myInfo, setMyInfo } = useContext(UserContext)
  var dateCurrent = date + " " + time

  useEffect(() => {
    const fetch = async () =>{
      const data = await fetchData({
        url:'/users/me',
        method:'get',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
      setMyInfo(response)
    }
    fetch().catch(console.log(error))
  }, [response])

  const onFinish = (values) => {
    fetchData({
      url:'/post/',
      method:'post',
      body:{
        title: values.title,
        content: values.content,
        post_time: dateCurrent,
        image: imagebase64,
        rating: 1,
        user_id: myInfo.id,
        place_id: 1,
      },
      headers:{
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
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
    <div>{!response.is_admin && (<div>
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
              <Input placeholder="Title..." className="title input-post" />
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
              <Button type="primary" htmlType="submit" className="submitButton">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
      <Posts />
      <Footer />
    </div>)}
    {response.is_admin && navigate('/admin')}
    </div>
  )
}
