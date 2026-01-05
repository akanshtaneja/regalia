import React from "react";
import { GetRecentlyViewed } from "../../utils/SaveRecentlyViewed";
import { ProductCard } from "./ProductCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const RecentlyViewed = () => {
  const items = GetRecentlyViewed();

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-50 ">
        <div className="max-w-5xl mx-auto px-5 pb-10 pt-4 ">
          {/* heading */}

          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide">
              Resume Your Selection
            </h1>
            <Link to="/products">
              <FaArrowRightLong size={25} />
            </Link>
          </div>

          {/* products */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {items.map((item) => (
              <div
                key={item.id}
                className="md:w-[220px] w-[190px] flex-shrink-0"
              >
                <ProductCard product={item} showCartBtn={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
