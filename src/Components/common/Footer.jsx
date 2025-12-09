import React from "react";
import { Link } from "react-router-dom";
import {FaFacebook,FaInstagram,FaPinterest,FaTwitter,FaYoutube,} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-10 border-t border-gray-200">
      
      
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/*logo */}
        <div>
          <Link to="/" className="inline-block">
            <h1 className="uppercase text-3xl tracking-widest font-semibold">Regalia</h1>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Timeless jewellery crafted for elegance and everyday luxury.
          </p>

          <p className="text-sm mt-4 text-gray-700">support@regalia.com</p>
          <p className="text-sm text-gray-700">+91 2725272527</p>
        </div>

        {/* info*/}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Information
          </h3>

          <ul className="space-y-3 text-sm">
            <Link to="/about">
              <li className="hover:text-black cursor-pointer">About Us</li>
            </Link>
            <Link to="/contact">
              <li className="hover:text-black cursor-pointer">Contact</li>
            </Link>
            <Link to="/orders">
              <li className="hover:text-black cursor-pointer">Your Orders</li>
            </Link>
            <Link to="/faq">
              <li className="hover:text-black cursor-pointer">FAQs</li>
            </Link>
          </ul>
        </div>

        {/* policies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Policies
          </h3>

          <ul className="space-y-3 text-sm">
            <Link to="/return">
              <li className="hover:text-black cursor-pointer">Return Policy</li>
            </Link>
            <Link to="/refund">
              <li className="hover:text-black cursor-pointer">Refund Policy</li>
            </Link>
            <Link to="/privacy">
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            </Link>
            <Link to="/terms">
              <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
            </Link>
          </ul>
        </div>

        {/* social media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stay Connected
          </h3>

          <div className="flex space-x-4 text-xl text-gray-700 mb-6">
            <FaFacebook className="hover:text-black cursor-pointer" />
            <FaInstagram className="hover:text-black cursor-pointer" />
            <FaTwitter className="hover:text-black cursor-pointer" />
            <FaPinterest className="hover:text-black cursor-pointer" />
            <FaYoutube className="hover:text-black cursor-pointer" />
          </div>

          <p className="text-sm mb-3">Subscribe for updates</p>

          <form className="flex">
            <label htmlFor="email" className="sr-only">Enter your Email to subscribe for updates</label>
            <input
            id="email"
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 text-sm rounded-l-md outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 rounded-r-md hover:bg-gray-900 text-sm"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* copyright */}
      <div className="mt-14 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-black">Regalia</span> — All rights reserved.
      </div>

    </footer>
  );
};
