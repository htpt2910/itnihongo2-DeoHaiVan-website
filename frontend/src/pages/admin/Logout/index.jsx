import { Navigate } from "react-router-dom";

export const Logout = () => {
  sessionStorage.clear();
  return(
    <Navigate replace to={"/"} />
  )
};
