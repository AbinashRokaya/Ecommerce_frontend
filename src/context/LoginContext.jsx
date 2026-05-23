import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <LoginContext.Provider
      value={{
        productId,
        setProductId,
        isSuccess,
        setIsSuccess,
        successMessage,
        setSuccessMessage,
        isError,
        setIsError,
        errorMessage,
        setErrorMessage,
        isLogin,
        setisLogin,
        role,
        setRole,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
