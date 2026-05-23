import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const User = [
  {
    user_id: 1,
    user_name: "abi",
    password: "abi",
    role: "user",
  },
  {
    user_id: 2,
    user_name: "abinash",
    password: "abinash",
    role: "admin",
  },
];

function Login() {
  const {
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
    isLogin,
    setisLogin,
    role,
    setRole,
  } = useContext(LoginContext);

  const nagavitor = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });

  const handleLogin = () => {
    for (let i = 0; i < User.length; i++) {
      if (
        User[i].user_name === formValue.name &&
        User[i].password === formValue.password
      ) {
        setRole(User[i].role);
        setIsSuccess(true);
        setisLogin(true);
        setSuccessMessage("Login Successful!");
        nagavitor("/");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex  flex-col gap-6 justify-center items-center bg-gray-100 ">
      <div className="bg-gray-200 w-[30%] h-[40vh] flex   flex-col gap-6 p-6 rounded-2xl ">
        <div className="w-full  ">
          <label htmlFor="" className="text-md font-bold ">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formValue.name}
            onChange={(e) => {
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="border border-gray-400 p-2 rounded-lg w-full mt-1"
          />
        </div>
        <div className="w-full  ">
          <label htmlFor="" className="text-md font-bold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formValue.password}
            onChange={(e) => {
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="border border-gray-400 p-2 rounded-lg w-full mt-1"
          />
        </div>
        <div to="/" className="w-full  mt-2 mb-2">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
          >
            Login
          </button>
        </div>
        <hr />
        <div className="flex justify-center items-center flex-row gap-2 ">
          <p className="">Don't have an account? </p>
          <Link
            to="/register"
            className="text-red-600 px-2 hover:text-red-500 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
