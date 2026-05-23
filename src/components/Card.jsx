import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
const TOPICS = [
  {
    product_id: 1,
    product_name: "shoes",
    product_price: 200,
    product_image: "shoes.jpg",
  },
  {
    product_id: 2,
    product_name: "shoes",
    product_price: 300,
    product_image: "shoes_1.jpg",
  },
  {
    product_id: 3,
    product_name: "shoes",
    product_price: 400,
    product_image: "product.jpg",
  },
];
export default function Card() {
  const { productId, setProductId } = useContext(LoginContext);

  return (
    <>
      <div className="m-3 flex flex-row gap-3 items-center flex-wrap">
        {TOPICS.map((topic) => (
          <Link
            key={topic.product_id}
            to="/product"
            onClick={(e) => setProductId(topic.product_id)}
            className="bg-gray-200 w-72 h-[500px] flex flex-col p-3 rounded-2xl m-2 cursor-pointer hover:shadow-2xl hover:shadow-gray-600"
          >
            <div className="w-full h-96 overflow-hidden rounded-2xl">
              <img
                src={topic.product_image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4">
              <h1 className="text-lg font-semibold">{topic.product_name}</h1>
              <p className="text-gray-600">price: Rs.{topic.product_price}</p>
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
