import React, { useContext, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { LoginContext } from "../context/LoginContext";
import API_URL from "../api/api";

function ProductList() {
  const {
    productId,
    setProductId,
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
  } = useContext(LoginContext);

  const [isadded, setIsAdded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isblur, setIsBlur] = useState(false);
  const [mode, setMode] = useState("");
  const [productValue, setProductValue] = useState([]);

  const handleDelete = (e) => {
    const DeleteCategory = () => {
      fetch(`${API_URL}/v1/products/${e.target.value}`, {
        method: "DELETE",
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

    DeleteCategory();
  };

  const handleEdit = (e) => {
    setProductId(e.target.value);

    setIsEdit(!isEdit);
    setIsBlur(!isblur);
    setMode("edit");
  };
  const handleAdd = () => {
    setIsAdded(!isadded);
    setIsBlur(!isblur);
    setMode("add");
  };

  const fetchProduct = () => {
    fetch(`${API_URL}/v1/products`, {
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
        setProductValue(data["data"]["product_list"]);
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

  useEffect(() => {
    fetchProduct();
  }, []);
  // Add this below your fetch hook

  return (
    <div className="relative min-h-screen w-full bg-gray-100 ">
      {isadded && (
        <AddProduct
          fetchProduct={fetchProduct}
          set={setIsAdded}
          blur={setIsBlur}
          type={mode}
        />
      )}
      {isEdit && (
        <AddProduct
          fetchProduct={fetchProduct}
          set={setIsEdit}
          blur={setIsBlur}
          type={mode}
        />
      )}
      <div
        className={`${isblur ? "blur-sm" : ""} flex justify-between items-center p-6 bg-gray-300 `}
      >
        <h1>Product List</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
        >
          Add Product
        </button>
      </div>
      <div className={`p-6 ${isblur ? "blur-sm" : ""}`}>
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg w-lg mt-1"
        />
      </div>
      <div
        className={`w-full p-6 h-full bg-gray-600 flex flex-row gap-6 flex-wrap ${isblur ? "blur-sm" : ""}`}
      >
        {/* Map through your products state array dynamically */}
        {productValue.map((product) => (
          <div
            key={product.product_id}
            className="bg-gray-200 h-full w-[25%] rounded-2xl p-6"
          >
            <div>
              <img
                src={product.product_image_url || null}
                alt={product.product_name}
                className="w-50 h-50 rounded-2xl object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div>
                <h1 className="font-bold text-2xl capitalize">
                  {product.product_name}
                </h1>
                <h3 className="text-gray-600">
                  Category: {product.product_category_name}
                </h3>
              </div>

              <div>
                <p>Rs. {product.product_price}</p>
                <p>Quantity: {product.product_quantity}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-between items-center mt-4">
              <button
                value={product.product_id}
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
              >
                Edit
              </button>
              <button
                value={product.product_id}
                onClick={handleDelete}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
