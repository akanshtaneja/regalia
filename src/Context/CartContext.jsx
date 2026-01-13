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
  const addToCart = (item, qty = 1) => {
  const userId = JSON.parse(localStorage.getItem("LoginId"));

  const isItemInCart = cartItems.find(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  );

  let updatedCart;

  if (isItemInCart) {
    updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.size === item.size) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + qty,   
        };
      }
      return cartItem;
    });
  } else {
    updatedCart = [
      ...cartItems,
      { ...item, quantity: qty },   
    ];
  }

  setCartItems(updatedCart);
  localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
};


// update cart quantity 
const updateCartQuantity = (item, quantity) => {
  const userId = JSON.parse(localStorage.getItem("LoginId"));

  const updatedCart = cartItems.map((cartItem) =>
    cartItem.id === item.id && cartItem.size === item.size
      ? { ...cartItem, quantity }
      : cartItem
  );

  setCartItems(updatedCart);
  localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
};

  // ---REMOVE----
  const removeFromCart = (item) => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (isItemInCart.quantity === 1) {
      const newItemCartUpdate = cartItems.filter(
        (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size)
      );
      setCartItems(newItemCartUpdate);
      localStorage.setItem(`Cart_${userId}`, JSON.stringify(newItemCartUpdate));
    } else {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
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
    const updatedCart = cartItems.filter(
      (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size)
    );
    setCartItems(updatedCart);
    localStorage.setItem(`Cart_${userId}`, JSON.stringify(updatedCart));
  };

  // clear cart
  const clearCart = () => {
    const userId = JSON.parse(localStorage.getItem("LoginId"));
    setCartItems([]);
    localStorage.setItem(`Cart_${userId}`, JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        deleteFromCart,
        cartQuantity,
        clearCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
