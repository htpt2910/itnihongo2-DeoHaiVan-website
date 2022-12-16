import React, { useEffect } from "react"
import { useAxios } from "../../../useAxios"
import useToken from "../../../useToken"
import { Post_Search } from "../postsearch"
import "./posts.css"

export const PostSearch = ({ postsSearch, setPostsSearch }) => {
  const { token } = useToken()
  const { fetchData: fetchInfo, response: info } = useAxios()
  useEffect(() => {
    fetchInfo({
      url: "/users/me",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    })
    setPostsSearch(postsSearch)
  }, [postsSearch])

  return (
    <div className="posts">
      {postsSearch.map((post) => (
        <Post_Search post={post} key={post.id} myInfo={info} />
      ))}
    </div>
  )
}
