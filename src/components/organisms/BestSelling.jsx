import React, { useContext, useMemo } from "react";
import { DataContext } from "../../context/DataContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { getData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { ProductCardShimmer } from "../../components/Shimmer/ProductCardShimmer";
import Button from "../atoms/Button";

export const BestSelling = () => {
  const { data } = useContext(DataContext);
  const { categoryOnlyData } = getData();

  const navigate = useNavigate();

  const handleCategoryClick = (item) => {
    navigate({
      pathname: "/products",
      search: `?category=${item}&page=1&min=0&max=50000&q=`,
    });
  };

  const selectedId = useMemo(() => {
    return [22, 45, 17, 10, 25, 32, 37, 41];
  }, []);

  const customProducts = useMemo(() => {
    return data?.filter((item) => selectedId.includes(Number(item.id)));
  }, [data, selectedId]);

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-7">
        {/* heading */}
        <div className="text-center mb-12">
          <h1 className="md:text-3xl font-bold text-gray-900 uppercase tracking-wide font-nunito text-2xl">
            Regalia top styles
          </h1>

          <div className="flex gap-3 mt-5 overflow-x-auto scrollbar-hide  px-2 md:justify-center ">
            {categoryOnlyData?.map((item) => (
              <button
                key={item}
                className=" px-4 py-1 text-black uppercase text-md relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-6 "
                onClick={() => {
                  handleCategoryClick(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {data?.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
              {customProducts.map((item) => (
                <ProductCard key={item.id} product={item} showCartBtn={false} />
              ))}
            </div>


            <div className="mt-10">
              <Link to="/products">
                <Button>Explore Collection</Button>
              </Link>
            </div>

          </div>
        ) : (
          // loading
          <ProductCardShimmer />
        )}
      </div>
    </div>
  );
};
