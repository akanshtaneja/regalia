import React, { memo } from "react";
import { IoClose } from "react-icons/io5";
import { getData } from "../../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEscapeKey } from "../../hooks/useEscapeKey";

const FilterSection = ({
  isOpen,
  onClose,
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onClear,
  metalTypes,
  goldKt,
  selectedMetal,
  selectedGoldKt,
  onMetalChange,
  onGoldKtChange,
}) => {
  const { categoryOnlyData } = getData();

  useEscapeKey(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 px-6 py-5 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={onClose}>
                <IoClose className="text-2xl" />
              </button>
            </div>

            <div className="flex-1">
              {/* category */}
              <section className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  Category
                </h3>

                {categoryOnlyData?.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => onCategoryChange(item)}
                      className="accent-black"
                    />
                    <span className="text-sm uppercase">{item}</span>
                  </label>
                ))}
              </section>

              {/* Metal Type */}
              <section className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  Metal Type
                </h3>

                <div className="flex gap-2 flex-wrap">
                  {metalTypes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onMetalChange(item)}
                      className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wide transition-all duration-200 active:scale-95
                       ${
                         selectedMetal === item
                           ? "bg-black text-white shadow-sm"
                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                       }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* gold kt */}
              <section className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  Gold KT
                </h3>

                <div className="flex gap-2 flex-wrap">
                  {goldKt.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onGoldKtChange(item)}
                      className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wide transition-all duration-200 active:scale-95
                      ${
                        selectedGoldKt === item
                          ? "bg-black text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* price */}
              <section>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  Price Range
                </h3>

                <p className="text-sm mb-2">
                  ₹{minPrice} – ₹{maxPrice}
                </p>

                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) =>
                    onPriceChange([minPrice, Number(e.target.value)])
                  }
                  className="w-full accent-black"
                />
              </section>
            </div>

            {/* clear */}
            <div className="border-t pt-4">
              <button
                onClick={onClear}
                className="w-full bg-black text-white py-2 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(FilterSection);
