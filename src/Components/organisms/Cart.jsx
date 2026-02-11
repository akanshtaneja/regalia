import React from "react";
import { IoClose } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../atoms/Button";

export const Cart = ({
  onClose,
  cartItems,
  addToCart,
  removeFromCart,
  getCartTotal,
  setStep,
  deleteFromCart,
}) => {
  const platformFee = 7;

  return (
    <>
      {/* Header*/}
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <p
          onClick={onClose}
          className="text-xs text-blue-600 cursor-pointer hover:underline"
        >
          ← Continue Shopping
        </p>
        <button onClick={onClose}>
          <IoClose size={20} />
        </button>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-4 py-3 h-full overflow-hidden">
        
        {/* left side*/}
        <div className="lg:col-span-2 space-y-3 overflow-y-auto pr-1">
          {/* cart items */}
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-md p-3"
              >
                {/* Product info */}
                <div className="flex items-center gap-3 w-[55%]">
                  <img
                    src={item.image[0]}
                    alt={item.title}
                    loading="lazy"
                    className="w-12 h-12 object-contain"
                  />

                  <div>
                    <p className="text-xs font-medium line-clamp-1">
                      {item.title}
                    </p>

                    {item.size && (
                      <p className="text-[11px] text-gray-500">
                        Size:{" "}
                        <span className="font-semibold">{item.size}</span>
                      </p>
                    )}

                    <p className="text-xs font-semibold">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* qty button*/}
                <div className="flex items-center gap-1 border rounded-md px-2 py-1 text-xs">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-1 hover:text-red-600"
                  >
                    −
                  </button>

                  <span className="w-4 text-center">{item.quantity}</span>

                  <button
                    disabled={item.quantity >= 4}
                    onClick={() => addToCart(item, 1)}
                    className={`px-1 ${
                      item.quantity >= 4
                        ? "opacity-40"
                        : "hover:text-green-600"
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Del button */}
                <button
                  onClick={() => deleteFromCart(item)}
                  className="text-gray-400 hover:text-black"
                >
                  <FaTrashAlt size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* right side*/}
        <div className="border rounded-lg p-4 space-y-3 h-fit bg-white sticky top-4">
          {/* order summary */}
          <h2 className="text-sm font-semibold">Order Summary</h2>

          <div className="flex justify-between text-xs">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div className="flex justify-between text-sm font-bold">
            <span>Total</span>
            <span>₹{(getCartTotal() + platformFee).toFixed(2)}</span>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white   
            "
          >
            Continue to Checkout
          </button>

          {/* <div className="text-sm">
            <Button onClick={() => setStep(2)}>Continue to Checkout</Button>
          </div> */}

        </div>
      </div>
    </>
  );
};
