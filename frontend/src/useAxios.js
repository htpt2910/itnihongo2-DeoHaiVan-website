import axios from "axios"
import { useState } from "react"

axios.defaults.baseURL = "http://34.28.129.205:8000"

export const useAxios = () => {
  const [response, setResponse] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchData = ({ url, headers, body, method }) => {
    return axios({ method: method, url: url, data: body, headers: headers })
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { fetchData, response, error, loading }
}
