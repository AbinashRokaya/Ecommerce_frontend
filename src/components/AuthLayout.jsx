import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const { isLogin, setisLogin } = useContext(LoginContext);

  useEffect(() => {
    if (authentication && !isLogin) {
      navigate("/login");
    } else if (!authentication && isLogin) {
      navigate("/");
    }
  }, [isLogin, authentication, navigate]);

  return <>{children}</>;
}

export default AuthLayout;
