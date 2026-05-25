import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";

function Category(props) {
  const { setSuccessMessage, setIsSuccess, setErrorMessage, setIsError } =
    useContext(LoginContext);

  const [category, setCategory] = useState({
    category_name: "",
    category_description: "",
  });
  const handleLogin = () => {
    setErrorMessage("Login successful!");
    setIsError(true);
    console.log(category);
    setCategory({
      category_name: "",
      category_description: "",
    });
  };
  const handleBack = () => {
    props.setIsEdit(false);
    props.setIsBlur(false);
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-[40%] h-[45vh] flex   flex-col gap-6 p-6 rounded-2xl z-40">
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white p-2 text-center rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 w-20"
      >
        Back
      </button>
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Category Name:
        </label>
        <input
          type="text"
          name="category_name"
          value={category.category_name}
          onChange={(e) => {
            setCategory((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>

      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product description:
        </label>
        <textarea
          rows="4"
          name="category_description"
          value={category.category_description}
          onChange={(e) => {
            setCategory((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>
      <div className="w-full  mt-2 mb-2">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
        >
          {props.type === "add" ? "ADD" : "UPDATE"}
        </button>
      </div>
    </div>
  );
}

export default Category;
