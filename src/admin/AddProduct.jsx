import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useState } from "react";

function AddProduct(props) {
  const { setSuccessMessage, setIsSuccess, setErrorMessage, setIsError } =
    useContext(LoginContext);

  const [productValue, setProductValue] = useState({
    product_name: "",
    product_price: 0,
    product_description: "",
    product_category: 0,
    product_quantity: 0,
  });
  const handleButton = () => {
    const fetchProduct = () => {
      fetch(`http://127.0.0.1:8000/v1/products/${props.type}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(productValue),
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
          setSuccessMessage("New Product is Added");

          // TODO: You'll eventually want to save this data to state:
          // setProductValue(data);
        })
        .catch((err) => {
          console.log(err);

          setIsError(true);

          if (err.detail && err.detail.length > 0) {
            setErrorMessage(err.detail[0].msg);
          } else {
            setErrorMessage("Login failed");
          }
        });
    };

    fetchProduct();
  };

  const handleBack = () => {
    props.set(false);
    props.blur(false);
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-[40%] h-[75vh] flex   flex-col gap-6 p-6 rounded-2xl z-40">
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white p-2 text-center rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 w-20"
      >
        Back
      </button>
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product Name:
        </label>
        <input
          type="text"
          name="product_name"
          value={productValue.product_name}
          onChange={(e) => {
            setProductValue((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product Price:
        </label>
        <input
          type="number"
          name="product_price"
          value={productValue.product_price}
          onChange={(e) => {
            setProductValue((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product Category:
        </label>
        <select
          id=""
          name="product_category"
          value={productValue.product_category}
          onChange={(e) => {
            setProductValue((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="w-full  ">
        <label htmlFor="" className="text-md font-bold ">
          Product Quantity:
        </label>
        <input
          type="number"
          name="product_quantity"
          value={productValue.product_quantity}
          onChange={(e) => {
            setProductValue((prev) => ({
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
          name="product_description"
          value={productValue.product_description}
          onChange={(e) => {
            setProductValue((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        />
      </div>
      <div className="w-full  mt-2 mb-2">
        <button
          onClick={handleButton}
          className="bg-blue-500 text-lg text-white p-2 rounded-lg w-full hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 cursor-pointer"
        >
          {props.type === "add" ? "ADD" : "UPDATE"}
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
