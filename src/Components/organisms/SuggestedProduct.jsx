import React from "react";
import  ProductCard  from "./ProductCard";
import { IoSparklesSharp } from "react-icons/io5";

export const SuggestedProduct = ({ product, allProducts }) => {
  const suggestions = allProducts.filter(
    (p) => p.category[0] === product.category[0] && p.id !== product.id
  );


  return (
    <div className="max-w-5xl mx-auto m-10">
      <div className="flex items-center gap-2 mb-4 px-5">
  <h1 className="text-xl font-semibold">Inspired By This Piece</h1>
  <IoSparklesSharp className="text-amber-500 text-md" />
</div>
      
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {suggestions.map((item) => (
            <div  key={item.id} className=" md:w-[220px] flex-shrink-0 w-[150px]">
          <ProductCard  product={item} showCartBtn={false}/>
          </div>
        ))}
      </div>
    </div>
  );
};
