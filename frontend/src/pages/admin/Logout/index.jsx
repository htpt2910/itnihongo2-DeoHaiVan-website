import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    sessionStorage.clear();
    navigate('/')
  },[])
};
