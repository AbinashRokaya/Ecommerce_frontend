import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import Home from "./components/Home";
import Header from "./components/header/Header";
import Card from "./components/Card";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { Outlet } from "react-router-dom";
import Success from "./components/Success";
import Errors from "./components/Errors";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Success />
      <Errors />
      <Outlet />
    </>
  );
}

export default App;
