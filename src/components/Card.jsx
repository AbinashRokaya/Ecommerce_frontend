import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import API_URL from "../api/api";

export default function Card() {
  const { productId, setProductId } = useContext(LoginContext);
  const [productValue, setProductValue] = useState([]);

  useEffect(() => {
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

    fetchProduct();
  }, []);

  return (
    <>
      <div className="m-3 flex flex-row gap-3 items-center flex-wrap">
        {productValue.map((topic) => (
          <Link
            key={topic.product_id}
            to="/product"
            onClick={(e) => setProductId(topic.product_id)}
            className="bg-gray-200 w-72 h-[500px] flex flex-col p-3 rounded-2xl m-2 cursor-pointer hover:shadow-2xl hover:shadow-gray-600"
          >
            <div className="w-full h-96 overflow-hidden rounded-2xl">
              <img
                src="product.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4">
              <h1 className="text-lg font-semibold">{topic.product_name}</h1>
              <p className="text-gray-900">Price: Rs.{topic.product_price}</p>
              <p className="text-gray-600">
                Total quantity: {topic.product_quantity}
              </p>
            </div>
          </Link>
        ))}

        {/* <div className="bg-gray-200 w-72 h-[500px] flex flex-col p-3 rounded-2xl m-2 cursor-pointer hover:shadow-2xl hover:shadow-gray-600">
          <div className="w-full h-96 overflow-hidden rounded-2xl">
            <img
              src="shoes.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-semibold">Bottle</h1>
            <p className="text-gray-600">price: $200</p>
          </div>
        </div>
        <div className="bg-gray-200 w-72 h-[500px] flex flex-col p-3 rounded-2xl m-2 cursor-pointer hover:shadow-xl hover:shadow-gray-600">
          <div className="w-full h-96 overflow-hidden rounded-2xl">
            <img
              src="shoes_1.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-semibold">Bottle</h1>
            <p className="text-gray-600">price: $200</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
