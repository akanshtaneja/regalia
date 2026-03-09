import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const DetailPageShimmer = () => {
  return (
    <div className="max-w-6xl mx-auto px-10 mt-10">

        {/*---------------left side-------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* images */}
        <div className="flex gap-6 justify-center md:justify-start">

          {/* small images */}
          <div className="flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="w-[50px] md:h-[60px] h-[50px]">
                <Skeleton className="w-full h-full rounded-md" />
              </div>
            ))}
          </div>

          {/* large image */}
          <div className="rounded-xl max-w-[350px] w-full overflow-hidden">
            <Skeleton className="w-full h-[250px] md:h-[380px]" />
          </div>
        </div>

        {/* ----------right side----------- */}
        <div className="flex flex-col gap-5">

          {/* title */}
          <Skeleton height={32} width="80%" />

          {/* rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} circle width={18} height={18} />
            ))}
          </div>

          {/* price */}
          <Skeleton height={28} width="40%" />

          {/* size btn */}
          <Skeleton height={50} width="60%" />

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 mt-4">
            <Skeleton width={120} height={50} />
            <Skeleton width={220} height={50} />
          </div>
          
        </div>
      </div>
    </div>
  );
};
