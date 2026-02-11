import React, { useEffect, useRef, useState, memo } from "react";
import { useCart } from "../context/CartContext";
import { Checkout } from "../components/organisms/Checkout";
import { Payment } from "../components/organisms/Payment";
import { SuccessPopup } from "../components/organisms/SuccessPopup";
import { Cart } from "../components/organisms/Cart";
import { EmptyCart } from "../components/organisms/EmptyCart";
import {useEscapeKey} from "../hooks/useEscapeKey"

 const MiniCart = ({ onClose }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    deleteFromCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({});

 useEscapeKey(true, onClose); 


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 bg-white w-[950px] h-[92vh] rounded-xl shadow-2xl flex flex-col overflow-y-auto"
        
      >
        {step === 4 ? (
          <SuccessPopup onClose={onClose} />
        ) : cartItems.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : step === 1 ? (
          <Cart
            onClose={onClose}
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            getCartTotal={getCartTotal}
            setStep={setStep}
            deleteFromCart={deleteFromCart}
          />
        ) : step === 2 ? (
          <Checkout
            subtotal={getCartTotal()}
            step={step}
            setStep={setStep}
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
            onClose={onClose}
            cartItems={cartItems}
          />
        ) : (
          <Payment
            subtotal={getCartTotal()}
            shipping={checkoutData.shipping}
            platformFee={checkoutData.platformFee}
            total={checkoutData.total}
            setStep={setStep}
            setCheckoutData={setCheckoutData}
            cartItems={cartItems}
            clearCart={clearCart}
            onClose={onClose}
          />
        )}

      </div>
    </div>
  );
};

export default React.memo(MiniCart)