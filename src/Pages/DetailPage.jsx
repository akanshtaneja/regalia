import React, { useEffect, useState, useContext } from "react";
import { Footer } from "../Components/common/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../assets/Animations/loading.webm";
import { Breadcrumb } from "../Components/common/Breadcrumb";
import { StarRating } from "../Components/common/StarRating";
import { useCart } from "../Context/CartContext";
import { AddToCart } from "../Components/Button/AddToCart";
import { useWishlist } from "../Context/WishlistContext";
import { SuggestedProduct } from "../Components/common/SuggestedProduct";
import { DataContext } from "../Context/DataContext";
import { DetailPageImage } from "../Components/common/DetailPageImage";
import { SaveRecentlyViewed } from "../utils/SaveRecentlyViewed";
import { DetailPageDescription } from "../Components/common/DetailPageDescription";
import { MdArrowForwardIos } from "react-icons/md";
import { FindSize } from "../Components/common/FindSize";
import { QuantityButton } from "../Components/Button/QuantityButton";
import { MiniCart } from "./MiniCart/miniCart";

export const DetailPage = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedImg, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [isSizeOpen, setSizeOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const maxQty = 4;

  // fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get( `https://capstone-akansh-json-server.onrender.com/api/data/${Number(id)}`);
      setSingleProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (singleProduct?.id) {
      SaveRecentlyViewed(singleProduct);
      setSelectedImage(singleProduct.image?.[0]);
    }
  }, [singleProduct]);

  // reset product
  useEffect(() => {
    setSelectedSize(null);
    setSelectedQty(1);
    setAlreadyAdded(false);
    setSizeError(false);
  }, [id]);

  useEffect(() => {
    if (!singleProduct || !selectedSize) return;

    const cartItem = cartItems.find(
      (item) => item.id === singleProduct.id && item.size === selectedSize
    );

    if (cartItem) {
      setSelectedQty(cartItem.quantity);
      setAlreadyAdded(true);
    } else {
      setAlreadyAdded(false);
    }
  }, [cartItems, singleProduct, selectedSize]);

  useEffect(() => {
    if (!alreadyAdded || !selectedSize) return;

    updateCartQuantity(
      {
        id: singleProduct.id,
        size: selectedSize,
      },
      selectedQty
    );
  }, [selectedQty]);

  // handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setSizeOpen(true);
      return;
    }

    setSizeError(false);

    addToCart({
      ...singleProduct,
      size: selectedSize,
      quantity: Math.min(selectedQty, maxQty),
    });
    setIsCartOpen(true);
  };

  // loading
  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(
    singleProduct.price + singleProduct.price * (singleProduct.discount / 100)
  );

  const isItemInWishlist = wishlistItems.find(
    (item) => item.id === singleProduct.id
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 pb-6">
        <Breadcrumb title={singleProduct.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          {/* left image */}
          <DetailPageImage
            singleProduct={singleProduct}
            selectedImg={selectedImg}
            setSelectedImage={setSelectedImage}
            toggleWishlist={toggleWishlist}
            isItemInWishlist={isItemInWishlist}
          />

          {/*-------------------------------RIGHT SIDE---------------------------------------------------*/}
          <div className="flex flex-col gap-4">
            <h1 className="md:text-2xl font-bold text-gray-800">
              {singleProduct.title}
            </h1>

            <StarRating rating={singleProduct.rating} />

            {/* price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">₹{singleProduct.price}</span>
              <span className="line-through text-gray-400 text-sm">
                ₹{originalPrice}
              </span>
              <span className="text-amber-600 font-semibold">
                ({singleProduct.discount}% OFF)
              </span>
            </div>

            {/* size */}
            <div className="flex flex-col gap-1 max-w-[240px]">
              <button
                onClick={() => setSizeOpen(true)}
                className={`flex justify-between items-center border px-4 py-3 font-semibold ${
                  selectedSize
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-600 hover:border-black"
                }`}
              >
                {selectedSize ? `Size: ${selectedSize}` : "Find your size"}
                <MdArrowForwardIos />
              </button>

              {sizeError && (
                <p className="text-sm text-red-500">Please select your size</p>
              )}
            </div>

            <FindSize
              isOpen={isSizeOpen}
              onClose={() => setSizeOpen(false)}
              singleProduct={singleProduct}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              onConfirm={(size) => {
                setSelectedSize(size);
                setSizeOpen(false);
                setSizeError(false);
              }}
            />

            {/* qtyy */}
            <div className="mt-4 flex items-start gap-4">
              <QuantityButton
                value={selectedQty}
                setValue={setSelectedQty}
                max={maxQty}
              />

              <div className="flex flex-col gap-1">
                {alreadyAdded ? (
                  <AddToCart
                    label="Go to Cart"
                    onClick={() => setIsCartOpen(true)}
                  />
                ) : (
                  <AddToCart onClick={handleAddToCart} />
                )}

                {/* already added */}
                {alreadyAdded && (
                  <p className="text-sm text-green-600">
                    ✓ Item is already in your cart
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailPageDescription singleProduct={singleProduct} />
      <SuggestedProduct allProducts={data} product={singleProduct} />
      <Footer />

      {isCartOpen && <MiniCart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};
