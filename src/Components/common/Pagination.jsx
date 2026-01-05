import React from "react";

const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, current - 1, current, current + 1, total);
    }
  }
  return pages;
};

export const Pagination = ({ page, pageHandler, dynamicPage }) => {
  return (
    <div className="mt-10 space-x-4 ">
      {/* prev btn */}
      <button
        disabled={page === 1}
        className={`${
          page === 1 ? "bg-gray-700" : "bg-gray-900"
        } text-white px-3 py-1 rounded-md cursor-pointer`}
        onClick={() => {
          pageHandler(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Prev
      </button>

      {/* number */}
      {getPages(page, dynamicPage)?.map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => {
              typeof item === "number" && pageHandler(item);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`cursor-pointer ${
              item === page ? "font-bold text-black" : "text-black"
            }`}
          >
            {item}
          </span>
        );
      })}

      {/* next btn */}
      <button
        disabled={page === dynamicPage}
        className={`${
          page === dynamicPage ? "bg-gray-700" : "bg-gray-900"
        } text-white px-3 py-1 rounded-md cursor-pointer`}
        onClick={() => {
          pageHandler(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Next
      </button>
    </div>
  );
};
