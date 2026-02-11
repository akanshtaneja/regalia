import React from "react";
import { IoCartOutline } from "react-icons/io5";

export const AddToCart = ({ onClick, label = "Add to Cart" }) => {
  return (
    <button
      onClick={onClick}
      className=" h-[48px] w-[220px] flex items-center justify-center gap-2 bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-transparent hover:text-black hover:border hover:border-black 
      focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2  focus-visible:ring-offset-white " >
      <IoCartOutline className="w-5 h-5" />
      {label}
    </button>
  );
};
