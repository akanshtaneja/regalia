import React, { useState, useContext, useEffect, useMemo, memo } from "react";
import { DataContext, getData } from "../context/DataContext";
import FilterSection from "../components/organisms/FilterSection";
import ProductCard from "../components/organisms/ProductCard";
import { Pagination } from "../components/organisms/Pagination";
import Lottie from "lottie-react";
import Empty from "../assets/Animations/NodataFound.json";
import { Footer } from "../components/organisms/Footer";
import { FiFilter } from "react-icons/fi";
import { Sorting } from "../components/organisms/Sorting";
import { ProductCardShimmer } from "../components/Shimmer/ProductCardShimmer";
import { useSearchParams } from "react-router-dom";

const Products = ({ search, setSearch }) => {
  const { data, fetchAllProducts } = useContext(DataContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { categoryOnlyData, metalTypes, goldKt } = getData();
  const [searchParams, setSearchParams] = useSearchParams();

  // search params
  const category = searchParams.get("category") || "All";
  const sortType = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = Number(searchParams.get("min")) || 0;
  const maxPrice = Number(searchParams.get("max")) || 20000;
  const metal = searchParams.get("metal") || "";
  const kt = searchParams.get("kt") || "";
  const query = searchParams.get("q") || "";

  // Data filter
  const filteredData = useMemo(() => {
    return data?.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === "All" || item.category?.includes(category)) &&
        (!metal || item.metalType === metal) &&
        (!kt || item.goldKt === kt) &&
        item.price >= minPrice &&
        item.price <= maxPrice,
    );
  }, [data, query, category, metal, kt, minPrice, maxPrice]);

  // category change
  const handleCategoryClick = (item) => {
    setSearchParams({
      category: item,
      sort: sortType,
      page: 1,
      min: minPrice,
      max: maxPrice,
      q: query,
    });
  };

  const handleMetalChange = (value) => {
    setSearchParams({
      category,
      sort: sortType,
      page: 1,
      min: minPrice,
      max: maxPrice,
      q: query,
      metal: value,
      kt,
    });
  };

  const handleGoldKtChange = (value) => {
    setSearchParams({
      category,
      sort: sortType,
      page: 1,
      min: minPrice,
      max: maxPrice,
      q: query,
      metal,
      kt: value,
    });
  };

  // pagination page
  const pageHandler = (selectedPage) => {
    setSearchParams({
      category,
      sort: sortType,
      page: selectedPage,
      min: minPrice,
      max: maxPrice,
      q: query,
    });
  };

  // dynamic page
  const dynamicPage = Math.ceil(filteredData?.length / 16);

  // sorting validation
  const sortedData = useMemo(() => {
    if (!sortType) return filteredData;

    const sorted = [...filteredData];

    if (sortType === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sortType === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [filteredData, sortType]);

  // handle sorting
  const handleSort = (value) => {
    setSearchParams({
      category,
      sort: value,
      page: 1,
      min: minPrice,
      max: maxPrice,
      q: query,
    });
  };

  // pagination data
  const paginatedData = useMemo(() => {
    const list = sortedData.length > 0 ? sortedData : filteredData;

    return list?.slice(page * 16 - 16, page * 16);
  }, [sortedData, filteredData, page]);

  // handle price
  const handlePriceChange = ([min, max]) => {
    setSearchParams({
      category,
      sort: sortType,
      page: 1,
      min,
      max,
      q: query,
    });
  };

  // handle search
  const handleSearch = (value) => {
    setSearchParams({
      category,
      sort: sortType,
      page: 1,
      min: minPrice,
      max: maxPrice,
      q: value,
    });
  };

  // handle filter clear
  const handleClear = () => {
    setSearchParams({
      category: "All",
      sort: "",
      page: 1,
      min: 0,
      max: 20000,
      metal : "",
      kt : "",
      q: "",
    });

    setIsFilterOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-10 py-10">
        {/* category */}
        <div className="flex gap-2  md:justify-center text-lg overflow-x-auto scrollbar-hide md:mb-0 mb-4">
          {categoryOnlyData?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item)}
              className={`px-4 py-1  uppercase  relative text-black after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-black after:transition-all after:duration-300
  ${category === item ? "after:w-6" : "after:w-0 hover:after:w-6"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* filter */}
        <div className="flex gap-5 mt-4 items-center px-2 w-full">
          <button
            m
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-medium ml-4"
          >
            <FiFilter className="text-lg" />
            Filters
          </button>

          <FilterSection
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            minPrice={minPrice}
            maxPrice={maxPrice}
            category={category}
            query={query}
            onPriceChange={handlePriceChange}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryClick}
            metalTypes={metalTypes}
            goldKt={goldKt}
            selectedMetal={metal}
            selectedGoldKt={kt}
            onMetalChange={handleMetalChange}
            onGoldKtChange={handleGoldKtChange}
            onClear={handleClear}
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
                    {paginatedData?.map((product, index) => (
                      <ProductCard key={product.id} product={product} />
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
          // loading
          <ProductCardShimmer />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default React.memo(Products);
