import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../Context/CartContext";
import { MiniCart } from "../../Pages/MiniCart/miniCart";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import { MenuItems } from "./MenuItems";
import { LocationDetect } from "./LocationDetect";


export const Navbar = ({ search, onSearchChange, user, setUser }) => {
  const { cartItems, cartQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search.trim() !== "") console.log("enter");
      navigate("/products");
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200 md:px-10 sticky top-0 z-50 px-4 py-7 ">
        <div className="max-w-5xl mx-auto relative flex justify-between items-center">
          {/* Logo / location */}
          <div className="flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-4">
            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="uppercase md:text-3xl tracking-widest font-semibold text-2xl">
                  Regalia
                </h1>
              </Link>
            </div>

            {/* LOCATION */}
            <div className="hidden md:flex">
              <LocationDetect />
            </div>
          </div>

          {/* search & CART & LOGIN BUTTON */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative flex items-center justify-center w-full md:w-auto">
              <Link to="/products" aria-label="Go to search page">
                <CiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  onKeyDown={handleKeyDown}
                  aria-hidden="true"
                />
              </Link>
              <label htmlFor="search" className="sr-only">
                Search Products
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-full pl-10 pr-3 py-1.5 w-[120px] outline-none transition-all  text-gray-400 text-sm "
              />
            </div>

            {/* cart quantity */}
            <button
              onClick={() =>   
                setIsCartOpen(true)}
              className="relative group"  >
              <CiShoppingCart className="h-7 w-7 text-gray-700 transition-colors duration-300" />
              <span className="absolute -top-2 -right-2 text-white text-xs rounded-full bg- font-bold bg-black px-1.5 py-0.5 shadow-md">
                {cartQuantity()}
              </span>
            </button>

            {/* desktop */}
            {user ? (
              <div
                className="relative text-sm font-semibold cursor-pointer hidden md:block"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <div
                  className="flex items-center gap-1"
                  role="button"
                  aria-haspopup="menu"
                  aria-expanded={isDropdownOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsDropdownOpen((prev) => !prev);
                    }
                    
                  }}
                  tabIndex={0}
                >
                  Hi, {user?.name?.split(" ")[0]}
                  <RiArrowDropDownFill
                    size={20}
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {/* desktop dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2  w-52 z-50  bg-white  rounded-2xl  border border-gray-200 shadow-lg">
                    <MenuItems
                      user={user}
                      setShowPopUp={setShowPopUp}
                      onItemClick={() => setIsDropdownOpen(true)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" aria-label="Go to Login/SignUp Page">
                <CiUser className="h-7 w-7 text-gray-700 transition-colors duration-300 hidden md:block" />
              </Link>
            )}

            {/* mobile hamburger */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <HiMenuAlt1 className="text-2xl text-gray-800" />
            </button>

            {isMenuOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setIsMenuOpen(false)}
                />

                <div
                  className="absolute top-0 left-0 h-full w-[280px] bg-white
                    px-6 py-5 flex flex-col"
                >
                  {/* main header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (!user) {
                          navigate("/login");
                        }
                      }}
                    >
                      <CiUser className="h-5 w-5 text-gray-700" />
                      <h2 className="text-base font-semibold">
                        Hi, {user?.name?.split(" ")[0] || "Guest"}
                      </h2>
                    </div>

                    <IoClose
                      className="text-2xl cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>
                  <div className="mb-6 mt-4">
                    <LocationDetect />
                  </div>

                  <div>
                    <MenuItems
                      user={user}
                      setShowPopUp={setShowPopUp}
                      onItemClick={() => setIsMenuOpen(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopUp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white w-[280px] p-9 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPopUp(false)}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowPopUp(false);
                  handleLogout();
                  onItemClick();
                }}
                className="px-3 py-1 rounded-md bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen ? <MiniCart onClose={() => setIsCartOpen(false)  } /> : ""}
    </>
  );
};
