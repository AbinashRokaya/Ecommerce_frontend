import React, { useState } from "react";
import Category from "./Category";
import AddProduct from "./AddProduct";

function CategoryList() {
  const [isadded, setIsAdded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isblur, setIsBlur] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-gray-100 ">
      {isadded && <Category />}
      <div className="flex justify-between items-center p-6 bg-gray-300 ">
        <h1>Category List</h1>
        <button
          onClick={() => setIsAdded(!isadded)}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
        >
          Add Category
        </button>
      </div>
      <div className={`p-6 ${isadded ? "blur-sm" : ""}`}>
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg w-lg mt-1"
        />
      </div>
      <div
        className={`w-full p-6 h-full bg-gray-600 flex flex-row gap-6 flex-wrap ${isadded ? "blur-sm" : ""}`}
      >
        <div className=" bg-gray-200 h-full w-[25%] rounded-2xl p-6">
          <div>
            <img
              src="/product.jpg  "
              alt=""
              className="w-50 h-50 rounded-2xl object-contain"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div>
              <h1 className="font-bold text-2xl">shoes</h1>
              <h3 className="text-gray-600">Food</h3>
            </div>

            <div>
              <p>lorem-ipsum dolor sit amet</p>
            </div>
          </div>

          <div className="flex gap-2 justify-between items-center mt-4">
            <p className="cursor-pointer">
              <button
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
              >
                Edit
              </button>
              {isEdit && <Category />}
            </p>
            <p className="cursor-pointer">delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
