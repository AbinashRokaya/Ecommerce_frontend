import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function Category() {
  const { setSuccessMessage, setIsSuccess, setErrorMessage, setIsError } =
    useContext(LoginContext);
  const handleLogin = () => {
    setErrorMessage("Login successful!");
    setIsError(true);
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-[40%] h-[40vh] flex   flex-col gap-6 p-6 rounded-2xl z-40">
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Category Name:
        </label>
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>

      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product description:
        </label>
        <textarea
          rows="4"
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>
      <div className="w-full  mt-2 mb-2">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default Category;
