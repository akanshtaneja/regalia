import React, {memo} from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const DetailPageImage = ({singleProduct, selectedImg, setSelectedImage, toggleWishlist, isItemInWishlist
}) => {
  return (
    <div className="flex gap-6 justify-center md:justify-start">

      {/* small images */}
      <div className="flex flex-col gap-3">
        {singleProduct?.image?.map((img, index) => (
          <img
            key={img}
            src={img}
            loading="lazy"
            onClick={() => setSelectedImage(img)}
            className={`md:w-[60px] md:h-[60px] p-1 rounded-md cursor-pointer transition w-[70px] h-[50px]
            ${selectedImg === img ? "border border-black" : "border border-gray-300"}`}
          />
        ))}
      </div>

      {/* large image */}
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
          loading="lazy"
          className="rounded-xl max-w-[350px] w-full transition-transform duration-300 hover:scale-105"
        />
      </div>

    </div>
  );
};


export default React.memo(DetailPageImage)