import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Register() {
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
  const [register, setRegister] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    setRole("user");
    setisLogin(true);
    setIsSuccess(true);
    setSuccessMessage("Register Successful!");
    nagavitor("/");
  };
  return (
    <div className="min-h-screen w-full flex  flex-col gap-6 justify-center items-center bg-gray-100 ">
      <div className="bg-gray-200 w-[30%] h-[60vh] flex   flex-col gap-6 p-6 rounded-2xl ">
        <div className="w-full  ">
          <label htmlFor="" className="text-md font-bold ">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={(e) => {
              setRegister((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="border border-gray-400 p-2 rounded-lg w-full mt-1"
          />
        </div>
        <div className="w-full  ">
          <label htmlFor="" className="text-md font-bold">
            Adress:
          </label>
          <input
            type="text"
            name="address"
            value={register.address}
            onChange={(e) => {
              setRegister((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="border border-gray-400 p-2 rounded-lg w-full mt-1"
          />
        </div>
        <div className="w-full  ">
          <label htmlFor="" className="text-md font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={(e) => {
              setRegister((prev) => ({
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
            value={register.password}
            onChange={(e) => {
              setRegister((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="border border-gray-400 p-2 rounded-lg w-full mt-1"
          />
        </div>
        <div to="/" className="w-full  mt-2 mb-2">
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
          >
            Sign In
          </button>
        </div>
        <hr />
        <div className="flex justify-center items-center flex-row gap-2 ">
          <p className=""> Already have an account? </p>
          <Link
            to="/login"
            className="text-red-600 px-2 hover:text-red-500 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
