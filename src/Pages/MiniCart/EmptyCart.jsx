import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";

export const EmptyCart = ({onClose}) => {
  return (
    <>
      <div className="flex justify-between items-center px-7 py-5 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <IoClose size={28} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <img
          src="https://cdn.dribbble.com/userupload/8913721/file/original-27f29cc8cf3843454340ffa980be35f5.gif"
          className="w-40 mb-4"
        />
        <p className="text-lg font-medium">Your cart is empty 🛍️</p>
        <p className="text-sm text-gray-500">Start shopping now!</p>

        <Link to="/products" onClick={onClose}>
          <button className="mt-4 px-7 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800">
            Continue Shopping <IoMdArrowForward />
          </button>
        </Link>
      </div>
    </>
  );
};
