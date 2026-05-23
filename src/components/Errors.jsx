import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function Errors() {
  const { isError, errorMessage, setIsError } = useContext(LoginContext);

  setTimeout(() => {
    setIsError(false);
  }, 1000);
  return (
    <div
      className={`fixed top-18 left-0 h-20 w-full flex justify-center  items-center bg-red-700 transition-all duration-700 ease-in-out ${isError ? "block transition-all duration-300" : "hidden transition-all duration-300"} z-50`}
    >
      <p className="text-white">{errorMessage}</p>
    </div>
  );
}

export default Errors;
