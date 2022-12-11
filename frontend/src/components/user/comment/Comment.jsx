import axios from "axios";
import {useEffect, useState} from "react";
import useToken from "../../../useToken";
import moment from "moment";
import useMyInfo from "../../../useMyInfo";
import {Popconfirm} from "antd";
import {DeleteTwoTone} from "@ant-design/icons";

export const Comment = ({comment}) => {
  const {token} = useToken();
  const [user, setUser] = useState({});
  const {myInfo} = useMyInfo();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${comment.comment_user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
            handleDelete(comment.id);
            window.location.reload();
          }}
        >
          <DeleteTwoTone />
        </Popconfirm>
      )}
    </div>
  );
};
