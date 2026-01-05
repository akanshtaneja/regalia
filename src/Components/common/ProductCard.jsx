import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { QuantityButton } from "../Button/QuantityButton";
import { useWishlist } from "../../Context/WishlistContext";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export const ProductCard = ({ product, showCartBtn = false }) => {
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isItemInCart = cartItems.find((cartItem) => cartItem.id === product.id);
  const isItemInWishlist = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === product.id
  );

  const navigate = useNavigate();

  return (
    <div className="rounded-xl flex flex-col h-full bg-transparent cursor-pointer group">
      <div className="relative flex items-center justify-center bg-transparent rounded-t-xl overflow-hidden aspect-square">
        {/* wishlist heart */}
        <button
          aria-label="Add product in your wishlist"
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 md:top-6 md:right-6 text-xl z-10 opacity-0 group-hover:opacity-100 transition-all duration-300
        ${isItemInWishlist ? "opacity-100" : "opacity-0"}`}
        >
          {isItemInWishlist ? (
            <FaHeart className="text-black" />
          ) : (
            <FaRegHeart className="text-black" />
          )}
        </button>

        {/* img */}
        <img
          src={product.image[0]}
          alt={product.image}
          // width={400}
          // height={300}
          onClick={() => navigate(`/products/${product.id}`)}
          className="object-contain  p-2 md:p-5 transition-transform duration-500 h-[400px] w-[500px] group-hover:opacity-0 group-hover:scale-105 "
        />

        <img
          src={product.image[1]}
          alt="hover"
          width={400}
          height={300}
          onClick={() => navigate(`/products/${product.id}`)}
          className="object-contain p-2 md:p-5 absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-105"
        />
      </div>

      {/* Product*/}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <h2 className="text-gray-800 font-semibold text-xs line-clamp-2 mb-1 text-center">
          {product.title}
        </h2>
        <p className="text-gray-900 font-bold text-sm mb-1 text-center">
          ₹{product.price}
        </p>

        {showCartBtn ? (
          isItemInCart ? (
            <QuantityButton item={isItemInCart} />
          ) : (
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="flex items-center justify-center gap-1 md:w-full border border-black text-black  hover:bg-black  hover:text-white py-2  rounded-lg  font-medium transition-all duration-300 w-auto text-sm md:text-base "
            >
              <IoCartOutline className="md:w-5 md:h-5 w-3 h-3" />
              Add to Cart
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

{
  /*
  
  
  {showCartBtn ? ( isItemInCart ? (CartQuantity item={temInCart}/) : <button
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 w-full border  border-red-500  text-red-500  hover:bg-red-500  hover:text-white py-2  rounded-lg  font-medium transition-all duration-300"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </button> )
   : null}


  
  
  */
}
