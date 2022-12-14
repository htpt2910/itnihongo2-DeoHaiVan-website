import { DeleteTwoTone, SearchOutlined } from "@ant-design/icons"
import { Modal, Popconfirm, Select, Spin, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useAxios } from "../../../useAxios"
import useToken from "../../../useToken"
import "./styles.css"
export const PostControlComponent = () => {
  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const [modalData, setModalData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {fetchData:fetchPost,response:r_post,loading:l_post} = useAxios()

  const { token } = useToken()

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter)
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }

  const handleDelete = (id) => {
    fetchPost({
      url:`/post/${id}`,
      method:'delete',
      headers:{
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
    window.location.reload()
  }

  useEffect(() => {
    fetchPost({
      url:`/posts`,
      method:'get',
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${token}`,
      },
    });
  }, [])

  const handleApprove = (record, value) => {
    fetchPost({
      url:`/post/${record.id}`,
      method:'patch',
      body:{
        title: record.title,
        content: record.content,
        post_time: record.post_time,
        image: record.image,
        rating: record.rating,
        user_id: record.user_id,
        place_id: record.place_id,
        is_active: value === "Awaiting" ? false : true,
        is_verify: value === "Approved" ? true : false,
      },
      headers:{
        "Content-Type": "application/json",
        Authorization: " Bearer " + token,
      },
    });
    window.location.reload()
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "5%",
    },
    {
      title: "user_id",
      dataIndex: "user_id",
      key: "user_id",
      filteredValue: filteredInfo.user || null,
      onFilter: (value, record) => record.user.includes(value),
      sorter: (a, b) => a.user.length - b.user.length,
      sortOrder: sortedInfo.columnKey === "user_id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "6%",
    },
    {
      title: "place_id",
      dataIndex: "place_id",
      key: "place_id",
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "place_id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "6%",
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
      ellipsis: true,
      width: "5%",
    },
    {
      title: "posted at",
      dataIndex: "post_time",
      key: "post_time",
      render: (_, record) => <span>{record.post_time.slice(0, 10)}</span>,
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
      ellipsis: true,
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
      width: "17%",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => {
        return (
          <div>
            <p
              style={{ color: "#3383FF" }}
              onClick={() => {
                setModalData(record)
                setIsModalVisible(true)
              }}
            >
              View
            </p>
          </div>
        )
      },
      width: "7%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Select
          defaultValue={
            record.is_active
              ? record.is_verify
                ? "Approved"
                : "Denied"
              : "Awaiting"
          }
          style={{ width: 120 }}
          onChange={(value) => {
            handleApprove(record, value)
          }}
          options={[
            {
              value: "Approved",
              label: "Approved",
            },
            {
              value: "Denied",
              label: "Denied",
            },
            {
              value: "Awaiting",
              label: "Awaiting",
            },
          ]}
        />
      ),
      width: "10%",
    },
    {
      title: "Delete",
      key: "action",
      render: (_, record) =>
        r_post.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        ) : null,
      width: "5%",
    },
  ]
  return (
    <>
    {l_post?<Spin />:
      <div className="postContainer">
        <div className="inputSearch">
          <input className="input" type="text" placeholder="Search..." />
          <div className="btnSearch">
            <SearchOutlined />
          </div>
        </div>
        <div className="tableContainer">
          <Table
            columns={columns}
            dataSource={r_post}
            onChange={handleChange}
            className="table"
          />
        </div>
        <Modal
          mask={false}
          title="Post Preview"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          width="50%"
          height="70%"
          okButtonProps={{ style: { display: "none" } }}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 250px)",
          }}
        >
          <div>
            <h4>{modalData.title}</h4>
            <img
              src={"data:image/png;base64," + modalData.image}
              alt=""
              style={{ width: "100%", margin: "20px 0px" }}
            />
            <p>{modalData.content}</p>
          </div>
        </Modal>
      </div>}
    </>
  )
}
