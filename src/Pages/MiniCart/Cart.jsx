import React from "react";
import { IoClose } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

export const Cart = ({
  onClose,
  cartItems,
  addToCart,
  removeFromCart,
  getCartTotal,
  setStep,
}) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center px-7 py-5 border-b ">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-600">
          <IoClose size={28} />
        </button>
      </div>

      <div className="flex h-full overflow-hidden">
        {/* cart items list*/}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="py-4 px-7">
            <p
              onClick={onClose}
              className="text-blue-600 text-sm cursor-pointer hover:underline"
            >
              ← Continue Shopping
            </p>
          </div>

          {/* list* */}
          <div className="px-7 divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-4"
              >
                {/* image */}
                <div className="flex items-center gap-4 w-[50%]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-15 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-gray-800 font-medium text-[12px]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[12px] font-semibold">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-1 border rounded-lg px-2 py-1">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-md px-2 hover:text-red-600"
                  >
                    -
                  </button>

                  <span className="w-3 text-center">{item.quantity}</span>

                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="text-md px-2 hover:text-green-600"
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* summary */}
        <div className="w-[300px] border-l bg-white flex flex-col h-full flex-none">
          <div className="flex-1 px-6 py-8 space-y-6">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            <div className="flex justify-between text-gray-700 text-[15px]">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 text-[15px]">
              <p>Platform Fee</p>
              <p> ₹7</p>
            </div>

            <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md text-gray-700 text-sm border border-gray-200">
              <p>Shipping will be calculated at checkout</p>
            </div>

            <div className="h-[1px] bg-gray-200 w-full"></div>

            <div className="flex justify-between text-[16px] font-bold">
              <span>Total</span>
              <span>₹{(getCartTotal() + 7).toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-6 py-5 border-t bg-white">
            <button
              className="w-full h-[48px] rounded-md bg-black text-white font-semibold tracking-wide hover:bg-gray-900"
              onClick={() => setStep(2)}
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
