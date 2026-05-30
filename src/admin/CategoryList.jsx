import React, { useContext, useEffect, useState } from "react";
import Category from "./Category";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import API_URL from "../api/api";

function CategoryList() {
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
  const [editId, setEditId] = useState(0);
  const [categoryValue, setCategoryValue] = useState([]);

  const nagavitor = useNavigate();
  const handleDelete = (e) => {
    setEditId(e.target.value);
    const DeleteCategory = () => {
      fetch(`${API_URL}/v1/categorys/${editId}`, {
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
          nagavitor("/admin/categoryList");
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

  useEffect(() => {
    const fetchCategory = () => {
      fetch(`${API_URL}/v1/categorys`, {
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
          setCategoryValue(data["data"]["category_list"]);
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

    fetchCategory();
  }, []);
  return (
    <div className="relative min-h-screen w-full bg-gray-100 ">
      {isadded && (
        <Category setIsEdit={setIsAdded} setIsBlur={setIsBlur} type={mode} />
      )}
      {isEdit && (
        <Category setIsEdit={setIsEdit} setIsBlur={setIsBlur} type={mode} />
      )}
      <div
        className={`${isblur ? "blur-sm" : ""} flex justify-between items-center p-6 bg-gray-300 `}
      >
        <h1>Category List</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
        >
          Add Category
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
        {categoryValue.map((category) => (
          <div
            key={category.category_id}
            className=" bg-gray-200 h-full w-[25%] rounded-2xl p-6"
          >
            <div>
              <img
                src={category.category_image_url || null}
                alt=""
                className="w-50 h-50 rounded-2xl object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div>
                <h1 className="font-bold text-2xl">{category.category_name}</h1>
              </div>

              <div>
                <p className="text-gray-500">{category.category_description}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-between items-center mt-4">
              <button
                value={category.category_id}
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:shadow-2xl hover:shadow-gray-600 active:bg-blue-600"
              >
                Edit
              </button>
              <button
                value={category.category_id}
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

export default CategoryList;
