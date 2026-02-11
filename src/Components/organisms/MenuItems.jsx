import React, { useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { HiArrowPath } from "react-icons/hi2";
import { Link, useNavigate} from "react-router-dom";



export const MenuItems = ({user, onItemClick, setUser, setShowPopUp}) => {
    
  return (
    <div>
      {/* orders */}
      <Link
        to="/orders"
        className=" flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700  hover:bg-white hover:shadow-md transition-all duration-200"
        onClick={onItemClick}
      >
        <CgShoppingBag size={18} className="text-gray-700" />
        My Orders
      </Link>

      {/* Wishlist */}
      <Link
        to="/wishlist"
        className=" flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700  hover:bg-white hover:shadow-md 
        transition-all duration-200"
        onClick={onItemClick}
      >
        <FaRegHeart size={18} className="text-gray-700" />
        My Wishlist
      </Link>

      {/* retirn order */}
      <Link
        to="/return"
        className=" flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700  hover:bg-white hover:shadow-md 
        transition-all duration-200"
        onClick={onItemClick}
      >
        <HiArrowPath size={18} className="text-gray-700" />
        Return Order
      </Link>

      {/* Help Center */}
      <Link
        to="/contact"
        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700  hover:bg-white hover:shadow-md 
        transition-all duration-200"
        onClick={onItemClick}
      >
        <RiCustomerService2Line size={18} className="text-gray-700" />
        Help Center
      </Link>
      {user && (
        <button
       onClick={() => {
        
        setShowPopUp(true);
       
       }
         }
        className=" flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-200"
      >
        <MdLogout size={18} className="text-red-600" />
        Logout
      </button>
      )}
      
      
      
    </div>
    
  );
};
