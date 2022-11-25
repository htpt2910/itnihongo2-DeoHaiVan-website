import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
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
  const { token } = useToken()
  const [editMode, setEditMode] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function handleSaveChanges(event) {
    setEditMode(false)

    axios
      .patch("http://localhost:8000/users/1", {
        email: profile.email,
        username: profile.name,
        name: profile.name,
        gender: profile.gender === "Nữ" ? true : false,
        age: profile.age,
        image: profile.image,
      })
      .then((res) => res)
      .catch((err) => console.log("err: ", err))
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        const dt = res.data
        console.log("data: ", dt)
        setProfile({
          name: dt.name,
          email: dt.email,
          phone: "0123456789",
          gender: dt.gender ? "Nam" : "Nữ",
          age: dt.age,
          image: dt.image,
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                src={"data:image/png;base64," + profile.image}
                alt="avatar"
                class="img-fluid"
              />
              <input type={"file"} />
              <h5 class="my-3">{profile.name}</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  {!editMode ? (
                    <p class="text-muted mb-0">{profile.name}</p>
                  ) : (
                    <input
                      name="name"
                      class="text-muted mb-0"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  {!editMode ? (
                    <p class="text-muted mb-0">{profile.email}</p>
                  ) : (
                    <input
                      name="email"
                      class="text-muted mb-0"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                  {!editMode ? (
                    <p class="text-muted mb-0">{profile.phone}</p>
                  ) : (
                    <input
                      name="phone"
                      class="text-muted mb-0"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Gender</p>
                </div>
                <div class="col-sm-9">
                  {!editMode ? (
                    <p class="text-muted mb-0">{profile.gender}</p>
                  ) : (
                    <input
                      name="gender"
                      class="text-muted mb-0"
                      value={profile.gender}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Age</p>
                </div>
                <div class="col-sm-9">
                  {!editMode ? (
                    <p class="text-muted mb-0">{profile.age}</p>
                  ) : (
                    <input
                      name="age"
                      class="text-muted mb-0"
                      value={profile.age}
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
    </div>
  )
}

export default Profile
