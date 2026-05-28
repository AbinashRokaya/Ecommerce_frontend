import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Product() {
  const {
    productId,
    setProductId,
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
  } = useContext(LoginContext);

  const [productValue, setProductValue] = useState({
    product_name: "",
    product_price: 0,
    product_description: "",
    product_category: 1,
    product_quantity: 1,
  });

  const [cartValue, setCartValue] = useState({
    product_id: 0,
    quantity: 0,
  });

  const [price, setPrice] = useState(200);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const nagavitor = useNavigate();

  const handleOrder = () => {
    const orderData = {
      order_items: [
        {
          product_id: productId,
          quantity: Number(quantity),
        },
      ],
    };

    const fetchOrder = () => {
      fetch(`${API_URL}/v1/orders/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
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
          nagavitor("/product");
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

    fetchOrder();
  };
  const handleCart = () => {
    const cartData = {
      product_id: productId,
      quantity: Number(quantity),
    };

    const fetchCart = () => {
      fetch(`${API_URL}/v1/carts/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(cartData),
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
          nagavitor("/product");
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

    fetchCart();
  };

  const handeQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handeQuantityDescrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
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
        // console.log(data["data"]["product_list"][0]);
        setProductValue(data["data"]["product_list"][0]);
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
  }, []);
  useEffect(() => {
    setTotalPrice(quantity * productValue.product_price);
  }, [quantity, productValue]);

  // const handleRedirect = () => {
  //   nagavitor("/");
  // };

  return (
    <div className="min-h-screen w-full flex  flex-col gap-6 justify-center items-center bg-gray-100 p-6">
      {/* <button
        onClick={handleRedirect}
        className=" bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:shadow-2xl hover:shadow-gray-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        Back
      </button> */}
      <div className="bg-gray-200 w-[80%] h-[70vh] flex flex-row gap-6 p-6 rounded-2xl">
        <div className="w-full h-[100%] bg-white rounded-2xl overflow-hidden flex justify-center items-center">
          <img
            src="shoes.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-6 flex flex-col justify-center  gap-4">
          <div>
            <h1 className="text-3xl font-bold mt-4">
              {productValue.product_name}
            </h1>
            <p className="text-xl text-gray-600">
              price Rs. {productValue.product_price}
            </p>
          </div>
          <div className="flex gap-2 flex-col ">
            <div className="mb-2">
              <p className="font-bold font-lg">Quantity:</p>
              <p className="text-gray-500">
                max:{productValue.product_quantity}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={handeQuantityDescrease}
                className="w-10 h-10 border-none text-2xl text-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-600 active:bg-gray-400"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-50 h-10 text-center border rounded-lg"
              />
              <button
                onClick={handeQuantityIncrease}
                className="w-10 h-10 border-none text-2xl text-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-600 active:bg-gray-400"
              >
                +
              </button>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <p className="text-lg font-light">
                Total Price: RS. {totalPrice}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleOrder}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:shadow-2xl hover:shadow-gray-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Buy
            </button>

            <button
              onClick={handleCart}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full hover:shadow-2xl hover:shadow-gray-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 w-[80%] h-[70vh]  p-6 rounded-2xl">
        <h1 className="mb-4 text-bold">Description</h1>
        <hr />
        <p className="mt-4 text-gray-600">{productValue.product_description}</p>
      </div>
    </div>
  );
}

export default Product;
