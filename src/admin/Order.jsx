import React, { use, useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";

function Order() {
  const orders = [
    {
      id: "#HML-2401",
      customer: "Sita Gurung",
      product: "Himalayan Honey × 3",
      amount: "Rs. 1,350",
      payment: "eSewa",
      date: "2024-07-10",
      status: "Delivered",
    },
    {
      id: "#HML-2402",
      customer: "Ram Thapa",
      product: "Yak Wool Blanket × 1",
      amount: "Rs. 2,800",
      payment: "Khalti",
      date: "2024-07-11",
      status: "Processing",
    },
    {
      id: "#HML-2403",
      customer: "Puja Shrestha",
      product: "Thangka Painting × 1",
      amount: "Rs. 8,500",
      payment: "Bank Transfer",
      date: "2024-07-11",
      status: "Shipped",
    },
    {
      id: "#HML-2404",
      customer: "Arun Rai",
      product: "Timur Pepper × 3",
      amount: "Rs. 540",
      payment: "eSewa",
      date: "2024-07-12",
      status: "Pending",
    },
  ];

  const statusColor = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  const {
    setSuccessMessage,
    setIsSuccess,
    setErrorMessage,
    setIsError,
    productId,
    setProductId,
  } = useContext(LoginContext);

  const [orderValue, setOrderVAlue] = useState([]);
  useEffect(() => {
    const fetchOrder = () => {
      fetch(`http://localhost:8000/v1/orders/all`, {
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
          setOrderVAlue(data["data"]["list_all_item"]);
          console.log(data);
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

    fetchOrder();
  }, []);
  useEffect(() => {
    // Only log if orderValue exists and has at least one item
    if (orderValue && orderValue.length > 0) {
      console.log("order", orderValue[0]["order"]);

      // If you want to see the items inside that order:
      console.log("order items", orderValue[0]["order_item"]);
    }
  }, [orderValue]);

  return (
    <div className="relative min-h-screen w-full bg-gray-100 ">
      <div className="flex justify-between items-center p-6 bg-gray-300 ">
        <h1>Order List</h1>
        <button
          onClick={() => setIsAdded(!isadded)}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
        >
          Add Product
        </button>
      </div>
      <div className="p-6">
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg w-lg mt-1"
        />
      </div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              />

              <select
                name=""
                id=""
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-sm">
                <tr>
                  <th className="p-5">Order ID</th>
                  <th className="p-5">Customer</th>
                  <th className="p-5">Product</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Payment</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {orderValue.map((order_value) => (
                  <tr
                    key={order_value.order.order_id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-5 font-semibold text-orange-500">
                      {order_value.order.order_id}
                    </td>

                    <td className="p-5 font-bold text-gray-800">
                      {order_value.order.order_user_id}
                    </td>

                    <td className="p-5 text-gray-600">Food</td>

                    <td className="p-5 font-bold text-black">
                      {order_value.order.order_amount}
                    </td>

                    <td className="p-5 text-gray-600">eSewa</td>

                    <td className="p-5 text-gray-600">2024-07-11</td>

                    <td className="p-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold `}
                      >
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
