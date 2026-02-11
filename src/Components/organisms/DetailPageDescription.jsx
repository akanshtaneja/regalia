import React, { useState, memo } from "react";
import { FiChevronDown } from "react-icons/fi";


const DetailPageDescription = ({ singleProduct }) => {
  const [open, setOpen] = useState(false);

  if (!singleProduct?.description) return null;

  return (
    <div className="max-w-5xl mx-auto px-5 mt-10">

      {/* main heading */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 border-b"
      >
        <span className="text-lg font-semibold text-gray-900">
          Product Details
        </span>

        <FiChevronDown
          className={`transition-transform duration-300 ${ open ? "rotate-180" : "" }`}
          size={20} />
      </button>

      {/* description*/}
      {open && (
        <div className="pt-4 text-gray-600 leading-relaxed">
          {singleProduct.description}
        </div>
      )}

    </div>
  );
};

export default React.memo(DetailPageDescription)