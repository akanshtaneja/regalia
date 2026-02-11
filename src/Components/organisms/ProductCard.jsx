import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isItemInCart = cartItems.find((item) => item.id === product.id);
  const isItemInWishlist = wishlistItems.find((item) => item.id === product.id);

  return (
    <Link
      to={`/products/${product.id}`}
      className=" group rounded-xl flex flex-col h-full bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black
       
      "
    >
      {/* Image Section */}
      <div className="relative flex items-center justify-center rounded-t-xl overflow-hidden aspect-square">
        {/* Wishlist */}
        <button
          aria-label="Add product to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
           className={`absolute top-3 right-3 md:top-6 md:right-6 z-10 text-xl transition-all duration-200 
            ${isItemInWishlist  ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}>

          {isItemInWishlist ? (
            <FaHeart className="text-black" />
          ) : (
            <FaRegHeart className="text-black" />
          )}
          
        </button>

        {/* Images */}
        <img
          src={product.image[0]}
          alt={product.title}
          loading="lazy"
          className="object-contain p-2 md:p-5 h-[400px] w-[500px] transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
        />

        <img
          src={product.image[1]}
          alt={`${product.title} alternate view`}
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-contain p-2 md:p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <h2 className="text-gray-800 font-semibold text-xs line-clamp-2 mb-1 text-center">
          {product.title}
        </h2>

        <p className="text-gray-900 font-bold text-sm mb-2 text-center">
          ₹{product.price}
        </p>

        {/* {showCartBtn &&
          (isItemInCart ? (
            <QuantityButton item={isItemInCart} />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault(); 
                addToCart({ ...product, quantity: 1 });
              }}
              className="flex items-center justify-center gap-1 w-full border border-black text-black
                hover:bg-black hover:text-white
                py-2 rounded-lg font-medium
                transition
                focus-visible:ring-2 focus-visible:ring-black
              "
            >
              <IoCartOutline className="w-4 h-4" />
              Add to Cart
            </button>
          ))} */}
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
