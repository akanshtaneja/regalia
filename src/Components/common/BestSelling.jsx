import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { ProductCard } from "./ProductCard";
import Loading from "../../assets/Animations/loading.webm";
import { Link } from "react-router-dom";
import { getData } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
  const { data} = useContext(DataContext);
  const { categoryOnlyData } = getData();
  const navigate = useNavigate()

  const selectedId = [22, 45, 17, 10, 25, 32, 37, 41];

  const customProducts = data?.filter((item) =>
    selectedId.includes(Number(item.id))
  );

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-7">

        {/* heading */}
        <div className="text-center mb-12">
          <h1 className="md:text-3xl font-bold text-gray-900 uppercase tracking-wide font-nunito text-2xl">
              Regalia top styles
          </h1>

        <div className="flex gap-3 mt-5 overflow-x-auto scrollbar-hide  px-2 md:justify-center ">
        {categoryOnlyData?.map((item, index) => (
          
          <button key={index}
          className="px-4 py-1 text-black border border-black hover:bg-black hover:text-white uppercase text-md "
          onClick={() => navigate("/products", {state : {category: item}})}>
            {item}
          </button>
          
        ))
        }
        </div>
          
        </div>

        {data?.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
              {customProducts.map((item) => (
                <ProductCard key={item.id} product={item} showCartBtn={false} />
              ))}
            </div>

            <Link
              to="/products"
              className="bg-black  text-white px-8 py-2 rounded-lg text-lg font-semibold shadow-md  transition-all duration-300 mt-10 inline-block hover:bg-gray-900 "
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};
