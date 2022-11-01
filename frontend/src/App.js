import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App () {

  const [ day, setDay ] = useState("");
 
  useEffect(() => {
    axios.get(`http://localhost:8000/day`)
    .then(res => {
        const day = res.data;
        setDay(day);
    })
    .catch(error => console.log(error));
  
  }, [])
  

  return (
    <h1>Hey!  It's {day}</h1>
  )
}

export default App;
