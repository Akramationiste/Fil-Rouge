import jwtDecode from "jwt-decode";
import React from "react";

const useUserId = () => {
  let decode = "";
  let userID = "";
  if (localStorage.token) {
    decode = jwtDecode(localStorage?.token);
    userID = decode._id;
  }
  return { userID };
};

export default useUserId;
