import { createContext, useState, useContext, useEffect } from "react";
import { errorMessage, successMessage } from "../utils/toastfunctions";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // cartt data load
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    const alreadyItemsInCart =
      JSON.parse(localStorage.getItem(`Cart_${userId}`)) || [];
    setCartItems(alreadyItemsInCart);
  }, []);

  // --- CART QUANTITY
  const cartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // ----ADD ----
  const addToCart = (item) => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    const totalQuantity = cartQuantity();
    if (totalQuantity >= 50) {
      errorMessage("You cannot add more than 50 products!");
    } else {
      if (isItemInCart) {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );

        setCartItems(updatedCart);
        localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
      } else {
        const newItemCartUpdate = [
          ...cartItems,
          { ...item, quantity: item.quantity },
        ];
        setCartItems(newItemCartUpdate);
        localStorage.setItem(
          `Cart_${userId}`,
          JSON.stringify(newItemCartUpdate)
        );
      }
    }
  };

  // ---REMOVE----
  const removeFromCart = (item) => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      const newItemCartUpdate = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(newItemCartUpdate);
      localStorage.setItem(`Cart_${userId}`, JSON.stringify(newItemCartUpdate));
    } else {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
    }
  };

  // ---CART TOTAL---
  const getCartTotal = (item) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // del from cart
  const deleteFromCart = (item) => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
  };


  // clear cart 
  const clearCart = () =>{
  const userId = JSON.parse(localStorage.getItem("LoginId"));
  setCartItems([]);
  localStorage.setItem(`Cart_${userId}`, JSON.stringify([]));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        deleteFromCart,
        cartQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
