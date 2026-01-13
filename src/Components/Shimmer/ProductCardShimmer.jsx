import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductCardShimmer = () => {
   return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
      {[1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12].map((i) => (
        <div key={i}>
          {/* image */}
          <Skeleton height={160} />

          {/* title */}
          <Skeleton height={15} className="mt-4" />

          {/* price */}
          <Skeleton height={15} width="60%" className="mt-2" />
        </div>
      ))}
    </div>
   )
};

