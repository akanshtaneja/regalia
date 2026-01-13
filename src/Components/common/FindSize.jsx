import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export const FindSize = ({
  onClose,
  isOpen,
  singleProduct,
  selectedSize,
  setSelectedSize,
  onConfirm,
}) => {
  const [localSize, setLocalSize] = useState(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (localSize && confirmBtnRef.current) {
      confirmBtnRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [localSize]);

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

          {/* drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 px-6 py-5 flex flex-col overflow-y-auto scrollbar-hide"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {/* header */}
            <div className="flex items-center justify-between pb-4 mb-4 mt-2 md:pl-0 pl-5">
              <h2 className="md:text-xl font-bold tracking-wide uppercase text:lg">
                Choose a Size
              </h2>
              <button onClick={onClose}>
                <IoClose className="md:text-2xl hover:text-black text-xl"/>
              </button>
            </div>

            {/* size buttons */}
            <div className="flex flex-col gap-3 mb-auto mx-auto md:w-[280px] w-[240px]">
              {singleProduct?.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setLocalSize(item)}
                  className={` w-full md:h-14 h-12 text-sm font-semibold tracking-wide uppercase flex items-center px-5 transition hover:border-black
                    ${ localSize === item ? " border border-black" : "border border-gray-300"}`}>
                  {item}
                </button>
              ))}

              {localSize && (
                <button
                  ref={confirmBtnRef}
                  onClick={() => onConfirm(localSize)}
                  className="bg-black text-white uppercase py-4 px-3 md:text-md mt-5 text-sm tracking-wider"
                >
                  confirm your selection
                </button>
              )} 
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
