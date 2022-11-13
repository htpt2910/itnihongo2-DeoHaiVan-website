import {  Space, Table } from 'antd';
import React, { useState } from 'react';
import {
    EditTwoTone ,
    DeleteTwoTone,
    SearchOutlined
  } from '@ant-design/icons';
  import "./styles.css";
const data = [
  {
    key: '1',
    user: 'Hoang Phu',
    id: 1,
    title: 'Banh nuong Hue',
    status: 'Approve',
  },
  {
    key: '2',
    user: 'Thanh Thanh',
    id: 2,
    title: 'Bun cha Ha noi',
    status: 'Approve',
  },
  {
    key: '3',
    user: 'Van Thuong',
    id: 3,
    title: 'Banh Da khe Bac Giang',
    status: 'Denined',
  },
  {
    key: '4',
    user: 'Minh Hung',
    id: 4,
    title: 'Banh mi luoc',
    status: 'Await',
  },
];
export const PostControlComponent = () => {
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
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      filteredValue: filteredInfo.user || null,
      onFilter: (value, record) => record.user.includes(value),
      sorter: (a, b) => a.user.length - b.user.length,
      sortOrder: sortedInfo.columnKey === 'user' ? sortedInfo.order : null,
      ellipsis: true,
      width: "20%"
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
      ellipsis: true,
      width: "35%"

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      ellipsis: true,
      width: "15%"
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
    <div className="postContainer">
      <div className="inputSearch">
        <input className='input' type="text" placeholder='Search...'/>
        <div className="btnSearch">
        <SearchOutlined />
        </div>
      </div>
      <div className="tableContainer">
        <Table columns={columns} dataSource={data} onChange={handleChange} className="table"/>
      </div>
    </div>
    </>
  );
};
 