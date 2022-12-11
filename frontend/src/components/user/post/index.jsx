import {
  AliwangwangOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Dropdown, Modal,Form, Input, Button } from 'antd';
import { Comments } from "../comment";
import "./post.css";
import axios from "axios";
import useToken from "../../../useToken";

const { TextArea } = Input;
const items = [
  {
    key: '1',
    label: 'Edit',
  },
  {
    key: '2',
    label: 'Delete',
  },
];
export const Post = ({ post }) => {
  const liked = false;
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [ imagebase64, setImage] = useState();
  const [formData, setFormData] = useState({
        title: "",
        content: "",
        post_time: "",
        image: "",
        rating: "",
        user_id : "",
        place_id: "",
  })

  const { token } = useToken();

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

  const handleAction = async(e) => {
    if(e.key == 1){
      setOpen(true)
      try {
        await axios.get(`http://localhost:8000/posts/${post.id}`,{
          headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
        }).then((res) => {
          setFormData(res.data)
          console.log(formData);
        })
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        console.log(post.id);
        axios.delete(`http://localhost:8000/post/${post.id}`,{
          headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
          }
        }
        ).then((res) => {
        window.location = "/"
      })
      } catch (error) {
        console.log(error);
      }
      
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onFinish = () =>{

  }

  return (
    <div className="post">
      <div className="post-container" key={post.id}>
        <div className="user">
          <div className="userInfo">
            <img className="avatar"  src={post.profilePic} alt="" />
            <div className="details">
              <span className="name">{post.name}</span>
              <span className="date">{((post.post_time).split('T')[1]) + " " + ((post.post_time).split('T')[0].split('-').reverse().join('/'))}</span>
            </div>
          </div>
          <Dropdown.Button menu={{ items , onClick: handleAction }} className='action' onClick={handleAction}/>
          <Modal
            open={open}
            title="Edit post"
            okButtonProps={{style: {display: "none"}}}
            cancelButtonProps={{style: {display: "none"}}}
            onCancel={handleCancel}
          >   
            {formData && 
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
                <Input name="title" placeholder="Title..." className="title input-post" defaultValue={formData?.title}/> 
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
              >
            <TextArea name="content" rows={4} placeholder="Content..." className="content input-post"  defaultValue={formData?.content}/> 
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
        </Form> }
      </Modal>
        </div>
        <div className="content">
          <p>{post.content}</p>
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
