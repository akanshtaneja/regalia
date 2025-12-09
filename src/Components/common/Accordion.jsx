import React, { useState } from "react";

export const Accordion = ({ data }) => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">
                {item.question}
              </span>
              <span
                className={`text-gray-500 transition-transform duration-300 ${
                  activeItem === item.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ${
                activeItem === item.id
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 text-gray-600">{item.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
