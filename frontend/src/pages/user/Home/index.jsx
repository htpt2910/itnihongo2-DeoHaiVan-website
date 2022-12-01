import { Footer } from "../../../components/user/Footer";
import { Navbar } from "../../../components/user/Navbar";
import { Posts } from "../../../components/user/posts";
import { Stories } from "../../../components/user/stories";
import "./homepage.css";
import React, { useState,useEffect } from 'react';
import { Button, Modal,Input,Form } from 'antd';
import axios from 'axios';
import useToken from '../../../useToken';

const { TextArea } = Input;
var datetime = new Date()
var day = datetime.getFullYear() + "-" + datetime.getMonth() + "-" + datetime.getDay()
var time = datetime.getHours() +":"+ datetime.getMinutes() +":"+ datetime.getSeconds()

export const Home = () => {
  const [userid, seUserid] = useState()
  const { token } = useToken();

  const [form] = Form.useForm();
  const [ imagebase64, setImage] = useState();
    var dateCurrent = day +" "+ time;

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
      })
      .then((res) => {
        const dt = res.data
        console.log("data: ", dt)
        seUserid(dt.id)
      })
      .catch((err) => console.log(err))
  }, [])


const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios
      .post("http://localhost:8000/post/", {
        "title": values.title,
        "content": values.content,
        "post_time": dateCurrent,
        "image": imagebase64,
        "rating": 1,
        "user_id" : userid,
        "place_id": 1,
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
      })
      .then((res) => {
        window.location = "/"
      })
      .catch((err) => {
      alert(err.response.data.detail)
      console.log(err)
    })
    setOpen(false);
  };
  let base64String = "";
  function imageUploaded() {
      var file = document.querySelector(
          'input[type=file]')['files'][0];
    
      var reader = new FileReader();
      console.log("next");
        
      reader.onload = function () {
          base64String = reader.result.replace("data:", "")
              .replace(/^.+,/, "");
              setImage(base64String)
      }
      reader.readAsDataURL(file);
  }
  

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Navbar />
      <Stories />
      <>
      <div className="createPost">
        <div className="postContainer">
          <Button className="btnCreate" onClick={showModal}>
            Create Post
          </Button>
        </div>
      </div>
      
      <Modal
        open={open}
        title="Create post"
        okButtonProps={{style: {display: "none"}}}
        cancelButtonProps={{style: {display: "none"}}}
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
      <Form.Item
          name="title"
          label="Title"
        >
          <Input placeholder="Title..." className="title input-post" /> 
        </Form.Item>
      <Form.Item
          name="content"
          label="Content"
        >
          <TextArea rows={4} placeholder="Content..." className="content input-post" /> 
        </Form.Item>
        
        <Form.Item
        name="image"
        label="Image"
      >
        <Input type='file' onChange={imageUploaded} className="content input-post"/>
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
    </div>
  );
};
