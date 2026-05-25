import React, { useContext, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { LoginContext } from "../context/LoginContext";

function ProductList() {
  const { productId, setProductId } = useContext(LoginContext);

  const [isadded, setIsAdded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isblur, setIsBlur] = useState(false);
  const [mode, setMode] = useState("");
  const [productValue, setProductValue] = useState([]);

  const handleEdit = (e) => {
    setProductId(e.target.value);
    console.log(productId);

    setIsEdit(!isEdit);
    setIsBlur(!isblur);
    setMode("edit");
  };
  const handleAdd = () => {
    setIsAdded(!isadded);
    setIsBlur(!isblur);
    setMode("add");
  };

  useEffect(() => {
    const fetchProduct = () => {
      fetch("http://localhost:8000/v1/products", {
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
          console.log("Server response:", data["data"]["product_list"]);
          setProductValue(data["data"]["product_list"]);

          // TODO: You'll eventually want to save this data to state:
          // setProductValue(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProduct();
  }, []);
  // Add this below your fetch hook

  return (
    <div className="relative min-h-screen w-full bg-gray-100 ">
      {isadded && <AddProduct set={setIsAdded} blur={setIsBlur} type={mode} />}
      {isEdit && <AddProduct set={setIsEdit} blur={setIsBlur} type={mode} />}
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
                src="/product.jpg"
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
                  Category: {product.product_category}
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600">
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
