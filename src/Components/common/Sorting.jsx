import React, { useState } from "react";
import { MdOutlineSort } from "react-icons/md";

export const Sorting = ({ onSort }) => {
  const [openSort, setOpenSort] = useState(false);

  return (
    <div className="relative">
      {/* sort btn */}
      <button
        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-medium "
        onClick={() => setOpenSort((prev) => !prev)}
      >
        <MdOutlineSort className="text-lg"/>
        Sort By
      </button>

      {openSort && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-20">
          <button
            onClick={() => { onSort("lowToHigh");
              setOpenSort(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Price: Low to High
          </button>

          <button
            onClick={() => { onSort("highToLow");
              setOpenSort(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Price: High to Low
          </button>
        </div>
      )}
    </div>
  );
};
