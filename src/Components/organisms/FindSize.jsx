import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {useEscapeKey} from "../../hooks/useEscapeKey"

export const FindSize = ({
  onClose,
  isOpen,
  singleProduct,
  onConfirm,
}) => {
  const [localSize, setLocalSize] = useState(null);
  const confirmBtnRef = useRef(null);

  useEscapeKey(isOpen, onClose)

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
            className="fixed top-0 right-0 h-full sm:w-[400px] bg-white z-50 px-6 py-5 flex flex-col overflow-y-auto scrollbar-hide "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {/* header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 mt-2">
              <h2 className="text-lg md:text-xl font-bold tracking-wide uppercase">
                Choose a Size
              </h2>

              <button onClick={onClose} className="ml-auto">
                <IoClose className="text-xl md:text-2xl hover:text-black" />
              </button>
            </div>

            {/* size buttons */}
            <div className="flex flex-col gap-3 mb-auto mx-auto md:w-[280px] w-[240px]">
              {singleProduct?.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setLocalSize(item)}
                  className={` w-full md:h-14 h-12 text-sm font-semibold tracking-wide uppercase flex items-center px-5 transition hover:border-black
                    ${
                      localSize === item
                        ? " border border-black"
                        : "border border-gray-300"
                    }`}
                >
                  {item}
                </button>
              ))}

              {localSize && (
                <button
                  ref={confirmBtnRef}
                  onClick={() => onConfirm(localSize)}
                  className="bg-black text-white uppercase py-4 px-3 md:text-md mt-5 text-sm tracking-wider focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white "
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
