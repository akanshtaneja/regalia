import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Components/common/Footer";
import { CiShoppingCart } from "react-icons/ci";

const Order = () => {
  const [savedOrders, setSavedOrders] = useState([]);

  // login id
  const userId = JSON.parse(localStorage.getItem("LoginId"));
  console.log("login Id", userId);

  useEffect(() => {
    const orderPlaced =
      JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    setSavedOrders(orderPlaced);
  }, []);

  // delivery status
  const getStatus = (orderDate) => {
    const placed = new Date(orderDate);
    const now = new Date();

    const diff = (now - placed) / 1000;

    if (diff < 60) {
      return {
        text: "In Transit",
        color: "bg-orange-50 text-orange-600 border-orange-200",
      };
    }

    if (diff >= 60 && diff < 120) {
      return {
        text: "Out for Delivery",
        color: "bg-blue-50 text-blue-600 border-blue-200",
      };
    }

    return {
      text: "Delivered",
      color: "bg-green-100 text-green-700 border-green-300",
    };
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        {/* order list */}
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg mt-6 p-6">
          {/* heading */}
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="md:text-2xl font-bold text-gray-800 text-lg">
              My Orders
            </h2>
            <Link
              to="/products"
              className="text-blue-600 text-sm hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {savedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-sm mb-4">
                <CiShoppingCart className="text-white" size={35} />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                No Orders Found
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Looks like you haven’t placed any orders yet.
              </p>

              <Link to="/products">
                <button className="mt-7 text-white bg-black py-3 px-5 rounded-lg uppercase text-md hover:bg-gray-800">
                  Return to shop
                </button>
              </Link>
            </div>
          ) : (
            savedOrders.map((order, index) => {
              const status = getStatus(order.date);

              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-none"
                >
                  {/* left image*/}
                  <div className="flex items-center gap-4 w-[40%]">
                    <img
                      src={order.product.image[0]}
                      alt={order.product.title}
                      loading="lazy"
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Order ID:</span>{" "}
                        {order.id}
                      </p>
                      {order.product.size && (
                        <p className="text-sm text-gray-500 mt-1">
                          Size:{" "}
                          <span className="font-semibold">
                            {order.product.size}
                          </span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {order.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="w-[20%] text-center ml-5 md:ml-0">
                    <p
                      className={`text-xs px-3 py-1 rounded-full border inline-block ${status.color}`}
                    >
                      {status.text}
                    </p>
                  </div>
                  <div className="text-right w-[30%]">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Order Placed:</span>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-base font-semibold text-gray-800 mt-1">
                      ₹{order.total}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order