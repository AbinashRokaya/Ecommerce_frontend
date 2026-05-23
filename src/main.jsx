import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Card from "./components/Card.jsx";
import Cart from "./components/Cart.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Admin from "./admin/Admin.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import Category from "./admin/Category.jsx";
import ProductList from "./admin/ProductList.jsx";
import Order from "./admin/Order.jsx";
import CategoryList from "./admin/CategoryList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Card />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "categoryList",
            element: <CategoryList />,
            children: [
              {
                path: "category",
                element: <Category />,
              },
            ],
          },

          {
            path: "productList",
            element: <ProductList />,
            children: [
              {
                path: "add",
                element: <AddProduct />,
              },
            ],
          },
          {
            path: "orders",
            element: <Order />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>,
);
