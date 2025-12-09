import React from "react";
import { IoClose } from "react-icons/io5";
import { getData } from "../../Context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

export const FilterSection = ({
  isOpen,
  onClose,
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
}) => {
  const { categoryOnlyData } = getData();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* overlayy */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sliding bar */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 px-6 py-5 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {/* main heading */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold tracking-wide">Filters</h2>
              <button onClick={onClose}>
                <IoClose className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 pr-1">
              {/* category */}
              <section className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Category
                </h3>

                <div className="space-y-2">
                  {categoryOnlyData?.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={item}
                        checked={category === item}
                        onChange={(e) => {
                          handleCategoryChange(e);
                          setTimeout(onClose, 120);
                        }}
                        className="accent-black"
                      />
                      <span className="text-sm text-gray-800 uppercase">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* price */}
              <section className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Price Range
                </h3>

                <p className="text-sm font-medium mb-2">
                  ₹{priceRange[0]} – ₹{priceRange[1]}
                </p>

                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-black"
                />
              </section>
            </div>

            {/* clear btn*/}
            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setPriceRange([0, 50000]);
                }}
                className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition">
                Clear Filters
              </button>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
