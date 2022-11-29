import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import AppButton from "./Button"
import useToken from '../../../useToken';
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  })
  const { token } = useToken();
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
      })
      .then((res) => res)
      .catch((err) => console.log("err: ", err))
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + token
        }
      })
      .then((res) => {
        const dt = res.data
        console.log("data: ", dt)
        setProfile({
          name: dt.name,
          email: dt.email,
          phone: "0123456789",
          gender: dt.gender ? "Nữ" : "Nam",
          age: dt.age,
          image: dt.image,
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={profile.image} alt="avatar" className="img-fluid" />
              <input type={"file"} />
              <h5 className="my-3">{profile.name}</h5>
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
                    <p className="text-muted mb-0">{profile.name}</p>
                  ) : (
                    <input
                      name="name"
                      className="text-muted mb-0"
                      value={profile.name}
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
                    <p className="text-muted mb-0">{profile.email}</p>
                  ) : (
                    <input
                      name="email"
                      className="text-muted mb-0"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  {!editMode ? (
                    <p className="text-muted mb-0">{profile.phone}</p>
                  ) : (
                    <input
                      name="phone"
                      className="text-muted mb-0"
                      value={profile.phone}
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
                    <p className="text-muted mb-0">{profile.gender}</p>
                  ) : (
                    <input
                      name="gender"
                      className="text-muted mb-0"
                      value={profile.gender}
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
                    <p className="text-muted mb-0">{profile.age}</p>
                  ) : (
                    <input
                      name="age"
                      className="text-muted mb-0"
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
