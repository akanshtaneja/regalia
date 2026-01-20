import React from "react";
import { Footer } from "../Components/common/Footer";
import { Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
 

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        {/* wishlist container */}        
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg mt-6 p-6">
          
          {/* main heading */}
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <div className=" flex gap-3 items-baseline">
              <FaHeart className="w-4 h-4 md:h-5 md:w-5" />
              <h2 className="text-lg font-bold text-gray-800 md:2xl">
                My Wishlist
              </h2>
            </div>
            <Link
              to="/products"
              className="text-blue-600 text-sm hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-gray-900 text-center">
              <CiHeart size={100} />
              <h1 className="text-3xl">Wishlist is empty.</h1>
              <div className="text-gray-400 text-md  mt-4">
                <p>You don't have any products in the wishlist yet. </p>
                <p>
                  You will find a lot of interesting products on our "Shop"
                  page.
                </p>
              </div>
              <Link to='/products'>
              <button className="mt-7 text-white bg-black py-3 px-5 rounded-md uppercase text-md hover:bg-gray-800">
                Return to shop
              </button>
              </Link>
            </div>
          ) : (
            wishlistItems.map((item) => {
              const orignalPrice = Math.round(
                item.price + item.price * (item.discount / 100)
              );
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4 border-b last:border-none"
                >
                  {/* left side */}
                  <div className="flex items-center gap-9 w-[50%]">
                    <img
                      src={item.image[0]}
                      alt={item.title}
                      loading="lazy"
                      className="w-20 h-20 object-contain"
                    />

                    <div className="flex gap-2 flex-col">
                      <h2 className="md:text-md font-semibold text-sm">
                        {item.title}
                      </h2>

                      {/* price */}
                      <div className="flex gap-2 items-center flex-wrap">
                        <span className="font-bold text-md text-black">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* right side */}
                  <div className="flex gap-3 flex-col item-center">
                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="bg-black text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-800 transition-all duration-200 "
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item)}
                      className="bg-gray-300 text-black text-sm font-medium py-1.5 px-3 rounded-md shadow-sm hover:shadow  hover:bg-gray-400 transition-all duration-200 "
                    >
                      Remove
                    </button>
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


export default Wishlist