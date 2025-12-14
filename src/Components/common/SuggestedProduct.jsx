import React from "react";
import { ProductCard } from "./ProductCard";

export const SuggestedProduct = ({ product, allProducts }) => {
  const suggestions = allProducts.filter(
    (p) => p.category[0] === product.category[0] && p.id !== product.id
  );
//   console.log("current", product);
//   console.log("all product", allProducts);
//   console.log("suggested product", suggestions);

  return (
    <div className="max-w-5xl mx-auto mb-10">
      <h1 className="mb-4 mt-10 font-bold text-2xl mx-auto text-center">You May Also Like</h1>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {suggestions.map((item) => (
            <div className=" md:w-[220px] flex-shrink-0 w-[150px]">
          <ProductCard key={item.id} product={item} showCartBtn={false}/>
          </div>
        ))}
      </div>
    </div>
  );
};
