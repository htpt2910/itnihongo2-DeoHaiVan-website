import { Navigate } from "react-router-dom";

export const Logout = () => {
  sessionStorage.clear();
  window.location.reload();
};
