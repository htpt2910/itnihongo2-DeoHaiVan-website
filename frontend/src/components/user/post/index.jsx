import {
  AliwangwangOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Dropdown, Modal, Form, Input, Button} from "antd";
import {Comments} from "../comment";
import moment from "moment";
import "./post.css";
import axios from "axios";
import useMyInfo from "../../../useMyInfo";
import {useNavigate} from "react-router-dom";
import useToken from "../../../useToken";

export const Post = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const navigate = useNavigate();
  const {token} = useToken();
  const {myInfo} = useMyInfo();
  const [myId, setMyId] = useState(false);

  const {TextArea} = Input;
  const items = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        const dt = res.data;
        setMyId(dt.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const d = new Date();
  let month = d.getMonth() + 1;
  var date = d.getFullYear() + "-" + month + "-" + d.getDate();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  const [imagebase64, setImage] = useState();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  });
  useEffect(() => {
    if (myInfo) {
      post.likes.map((i) => {
        if (i.like_user_id === myInfo.id) {
          setLiked(true);
        }
      });
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: null,
    content: null,
    post_time: null,
    image: null,
    rating: null,
    user_id: null,
    place_id: null,
  });
  var dateCurrent = date + " " + time;
  let base64String = "";

  const handleAction = async (e) => {
    if (e.key == 1) {
      setOpen(true);
      try {
        await axios
          .get(`http://localhost:8000/posts/${post.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: " Bearer " + token,
            },
          })
          .then((res) => {
            setFormData(res.data);
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(post.id);
        axios
          .delete(`http://localhost:8000/post/${post.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: " Bearer " + token,
            },
          })
          .then((res) => {
            window.location = "/";
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    
      axios
        .patch(
          `http://localhost:8000/post/${post.id}`,
          {
            title: values.title ? values.title : formData.title,
            content: values.content ? values.content : formData.content,
            post_time: dateCurrent,
            image: imagebase64 ? imagebase64 : formData.image,
            rating: 1,
            user_id: formData.user_id,
            place_id: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: " Bearer " + token,
            },
          }
        )
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          alert(err.response.data.detail);
          console.log(err);
        });
      setOpen(false);

  };

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
        setProfile({
          name: dt.name,
          email: dt.email,
          gender: dt.gender ? "Nam" : "Nữ",
          age: dt.age,
          image: dt.image,
        });
        setImage(dt.image);
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

  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
    setImage(formData.image);
  }

  return (
    <div className="post">
      <div className="post-container" key={post.id}>
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
          {(post.user_id == myId)? 
          <Dropdown.Button
            menu={{items, onClick: handleAction}}
            className="action"
            onClick={handleAction}
          />
            :<></>
        }
          
          <Modal
            open={open}
            title="Edit post"
            okButtonProps={{style: {display: "none"}}}
            cancelButtonProps={{style: {display: "none"}}}
            onCancel={handleCancel}
          >
            {formData.title != null && (
              <Form
                name="create_post"
                form={form}
                className="create_post_form"
                initialValues={{remember: false}}
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item name="title" label="Title">
                  <Input
                    name="title"
                    placeholder="Title..."
                    className="title input-post"
                    defaultValue={formData.title}
                  />
                </Form.Item>
                <Form.Item name="content" label="Content">
                  <TextArea
                    name="content"
                    rows={4}
                    placeholder="Content..."
                    className="content input-post"
                    defaultValue={formData.content}
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
        </div>
        {commentOpen && <Comments comments={post.comments} post_id={post.id} />}
      </div>
    </div>
  );
};
