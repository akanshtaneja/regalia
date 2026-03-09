import React from "react";

const Button = ({ children, type = "button", disabled = false, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className=" bg-black text-white   px-8 py-2 text-lg font-semibold shadow-md transition-all duration-300 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
