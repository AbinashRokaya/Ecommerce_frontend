import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useState } from "react";
import API_URL from "../api/api";

function AddProduct(props) {
  const [image, setImage] = useState(null);

  const {
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
    productId,
    setProductId,
  } = useContext(LoginContext);

  const [productValue, setProductValue] = useState({
    product_name: "",
    product_price: 0,
    product_description: "",
    product_category: 1,
    product_quantity: 0,
    product_image_url: "",
  });
  useEffect(() => {
    if (props.type == "edit") {
      console.log(productId);
      fetch(`${API_URL}/v1/products/${productId}`, {
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
          setProductValue({
            product_name: data["data"]["product_list"][0].product_name,
            product_price: data["data"]["product_list"][0].product_price,
            product_description:
              data["data"]["product_list"][0].product_description,
            product_category: data["data"]["product_list"][0].product_category,
            product_quantity: data["data"]["product_list"][0].product_quantity,
            product_image_url:
              data["data"]["product_list"][0].product_image_url,
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

  const fetchProduct = (finalPayload) => {
    fetch(`${API_URL}/v1/products/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(finalPayload),
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
        setProductValue({
          product_name: "",
          product_price: 0,
          product_description: "",
          product_category: 1,
          product_quantity: 0,
          product_image_url: "",
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
  };
  const handleButton = (e) => {
    if (e.target.value == "add") {
      if (!image) {
        setIsError(true);
        setErrorMessage("Please select an image first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);

      fetch(`${API_URL}/v1/products/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
          const uploadedImageUrl = data["data"].url;
          console.log(data);

          // Update states for UI persistence
          setProductValue((prev) => ({
            ...prev,
            product_image_url: uploadedImageUrl,
          }));

          const finalPayload = {
            ...productValue,
            product_image_url: uploadedImageUrl,
          };
          fetchProduct(finalPayload);
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
    } else if (e.target.value == "edit") {
      const fetchEditProduct = () => {
        fetch(`${API_URL}/v1/products/edit/${productId}`, {
          method: "PUT",
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
            setSuccessMessage(data["message"]);
            setProductValue({
              product_name: "",
              product_price: 0,
              product_description: "",
              product_category: 1,
              product_quantity: 0,
              product_image_url: "",
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
      };

      fetchEditProduct();
    }
  };

  const handleBack = () => {
    props.set(false);
    props.blur(false);
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-[40%] h-[85vh] flex   flex-col gap-6 p-6 rounded-2xl z-40">
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white p-2 text-center rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 w-20"
      >
        Back
      </button>
      <div className="w-full">
        <input
          className="border border-gray-400 p-2 rounded-lg w-full mt-1 cursor-pointer"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
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
              [e.target.name]: Number(e.target.value),
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
              [e.target.name]: Number(e.target.value),
            }));
          }}
          className="border border-gray-400 p-2 rounded-lg w-full mt-1"
        >
          <option value={1}>Electronics</option>
          <option value={2}>Clothing</option>
          <option value={3}>Accessories</option>
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
              [e.target.name]: Number(e.target.value),
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

export default AddProduct;
