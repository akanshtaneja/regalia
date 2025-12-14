import React, { useState } from "react";
import { generateOrderId } from "../../utils/generateorder";

export const Payment = ({subtotal, shipping, total, setStep, platformFee, cartItems, clearCart,}) => {

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
      if (!card.number) 
        {err.number = "Card number required";

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
    const userId = JSON.parse(localStorage.getItem("LoginId"))
    console.log("login Id", userId)


  const handleConfirm = () => {
    if (!validate()) return;



    
    // prev orders
    const previousOrders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    console.log("prev orders", previousOrders)



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
    <div className="h-full overflow-y-auto p-4 text-sm">
      <p
        onClick={() => setStep(2)}
        className="text-blue-600 text-xs cursor-pointer hover:underline mb-3"
      >
        ← Back to Shipping
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h1 className="text-lg font-semibold">Payment Method</h1>

          {/* UPI */}
          <label forhtml="upi"  className={`border p-3 rounded-lg cursor-pointer flex gap-3
           ${ selected === "upi" ? "border-black" : "" }`}
            onClick={() => setSelected("upi")}
          >
            <input 
            id="upi"
            type="radio"
             checked={selected === "upi"} 
             />
            <div className="w-full">
              <p className="font-medium">UPI / QR Code</p>

              {selected === "upi" && (
                <>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                    className="border p-2 rounded-md mt-2 w-full text-xs"
                  />
                  {errors.upi && (
                    <p className="text-red-500 text-xs">{errors.upi}</p>
                  )}
                </>
              )}
            </div>
          </label>

          {/* CARD */}
          <label forhtml="card" className={`border p-3 rounded-lg cursor-pointer flex gap-3 
          ${   selected === "card" ? "border-black" : ""}`}
            onClick={() => setSelected("card")}
          >
            <input 
            id="card"
            type="radio" checked={selected === "card"} 
            />
            <div className="w-full">
              <p className="font-medium">Debit / Credit Card</p>

              {selected === "card" && (
                <div className="mt-2 space-y-2">
                  <input
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                    placeholder="Card Number"
                    className="border p-2 rounded-md w-full text-xs"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs">{errors.number}</p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                      placeholder="MM/YY"
                      className="border p-2 rounded-md w-full text-xs"
                    />
                    <input
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                      maxLength="3"
                      type="password"
                      placeholder="CVV"
                      className="border p-2 rounded-md w-full text-xs"
                    />
                  </div>

                  {errors.expiry && (
                    <p className="text-red-500 text-xs">{errors.expiry}</p>
                  )}
                  {errors.cvv && (
                    <p className="text-red-500 text-xs">{errors.cvv}</p>
                  )}

                  <input
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    placeholder="Cardholder Name"
                    className="border p-2 rounded-md w-full text-xs"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
              )}
            </div>
          </label>

          {/* COD */}
          <label forhtml="cod" className={`border p-3 rounded-lg cursor-pointer flex gap-3
           ${   selected === "cod" ? "border-black" : ""  }`}
            onClick={() => setSelected("cod")}
          >
            <input 
            id="cod"
            type="radio" 
            checked={selected === "cod"} 
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
            </div>
          </label>
        </div>

        {/* SUMMARY */}
        <div className="border rounded-xl p-6 h-fit shadow-sm bg-white sticky top-4">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>₹{shipping}</p>
          </div>

          <div className="flex justify-between">
            <p>Platform Fee</p>
            <p>₹{platformFee}</p>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>₹{total}</p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full mt-4 bg-black text-white py-3 rounded-md"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};
