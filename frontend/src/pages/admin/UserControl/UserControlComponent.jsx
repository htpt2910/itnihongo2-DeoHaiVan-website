import {
  DeleteTwoTone, EditTwoTone, SearchOutlined
} from '@ant-design/icons';
import { Space, Table } from 'antd';
import React, { useState } from 'react';
import "./styles.css";
const data = [
  {
    key: '1',
    name: 'Hoang Phu',
    username: 'Hoang Phu',
    password: 'phu1',
    id: 1,
    mail: 'hoangphu@gmail.com',
    gender: 'Male',
    age: '21',
  },
  {
    key: '2',
    name: 'Thanh Thanh',
    username: 'Thanh Thanh',
    password: 'thanh2',
    id: 2,
    mail: 'thanhthanh@gmail.com',
    gender: 'Female',
    age: '21',
  },
  {
    key: '3',
    name: 'Van Thuong',
    username: 'Van Thuong',
    password: 'thuong3',
    id: 3,
    mail: 'vanthuong@gmail.com',
    gender: 'Male',
    age: '21',
  },
  {
    key: '4',
    name: 'Minh Hung',
    username: 'Minh Hung',
    password: 'hung4',
    id: 4,
    mail: 'minhhung@gmail.com',
    gender: 'Male',
    age: '21',
  },
];
const UserControlComponent = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
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
      title: 'Mail',
      dataIndex: 'mail',
      key: 'mail',
      filteredValue: filteredInfo.mail || null,
      onFilter: (value, record) => record.mail.includes(value),
      sorter: (a, b) => a.mail.length - b.mail.length,
      sortOrder: sortedInfo.columnKey === 'mail' ? sortedInfo.order : null,
      ellipsis: true,
      width: "45%"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditTwoTone /></a>
          <a><DeleteTwoTone /></a>
        </Space>
      ),
      width: "10%"
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
          <Table columns={columns} dataSource={data} onChange={handleChange} className="table" />
        </div>
      </div>
    </>
  );
};
export default UserControlComponent;
