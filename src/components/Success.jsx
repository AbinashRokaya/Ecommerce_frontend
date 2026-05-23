import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function Success() {
  const { isSuccess, successMessage, setIsSuccess } = useContext(LoginContext);

  setTimeout(() => {
    setIsSuccess(false);
  }, 1000);

  return (
    <div
      className={`fixed top-18 left-0 h-20 w-full flex justify-center  items-center bg-green-700 transition-all duration-700 ease-in-out ${isSuccess ? "block transition-all duration-300" : "hidden transition-all duration-300"} z-50`}
    >
      <p className="text-white">{successMessage}</p>
    </div>
  );
}

export default Success;
