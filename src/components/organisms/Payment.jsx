import React, { useState } from "react";
import { generateOrderId } from "../../utils/generateorder";
import { IoClose } from "react-icons/io5";

export const Payment = ({
  subtotal,
  shipping,
  total,
  setStep,
  platformFee,
  cartItems,
  clearCart,
  onClose,
}) => {
  const [selected, setSelected] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // validation
  const validate = () => {
    let err = {};

    if (selected === "upi" && !upiId.trim()) {
      err.upi = "UPI ID is required";
    }

    if (selected === "card") {
      if (!card.number) {
        err.number = "Card number required";
      }
      if (!card.expiry) {
        err.expiry = "Expiry required";
      }
      if (!card.cvv) {
        err.cvv = "CVV required";
      }
      if (!card.name) {
        err.name = "Cardholder name required";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // login id
  const userId = JSON.parse(localStorage.getItem("LoginId"));
  // console.log("login Id", userId);

  const handleConfirm = () => {
    if (!validate()) return;

    // prev orders
    const previousOrders =
      JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    // console.log("prev orders", previousOrders);

    // new orders
    const newOrders = cartItems.map((item) => ({
      id: generateOrderId(),
      product: item,
      quantity: item.quantity,
      total: item.price * item.quantity,
      date: new Date().toISOString(),
    }));

    // Save new order
    localStorage.setItem(
      `orders_${userId}`,
      JSON.stringify([...newOrders, ...previousOrders])
    );

    setStep(4);
    clearCart();
  };

  return (
    <div className="h-full overflow-y-auto p-3 text-xs">
      {/* header */}
      <div className="flex justify-between items-center mb-2">
        <p
          onClick={() => setStep(2)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          ← Back to Shipping
        </p>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <IoClose size={22} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* left side */}
        <div className="lg:col-span-2 space-y-2">
          <h1 className="text-base font-semibold mb-1">Payment Method</h1>


          {/* UPI */}
          <label
            className={`border rounded-md cursor-pointer flex gap-2 p-2
          ${selected === "upi" ? "border-black" : ""}`}
            onClick={() => setSelected("upi")}
          >
            <input type="radio" checked={selected === "upi"} />
            <div className="w-full">
              <p className="font-medium">UPI / QR Code</p>

              {selected === "upi" && (
                <>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                    className="border p-1.5 rounded-md mt-1 w-full text-xs"
                  />
                  {errors.upi && (
                    <p className="text-red-500 mt-0.5">{errors.upi}</p>
                  )}
                </>
              )}
            </div>
          </label>

          {/* CARD */}
          <label
            className={`border rounded-md cursor-pointer flex gap-2 p-2
          ${selected === "card" ? "border-black" : ""}`}
            onClick={() => setSelected("card")}
          >
            <input type="radio" checked={selected === "card"} />
            <div className="w-full">
              <p className="font-medium">Debit / Credit Card</p>

              {selected === "card" && (
                <div className="mt-1 space-y-1.5">
                  <input
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                    placeholder="Card Number"
                    className="border p-1.5 rounded-md w-full text-xs"
                  />
                  {errors.number && (
                    <p className="text-red-500">{errors.number}</p>
                  )}

                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                      placeholder="MM/YY"
                      className="border p-1.5 rounded-md text-xs"
                    />
                    <input
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                      maxLength="3"
                      type="password"
                      placeholder="CVV"
                      className="border p-1.5 rounded-md text-xs"
                    />
                  </div>

                  {(errors.expiry || errors.cvv) && (
                    <p className="text-red-500">
                      {errors.expiry || errors.cvv}
                    </p>
                  )}

                  <input
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    placeholder="Cardholder Name"
                    className="border p-1.5 rounded-md w-full text-xs"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
              )}
            </div>
          </label>

          {/* COD */}
          <label
            className={`border rounded-md cursor-pointer flex gap-2 p-2
          ${selected === "cod" ? "border-black" : ""}`}
            onClick={() => setSelected("cod")}
          >
            <input type="radio" checked={selected === "cod"} />
            <p className="font-medium">Cash on Delivery</p>
          </label>
        </div>

        {/* order summary */}
        <div className="border rounded-lg p-4 h-fit shadow-sm bg-white sticky top-3">
          <h2 className="text-base font-semibold mb-2">Order Summary</h2>

          <div className="flex justify-between mb-1">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Shipping</p>
            <p>₹{shipping}</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Platform Fee</p>
            <p>₹{platformFee}</p>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>₹{total}</p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full mt-3 bg-black text-white py-2 rounded-md text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white  "
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};
