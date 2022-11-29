import {
  DeleteTwoTone, EditTwoTone, SearchOutlined
} from '@ant-design/icons';
import { Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";

const UserControlComponent = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [users, setUsers] = useState([])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="/"><EditTwoTone /></a>
          <a href="/"><DeleteTwoTone /></a>
        </Space>
      ),
      width: "10%"
    },
  ];
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then(async (res) => {
        const dt = await res.data
        console.log("data: ", dt)
        dt.map((user, index) => setUsers((prevValue) => 
          [...prevValue, {
            id: user.id,
            username: user.username,
            email: user.email
          }]
        ))
        
        console.log("users: ", users)
      })
      .catch((err) => console.log(err))
  }, [])

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
          <Table columns={columns} dataSource={users} onChange={handleChange} className="table" />
        </div>
      </div>
    </>
  );
};
export default UserControlComponent;
