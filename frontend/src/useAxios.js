import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

  
    const fetchData = ({url, headers, body, method}) => {
          return axios({ method: method, url: url, data: body, headers: headers })
          .then((res) => {
              setResponse(res.data);
          })
          .catch((err) => {
              setError(err);
          })
          .finally(() => {
              setLoading(false);
          });
    }
  
    return { fetchData, response, error, loading };
  };