import {
  DeleteTwoTone, SearchOutlined
} from '@ant-design/icons';
import {Modal, Popconfirm, Table} from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import useToken from '../../../useToken';

const UserControlComponent = () => {
  const {token} = useToken()
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then(() => setData((preData) => preData.filter((m) => m.id !== id)))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/users",{
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then(async (res) => {
        const dt = await res.data
        setData(dt)
        dt.map((user, index) => setUsers((prevValue) => 
          [...prevValue, {
            id: user.id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            age: user.age,
            image: user.image
          }]
        ))
        
        console.log("users: ", users)
      })
      .catch((err) => console.log(err))
  }, []);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      width: "5%"
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filteredValue: filteredInfo.username || null,
      onFilter: (value, record) => record.username.includes(value),
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
      ellipsis: true,
      width: "40%"
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
      width: "45%"
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => {
        return (
          <div>
            <p
              style={{color: "#3383FF"}}
              onClick={() => {
                setModalData(record);
                setIsModalVisible(true);
              }}
              >
                View
              </p>
          </div>
        );
      },
      width: "7%",
    },
    {
      title: 'Delete',
      key: 'action',
      render: (_, record) => 
        data.length >= 1 ? 
          (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <DeleteTwoTone />
            </Popconfirm>
          ) : null
      ,
      width: "10%",
    },
  ];

  return (
    <>
      <div className="userContainer">
        <div className="inputSearch">
          <input className='input' type="text" placeholder='Search...' />
          <div className="btnSearch">
            <SearchOutlined />
          </div>
        </div>
        <div className="tableContainer">
          <Table 
          columns={columns} 
          dataSource={data} 
          onChange={handleChange} 
          className="table" 
          />
        </div>
      <Modal
          mask={false}
          title="Profile User Preview"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          width="50%"
          height="70%"
          okButtonProps={{style: {display: "none"}}}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 250px)",
          }}
        >
          <div style={{ textAlign: 'center' }}>
          {console.log("modalData: ", modalData)}
          {(modalData.username === undefined) ? <></> : 
          (<>
            <p>Username: {modalData.username}</p>
            <img
              src={modalData.image}
              alt="img"
              style={{width: "50%", height: "50%", margin: "20px 0px"}}
            /> 
            <p>Email: {modalData.email}</p>
            <p>Gender: {modalData.gender ? "Nam" : "Nữ"}</p>
            <p>Age: {modalData.age}</p>
          </>)}
            
          </div>
        </Modal>
    </div>
  </>
  );
};
export default UserControlComponent;
