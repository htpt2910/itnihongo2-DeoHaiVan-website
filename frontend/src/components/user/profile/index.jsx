import { Spin } from "antd"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import { useAxios } from "../../../useAxios"
import useToken from "../../../useToken"
import AppButton from "./Button"
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  })
  const { fetchData, response, loading} = useAxios()
  const { token } = useToken()

  const [editMode, setEditMode] = useState(false)
  const [imagebase64, setImage] = useState()

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  let base64String = ""

  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0]

    var reader = new FileReader()
    console.log("next", reader)

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
      setImage(base64String)
    }

    reader.readAsDataURL(file)
  }

  function handleSaveChanges(event) {
    setEditMode(false)
    fetchData({
      url:`/users/${response.id}`,
      method:'patch',
      body:{
        email: profile.email?profile.email:response.email,
        username: profile.username?profile.username:response.username,
        name: profile.name?profile.name:response.name,
        gender: profile.gender?profile.gender:response.gender,
        age: profile.age?profile.age:response.age,
        image: imagebase64?imagebase64:response.image,
      },
      headers:{
        "Content-Type": "application/json",
        Authorization: " Bearer " + token,
      },
    });
  }

  useEffect(() => {
      fetchData({
        url:'/users/me',
        method:'get',
        headers:{
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      })
  }, [])

  return (
    <>
    {loading ? <Spin />:
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={"data:image/png;base64," + response.image}
                alt="avatar"
                className="img-fluid"
              />
              {editMode ? (
                <input type={"file"} onChange={imageUploaded} />
              ) : (
                <></>
              )}
              <h5 className="my-3">{response.name}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  {!editMode ? (
                    <p className="text-muted mb-0">{response.name}</p>
                  ) : (
                    <input
                      name="name"
                      className="text-muted mb-0"
                      defaultValue={response.name}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  {!editMode ? (
                    <p className="text-muted mb-0">{response.email}</p>
                  ) : (
                    <input
                      disabled
                      name="email"
                      className="text-muted mb-0"
                      defaultValue={response.email}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Gender</p>
                </div>
                <div className="col-sm-9">
                  {!editMode ? (
                    <>
                    {response.gender?<p className="text-muted mb-0">Nam</p>:<p className="text-muted mb-0">Nữ</p>}
                    </>
                  ) : (
                    <input
                      name="gender"
                      className="text-muted mb-0"
                      defaultValue={response.gender}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Age</p>
                </div>
                <div className="col-sm-9">
                  {!editMode ? (
                    <p className="text-muted mb-0">{response.age}</p>
                  ) : (
                    <input
                      name="age"
                      className="text-muted mb-0"
                      defaultValue={response.age}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <AppButton
            editMode={editMode}
            setEditMode={setEditMode}
            handleSaveChanges={handleSaveChanges}
          />
        </div>
      </div>
    </div>}
    </>
  )
}

export default Profile
