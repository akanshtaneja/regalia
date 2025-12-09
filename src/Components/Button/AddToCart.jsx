import React, {useState} from "react";
import { useCart } from "../../Context/CartContext";
import { IoCartOutline } from "react-icons/io5"; 

export const AddToCart = ({singleProduct}) => {
    const { addToCart } = useCart();
    const [qty , setQty] = useState(1)
  return (
    <>
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
        <input
        id='quantity'
          type="number"
          value={qty}
          min={1}
          max={10}
          className="w-20 border border-gray-300 rounded-lg px-3 py-1"
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => addToCart({ ...singleProduct, quantity: qty })}
          className=" flex items-center justify-center gap-2 bg-black hover:bg-gray-900  text-white px-8 py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 mt-2 "
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </>
  );
};
