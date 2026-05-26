import React, { use, useEffect, useState } from "react";
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

function Cart() {
  const [ischecked, setIsChecked] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(1);
  const [cartValue, setCartValue] = useState([]);

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

    fetchCart();
  }, []);

  const handleTopicChange = (e) => {
    const value = Number(e.target.value);
    const checked = e.target.checked;

    if (!(value in quantity)) {
      setQuantity((prev) => ({
        ...prev,
        [value]: prev[value] || 1,
      }));
    }

    if (checked) {
      setIsChecked((prev) => [...prev, value]);

      for (let i = 0; i < TOPICS.length; i++) {
        if (TOPICS[i].product_id === value) {
          setTotalPrice(
            (prev) => prev + TOPICS[i].product_price * (quantity[value] || 1),
          );
          break;
        }
      }

      // setTotalQuantity((prev) => prev + (quantity[value] || 1));
      // setTotalPrice((prev) => prev + totalquantity * 200);
    } else {
      setIsChecked((prev) => prev.filter((id) => id !== value));
      for (let i = 0; i < TOPICS.length; i++) {
        if (TOPICS[i].product_id === value) {
          setTotalPrice(
            (prev) => prev - TOPICS[i].product_price * (quantity[value] || 1),
          );
          setQuantity((prev) => {
            const newQuantity = { ...prev };
            delete newQuantity[value];
            return newQuantity;
          });
          break;
        }
      }
    }
  };

  const handeQuantityIncrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
    // setTotalPrice((prev) => prev + 200);
  };

  const handeQuantityDescrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
    // setTotalPrice((prev) => prev - 200);
  };
  useEffect(() => {
    console.log("Updated quantity:", quantity);
  }, [quantity]);

  useEffect(() => {
    console.log("Updated checked:", ischecked);
  }, [ischecked]);

  return (
    <>
      <div className="min-h-screen w-full flex flex-row gap-3 justify-center mt-6 mr-6 ">
        <div className="w-[50%] h-full flex flex-col flex-wrap gap-1  items-center ">
          {TOPICS.map((topic, index) => (
            <div
              key={topic.product_id}
              className="flex flex-row gap-6 justify-center items-center bg-gray-200 h-full w-full  rounded-2xl p-6"
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
                  src={topic.product_image}
                  alt=""
                  className="w-50 h-50 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <div>
                  <h1 className="font-bold text-2xl">shoes</h1>
                </div>

                <div>
                  <p>Rs .{topic.product_price}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handeQuantityDescrease(topic.product_id)}
                  className="w-10 h-10 border-none text-2xl text-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-600 active:bg-gray-400"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity[topic.product_id] || 1}
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
                <p>delete</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3  bg-gray-200 h-full w-[25%] p-3 rounded-2xl ">
          <div className="flex flex-row justify-between gap-3 w-full">
            <div>
              <p>Order ({totalquantity} item)</p>
            </div>
            <div>
              <p>Total: Rs. 600</p>
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
            <button>Order</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
