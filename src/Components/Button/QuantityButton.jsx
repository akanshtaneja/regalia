import React from 'react'
import { useCart } from "../../Context/CartContext";

export const QuantityButton = ({item}) => {
    const { addToCart, removeFromCart } = useCart();
  return (
  <>
   <div className="flex items-center justify-center gap-2 w-full border  border-black bg-black text-white  py-2  rounded-lg  font-medium transition-all duration-300">
        <button
          onClick={() => removeFromCart(item)}
          className="text-lg font-bold px-2 hover:text-red-600"
        >
          -
        </button>

        <span className="w-6 text-center font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() => addToCart({ ...item, quantity: 1 })}
          className="text-lg font-bold px-2 hover:text-green-600"
        >
          +
        </button>
      </div>
  
  </>
  )
}
