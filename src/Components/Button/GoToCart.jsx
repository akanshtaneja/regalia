import React, { useState } from "react";
import { MiniCart } from "../../Pages/MiniCart/miniCart";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../../Context/CartContext";

export const GoToCart = ({ item }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="flex flex-col items-start gap-3">

      {/* Quantity btn */}
      <div className="flex items-center gap-3 border rounded-lg px-4 py-2 w-fit">
        <button
          onClick={() => removeFromCart(item)}
          className="text-lg font-bold px-2 hover:text-red-500"
        >
          -
        </button>

        <span className="w-6 text-center font-semibold text-gray-700">
          {item.quantity}
        </span>

        <button
          onClick={() => addToCart({ ...item, quantity: 1 })}
          className="text-lg font-bold px-2 hover:text-green-600"
        >
          +
        </button>
      </div>

      {/* Go to Cart Btn */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 w-fit" >
        <IoCartOutline className="w-5 h-5" />
        Go to Cart
      </button>
{isCartOpen ? <MiniCart onClose={() => setIsCartOpen(false)}/> : null  }
    </div>
  );
};
