import { createContext, useState, useContext } from "react";
import { errorMessage, successMessage } from "../utils/toastfunctions";



export const CartContext = createContext(null);



export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);





  // --- CART QUANTITY
const cartQuantity = (item) => {
  return  cartItems.reduce((total, item) => total + item.quantity, 0);
  
}


// ----ADD ----
  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    const totalQuantity = cartQuantity()
     if (totalQuantity >= 50) {
      errorMessage("You cannot add more than 50 products!")
     }
    else {

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      ); 

    } else {
      setCartItems([...cartItems, { ...item, quantity : item.quantity }]);
    }
    }
  };

// ---REMOVE----
  const removeFromCart = (item) => {   
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };


// ---CART TOTAL---
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0 )}

// ----CLEAR---
  const clearCart = () => {
    setCartItems([]);
  };



const deleteFromCart = (item) => {
  setCartItems((prevCart) =>
    prevCart.filter((cartItem) => cartItem.id !== item.id)
  );
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        deleteFromCart,
        cartQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
