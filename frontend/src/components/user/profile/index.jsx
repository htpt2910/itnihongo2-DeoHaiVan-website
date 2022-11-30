import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useToken from "../../../useToken"
import AppButton from "./Button"
const Profile = () => {
  let navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "fake number",
    gender: false,
    age: 0,
    image: "",
  })
  const { token, setToken } = useToken()

  const [editMode, setEditMode] = useState(false)
  const [imagebase64, setImage] = useState()
  const [userID, setUserID] = useState(0)
  const [hajimete_email, setHajimete_email] = useState("")

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
      console.log("hihhhhhhh", imagebase64)
    }

    reader.readAsDataURL(file)
  }

  function handleSaveChanges(event) {
    setEditMode(false)
    console.log("user id: ", userID)
    axios
      .patch(
        `http://localhost:8000/users/${userID}`,
        {
          email: profile.email,
          username: profile.name,
          name: profile.name,
          gender: profile.gender === "Nữ" ? false : true,
          age: profile.age,
          image: imagebase64,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
          },
        }
      )
      .then(async (res) => {
        console.los(res)
      })

      .catch((err) => console.log("err: ", err))
      .finally(() => {
        if (profile.email !== hajimete_email) {
          setToken("")
          navigate("/")
        }
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      })
      .then(async (res) => {
        const dt = res.data
        console.log("data: ", dt)
        setUserID(dt.id)
        setProfile({
          name: dt.name,
          email: dt.email,
          gender: dt.gender ? "Nam" : "Nữ",
          age: dt.age,
          image: dt.image,
        })
        setImage(dt.image)
        setHajimete_email(dt.email)
      })

      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={"data:image/png;base64," + imagebase64}
                alt="avatar"
                className="img-fluid"
              />
              {editMode ? (
                <input type={"file"} onChange={imageUploaded} />
              ) : (
                <></>
              )}
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
