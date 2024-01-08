import { useState } from "react";
import axios from "axios";

export const useLoginStatus = (domain) => {
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    axios.post(domain + "/auth", {}).then((response) => {
      if (response.data.message === "Not authenticated") {
      } else {
        setLoginStatus("true");
      }
    });
  };
  return [checkLogin, loginStatus];
};
