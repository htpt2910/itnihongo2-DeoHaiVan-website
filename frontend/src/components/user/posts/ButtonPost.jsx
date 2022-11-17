import { Button, Input, Modal } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import "./posts.css";

const { TextArea } = Input;

export default function ButtonCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  const posts = JSON.parse(sessionStorage.getItem("posts"));

  const newPost = {
    id: Math.floor(Math.random() * 100),
    name: user.name || "",
    userId: user.userId || 0,
    profilePic: user.profilePic || "",
    desc: value || "",
    img: "https://tourdanangcity.vn/wp-content/uploads/2020/08/deo-hai-van-cung-duong-dep-nhat-the-gioi.jpg",
  };

  const addPost = (post) => {
    sessionStorage.setItem("posts", JSON.stringify([...posts, post]));
  };

  return (
    <>
      <Button
        style={{
          border: "none",
          padding: "0 16px",
          width: "138px",
          height: "50px",
        }}
        type="primary"
        onClick={() => setOpen(true)}
      >
        + Đăng Bài
      </Button>
      <Modal
        title="Tạo bài viết"
        centered
        open={open}
        onOk={() => {
          addPost(newPost);
          setOpen(false);
          window.location.reload();
        }}
        onCancel={() => {
          setOpen(false);
          setValue("");
          document.getElementById("file").value = "";
        }}
        width={600}
      >
        <div className="create-post">
          <img
            className="avatar"
            src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <span className="user-name">John Doe</span>
          <br />
          <br />
          <TextArea
            rows={10}
            style={{ marginBottom: "20px" }}
            value={value}
            onChange={onChange}
          />
          <input type="file" onChange={handleChange} />
          <img
            src="blob:http://localhost:3000/bfd7c1cd-e8e1-452a-b913-3adce78e4dfb"
            alt=""
          />
        </div>
      </Modal>
    </>
  );
}
