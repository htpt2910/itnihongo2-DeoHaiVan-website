import { useState } from 'react';
import axios from 'axios';
// import useToken from './useToken';

axios.defaults.baseURL = 'http://localhost:8000';

export const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    // const {token} = useToken(null)
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    const fetchData = ({url, headers, body, method}) => {
          return axios[method](url, body, headers)
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