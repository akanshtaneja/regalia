import React from "react";

export const QuantityButton = ({ value, setValue, max = 4 }) => {
  return (
    <div className="flex items-center justify-between w-[120px] h-[48px] border rounded-md hover:border-black transition">
      <button
        onClick={() => value > 1 && setValue(value - 1)}
        disabled={value <= 1}
        className="w-10 h-full text-lg disabled:opacity-40"
      >
        −
      </button>

      <span className="text-sm font-semibold">{value}</span>

      <button
        onClick={() => value < max && setValue(value + 1)}
        disabled={value >= max}
        className="w-10 h-full text-lg disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
};
