import React, { useState, useContext, useEffect, use } from "react";
import { DataContext, getData } from "../Context/DataContext";
import { FilterSection } from "../Components/common/FilterSection";
import Loading from "../assets/Animations/loading.webm";
import { ProductCard } from "../Components/common/ProductCard";
import { Navbar } from "../Components/common/Navbar";
import { Pagination } from "../Components/common/Pagination";
import Lottie from "lottie-react";
import Empty from "../assets/Animations/NodataFound.json";
import { Footer } from "../Components/common/Footer";
import { FiFilter } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Sorting } from "../Components/common/Sorting";

export const Products = ({ search, setSearch }) => {
  const { data, fetchAllProducts } = useContext(DataContext);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { categoryOnlyData } = getData();
  const location = useLocation();
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  // categoory route
  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  // Data filter
  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category?.includes(category)) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  // category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // console.log(category)
  };

  // pagination page
  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  // dynamic page
  const dynamicPage = Math.ceil(filteredData?.length / 16);

// sorting validation
  const handleSort = (value) => {
    let sorted = [...filteredData];

    if (value === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (value === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedData(sorted);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-10 py-10">
        {/* category */}
        <div className="flex gap-2  md:justify-center text-lg overflow-x-auto scrollbar-hide md:mb-0 mb-4">
          {categoryOnlyData?.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-1 font-bold ${
                category === item ? "text-gray-500" : "text-black"
              } `}
              onClick={() =>
                navigate("/products", { state: { category: item } })
              }
            >
              {item}
            </button>
          ))}
        </div>

        {/* filter */}
        <div className="flex justify-between items-center px-2 w-full">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-medium "
          >
            <FiFilter className="text-lg" />
            Filters
          </button>
          
          <FilterSection
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
            search={search}
            setSearch={setSearch}
          />
{/* sorting */}
          <Sorting onSort={handleSort} />
        </div>

        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 max-w-5xl mx-auto">
              {/* Products */}
              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                    {(sortedData.length > 0 ? sortedData : filteredData)
                      ?.slice(page * 16 - 16, page * 16)
                      .map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-[400px] w-[400px]">
                  <Lottie animationData={Empty} loop={true} />
                  <h1 className="text-xl font-semibold text-gray-600 mt-4">
                    Sorry, No Products found!!
                  </h1>
                </div>
              )}
            </div>
          </>
        ) : (
          // Loasing
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
