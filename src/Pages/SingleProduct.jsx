import React, { useEffect, useState, useContext } from "react";
import { Footer } from "../Components/common/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../assets/Animations/loading.webm";
import { Breadcrumb } from "../Components/common/Breadcrumb";
import { StarRating } from "../Components/common/StarRating";
import { useCart } from "../Context/CartContext";
import { AddToCart } from "../Components/Button/AddToCart";
import { GoToCart } from "../Components/Button/GoToCart";
import { useWishlist } from "../Context/WishlistContext";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { SuggestedProduct } from "../Components/common/SuggestedProduct";
import { DataContext } from "../Context/DataContext";
import { DetailPageImage } from "../Components/common/DetailPageImage";

export const SingleProduct = () => {
  const { cartItems } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState("");
  const [expand, setExpand] = useState(false);
const {id} = params
const { data} = useContext(DataContext);
const [selectedImg, setSelectedImage] = useState("")

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://capstone-akansh-json-server.onrender.com/api/data/${Number(params.id)}`)
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);


  useEffect(()=>{
    if (singleProduct?.image?.length>0) {
      setSelectedImage(singleProduct.image[0])
    }
  }, [singleProduct])



  const orignalPrice = Math.round(
    singleProduct.price + singleProduct.price * (singleProduct.discount / 100)
  );

  const isItemInCart = cartItems.find(
    (cartItem) => cartItem.id === singleProduct.id
  );

  const isItemInWishlist = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === singleProduct.id
  );

  return (
    <>
      {singleProduct ? (
        <div className="max-w-5xl mx-auto px-6 pb-6">
          <Breadcrumb title={singleProduct.title} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            
            {/* <div className="flex justify-center md:justify-start"> */}
              {/* <div className="overflow-hidden absolute"> */}
                {/* Heart */}
                {/* <button */}
                  {/* onClick={() => toggleWishlist(singleProduct)} */}
                  {/* className="absolute top-2 right-2 text-xl z-10 transition-all duration-300" */}
                {/* > */}
                  {/* {isItemInWishlist ? ( */}
                    {/* <FaHeart className="text-black" /> */}
                  {/* ) : ( */}
                    {/* <FaRegHeart className="text-black" /> */}
                  {/* )} */}
                {/* </button>

                <img
                  src={singleProduct.image[0]}
                  alt={singleProduct.title}
                  className="rounded-xl max-w-[350px] w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div> */}
  <DetailPageImage  
  singleProduct={singleProduct}
  selectedImg={selectedImg}
  setSelectedImage={setSelectedImage}
  toggleWishlist={toggleWishlist}
  isItemInWishlist={isItemInWishlist} />
           

           {/* right */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-2xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>

              <div className="text-gray-700 text-sm">
                {String(singleProduct?.category || "")
                  .split(",")
                  .join("/")
                  .toUpperCase()}
              </div>

              <StarRating rating={singleProduct.rating} />

              <div className="flex gap-2 items-center flex-wrap">
                <span className="font-bold text-xl text-gray-900">
                  ₹{singleProduct.price}
                </span>

                
                <span className="line-through text-gray-500 text-sm">
                  ₹{orignalPrice}
                </span>
                <span className="text-amber-600 font-semibold">
                  ({singleProduct.discount}% OFF)
                </span>
              </div>

              <div className="text-gray-600 ">
                <p className={`${expand ? "" : "line-clamp-3"}`}>
                  {singleProduct.description}
                </p>

                {singleProduct.description?.length > 120 && (
                  <button
                    onClick={() => setExpand(!expand)}
                    className="text-sm font-semibold  mt-1 hover:opacity-70 transition"
                  >
                    {expand ? "See less" : "See more"}
                  </button>
                )}
              </div>

              {isItemInCart ? (
                <div className="flex flex-col gap-3 mt-4">
                  <GoToCart item={isItemInCart} />
                  <p className="text-green-600 font-semibold">
                    Product is already in your cart
                  </p>
                </div>
              ) : (
                <AddToCart singleProduct={singleProduct} />
              )}
            </div>
          </div>
        </div>
      ) : (
        // Loading
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
      {singleProduct && (
  <SuggestedProduct allProducts={data} product={singleProduct} />
)}
      <Footer />
    </>
  );
};
