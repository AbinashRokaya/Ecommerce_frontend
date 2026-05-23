import React from "react";

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
            <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>

            <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
              Add Product
            </button>
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
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-5 font-semibold text-orange-500">
                      {order.id}
                    </td>

                    <td className="p-5 font-bold text-gray-800">
                      {order.customer}
                    </td>

                    <td className="p-5 text-gray-600">{order.product}</td>

                    <td className="p-5 font-bold text-black">{order.amount}</td>

                    <td className="p-5 text-gray-600">{order.payment}</td>

                    <td className="p-5 text-gray-600">{order.date}</td>

                    <td className="p-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor[order.status]}`}
                      >
                        {order.status}
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
