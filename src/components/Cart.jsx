import React, { use, useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    productId,
    setProductId,
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
  } = useContext(LoginContext);
  const nagavitor = useNavigate();

  const [ischecked, setIsChecked] = useState([]);
  const [quantitySing, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const [cartValue, setCartValue] = useState([]);
  const [orderValue, setOrderValue] = useState({ order_items: [] });

  useEffect(() => {
    const fetchCart = () => {
      fetch("http://localhost:8000/v1/carts/me", {
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
          console.log(data["data"]["cart_item"]);
          setCartValue(data["data"]["cart_item"]);
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
  }, []);

  const handleTopicChange = (e) => {
    const value = Number(e.target.value);
    const checked = e.target.checked;

    if (!(value in quantitySing)) {
      // setTotalQuantity(
      //   (prev) =>
      //     prev +
      //     cartValue.find((item) => item.product_id === value)["quantity"],
      // );
      setQuantity((prev) => ({
        ...prev,
        [value]:
          prev[value] ||
          cartValue.find((item) => item.product_id === value)["quantity"],
      }));
    }

    if (checked) {
      setIsChecked((prev) => [...prev, value]);

      const updatedOrderItems = [
        ...orderValue.order_items,
        {
          product_id: value,
          quantity:
            quantitySing[value] ||
            cartValue.find((item) => item.product_id === value)["quantity"],
        },
      ];

      setOrderValue({
        order_items: updatedOrderItems,
      });

      for (let i = 0; i < cartValue.length; i++) {
        if (cartValue[i].product_id === value) {
          // setTotalQuantity(
          //   (prev) =>
          //     prev + quantitySing[value] ||
          //     cartValue.find((item) => item.product_id === value)["quantity"],
          // );
          setTotalPrice(
            (prev) =>
              prev +
              cartValue.find((item) => item.product_id === value)[
                "product_price"
              ] *
                (quantitySing[value] ||
                  cartValue.find((item) => item.product_id === value)[
                    "quantity"
                  ]),
          );

          break;
        }
      }
    } else {
      setIsChecked((prev) => prev.filter((id) => id !== value));

      setOrderValue((prev) => ({
        order_items: prev.order_items.filter(
          (item) => item.product_id !== value,
        ),
      }));

      for (let i = 0; i < cartValue.length; i++) {
        if (cartValue[i].product_id === value) {
          // setTotalQuantity(
          //   (prev) =>
          //     prev - quantitySing[value] ||
          //     cartValue.find((item) => item.product_id === value)["quantity"],
          // );
          setTotalPrice(
            (prev) =>
              prev -
              cartValue.find((item) => item.product_id === value)[
                "product_price"
              ] *
                (quantitySing[value] ||
                  cartValue.find((item) => item.product_id === value)[
                    "quantity"
                  ]),
          );

          setQuantity((prev) => {
            const newQuantity = { ...prev };
            delete newQuantity[value];
            return newQuantity;
          });
          // setTotalQuantity((prev) => prev + quantitySing[value]);

          break;
        }
      }
    }
  };
  const handleOrder = () => {
    const fetchOrder = () => {
      fetch(`http://localhost:8000/v1/orders/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderValue),
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
          nagavitor("/cart");
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

  const handeQuantityIncrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handeQuantityDescrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  useEffect(() => {
    for (let i = 0; i > quantitySing.length; i++) {}
    console.log("Updated quantity:", quantitySing);
  }, [quantitySing]);
  useEffect(() => {
    console.log("Updated cart:", cartValue);
  }, []);
  useEffect(() => {
    console.log("Updated order:", orderValue);
  }, []);

  useEffect(() => {
    console.log("Updated checked:", ischecked);
  }, [ischecked]);

  return (
    <>
      <div className="min-h-screen w-full flex flex-row gap-3 justify-center mt-6 mr-6 ">
        <div className="w-[50%] h-full flex flex-col flex-wrap gap-1  items-center ">
          {cartValue.map((topic) => (
            <div
              key={topic.product_id}
              className="flex flex-row gap-6 mb-2 justify-center items-center  bg-gray-200 h-full w-full  rounded-2xl p-6"
            >
              <div>
                <input
                  type="checkbox"
                  value={topic.product_id}
                  checked={ischecked.includes(topic.product_id)}
                  onChange={handleTopicChange}
                  name=""
                  id=""
                  className="w-5 h-5"
                />
              </div>
              <div>
                <img
                  src="product.jpg"
                  alt=""
                  className="w-50 h-50 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <div>
                  <h1 className="font-bold text-2xl">{topic.product_name}</h1>
                </div>

                <div>
                  <p>Rs .{topic.product_price}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center flex-col">
                <div>
                  <p>Quantity</p>
                </div>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => handeQuantityDescrease(topic.product_id)}
                    className="w-10 h-10 border-none text-2xl text-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-600 active:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantitySing[topic.product_id] || topic.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-50 h-10 text-center border rounded-lg"
                  />
                  <button
                    onClick={() => handeQuantityIncrease(topic.product_id)}
                    className="w-10 h-10 border-none text-2xl text-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-600 active:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <div>
                  <p>Max quantity: {topic.product_quantity}</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600 ">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3  bg-gray-200 h-full w-[25%] p-3 rounded-2xl ">
          <div className="flex flex-row justify-between gap-3 w-full">
            <div>
              <p>Total order item</p>
            </div>
            <div>
              <p> {totalquantity}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-3 w-full">
            <div>
              <p>Total</p>
            </div>
            <div>
              <p>Rs. {totalPrice}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full bg-blue-500 rounded-2xl h-10 cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600">
            <button onClick={handleOrder}>Order</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
