import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";

function Product() {
  const { productId, setProductId } = useContext(LoginContext);
  console.log("productId:", productId);

  const [price, setPrice] = useState(200);
  const [totalPrice, setTotalPrice] = useState(200);
  const [quantity, setQuantity] = useState(1);

  const handeQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + 200);
  };

  const handeQuantityDescrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - 200);
    }
  };

  return (
    <div className="min-h-screen w-full flex  flex-col gap-6 justify-center items-center bg-gray-100 p-6">
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
            <h1 className="text-3xl font-bold mt-4">Bottle</h1>
            <p className="text-xl text-gray-600">price: Rs. {price}</p>
          </div>
          <div className="flex gap-2 flex-col ">
            <div className="mb-2">
              <p className="font-bold font-lg">Quantity:</p>
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
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:shadow-2xl hover:shadow-gray-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Buy
            </button>

            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full hover:shadow-2xl hover:shadow-gray-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 w-[80%] h-[70vh]  p-6 rounded-2xl">
        <h1 className="mb-4">Description</h1>
        <hr />
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          architecto, corporis, ad eveniet id placeat error vitae veritatis
          laboriosam corrupti sit? Id similique error placeat at nihil labore,
          illo sapiente neque unde repellendus voluptatibus ut, harum aspernatur
          est modi quis voluptate!
        </p>
        <p className="mt-4 text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          dolore cumque laborum soluta consequuntur molestias facilis quidem
          amet iure distinctio repudiandae deserunt tempora ducimus voluptas
          iusto autem esse error molestiae, cum assumenda totam tenetur dolores!
          Repellendus, sit laudantium quis veniam eaque rem nihil accusamus
          aperiam recusandae ut suscipit omnis, ab explicabo laboriosam, in
          tempora nulla. Fuga magnam modi, placeat in architecto saepe assumenda
          velit sunt doloremque ipsum, impedit quo explicabo aliquid quis quas
          illo! Autem voluptatem eius culpa. Est officiis odio sint ipsam fuga
          qui nisi id. Error odit officia quas, praesentium, nulla quod
          aspernatur repudiandae aliquid minus quis eligendi, numquam expedita
          pariatur repellendus? Eligendi aperiam, dolor ut eius quo accusantium
          impedit laudantium. Aliquid ea totam quis ratione corrupti! Veritatis
          illum explicabo, nam dicta, voluptatum ipsam fugit aperiam repellendus
          voluptas cupiditate incidunt id odio, facilis quia sequi!
        </p>
      </div>
    </div>
  );
}

export default Product;
