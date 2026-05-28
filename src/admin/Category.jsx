import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
import API_URL from "../api/api";

function Category(props) {
  const {
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
    productId,
    setProductId,
  } = useContext(LoginContext);

  const [category, setCategory] = useState({
    category_name: "",
    category_description: "",
  });

  useEffect(() => {
    if (props.type == "edit") {
      console.log(productId);
      fetch(`${API_URL}/v1/categorys/${productId}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json().then((data) => {
            if (!response.ok) {
              throw data;
            }
            return data;
          });
        })
        .then((data) => {
          setCategory({
            category_name: data["data"]["category_list"][0].category_name,
            category_description:
              data["data"]["category_list"][0].category_description,
          });
        })
        .catch((err) => {
          console.log(err);

          setIsError(true);

          if (Array.isArray(err.detail)) {
            setErrorMessage(err.detail[0].msg);
          } else if (typeof err.detail === "string") {
            setErrorMessage(err.detail);
          } else {
            setErrorMessage("Something went wrong");
          }
        });
    }
  }, []);
  const handleButton = (e) => {
    if (e.target.value == "add") {
      const fetchProduct = () => {
        fetch(`${API_URL}/v1/categorys/add`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(category),
        })
          .then((response) => {
            return response.json().then((data) => {
              if (!response.ok) {
                throw data;
              }
              return data;
            });
          })
          .then((data) => {
            setIsSuccess(true);
            setSuccessMessage(data["message"]);
          })
          .catch((err) => {
            console.log(err);

            setIsError(true);

            if (Array.isArray(err.detail)) {
              setErrorMessage(err.detail[0].msg);
            } else if (typeof err.detail === "string") {
              setErrorMessage(err.detail);
            } else {
              setErrorMessage("Something went wrong");
            }
          });
      };

      fetchProduct();
    } else if (e.target.value == "edit") {
      const fetchEditProduct = () => {
        fetch(`${API_URL}/v1/categorys/edit/${productId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(category),
        })
          .then((response) => {
            return response.json().then((data) => {
              if (!response.ok) {
                throw data;
              }
              return data;
            });
          })
          .then((data) => {
            setIsSuccess(true);
            setSuccessMessage(data["message"]);
          })
          .catch((err) => {
            console.log(err);

            setIsError(true);

            if (Array.isArray(err.detail)) {
              setErrorMessage(err.detail[0].msg);
            } else if (typeof err.detail === "string") {
              setErrorMessage(err.detail);
            } else {
              setErrorMessage("Something went wrong");
            }
          });
      };

      fetchEditProduct();
    }
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
          value={props.type}
          onClick={handleButton}
          className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
        >
          {props.type === "add" ? "ADD" : "UPDATE"}
        </button>
      </div>
    </div>
  );
}

export default Category;
