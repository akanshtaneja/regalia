import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export const DetailPageImage = ({singleProduct, selectedImg, setSelectedImage, toggleWishlist, isItemInWishlist
}) => {
  return (
    <div className="flex gap-6 justify-center md:justify-start">

      {/* small images */}
      <div className="flex flex-col gap-3">
        {singleProduct?.image?.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setSelectedImage(img)}
            className={`w-[60px] h-[60px] p-1 rounded-md cursor-pointer transition
            ${selectedImg === img ? "border border-black" : "border border-gray-300"}`}
          />
        ))}
      </div>

      {/* big image */}
      <div className="relative">

        {/* wishlist */}
        <button
          onClick={() => toggleWishlist(singleProduct)}
          className="absolute top-2 right-2 text-xl z-10 transition-all duration-300"
        >
          {isItemInWishlist ? (
            <FaHeart className="text-black" />
          ) : (
            <FaRegHeart className="text-black" />
          )}
        </button>

        <img
          src={selectedImg}
          alt={singleProduct.title}
          className="rounded-xl max-w-[350px] w-full transition-transform duration-300 hover:scale-105"
        />
      </div>

    </div>
  );
};
