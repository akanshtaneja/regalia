import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Components/common/Footer";

const About = () => {
  return (
    <>
      <main className="min-h-screen bg-white pt-14 px-4 sm:px-6 lg:px-20">

        {/* main heading */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-14">
          About Regalia
        </h1>

        {/* store */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <img
            src="/aboutus/aboutus.png"
            alt="Regalia Store"
            loading="lazy"
            className="w-full h-[420px]  rounded-2xl shadow-md"
          />

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Regalia — A Symbol of Elegance
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Regalia is built on the vision of making modern jewellery elegant,
              expressive, and timeless. Each piece is designed to reflect
              confidence, individuality, and the beauty of everyday luxury.
            </p>
          </div>
        </div>

        {/* mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To create jewellery that empowers. Regalia blends premium designs
              with everyday comfort, ensuring that everyone can own something
              beautiful, meaningful, and lasting.
            </p>
          </div>

          <img
            src="/aboutus/store.png"
            alt="Mission"
            loading="lazy"
            className="w-full h-[420px] rounded-2xl shadow-md"
          />
        </div>

        {/* why!!! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <img
            src="/aboutus/ring.png"
            alt="Why Regalia"
            loading="lazy"
            className="w-full h-[420px]  rounded-2xl shadow-md"
          />

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Why Choose Regalia?
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Modern, elegant and unique jewellery designs</li>
              <li>Premium quality materials and craftsmanship</li>
              <li>Perfect for daily wear and special occasions</li>
              <li>Affordable luxury for everyone</li>
              <li>Fast delivery & smooth shopping experience</li>
            </ul>
          </div>
        </div>

        {/* vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To redefine luxury for the modern generation. Regalia is evolving
              with new collections, trend-inspired pieces, and high-end designs
              crafted to express your story.
            </p>
          </div>

          <img
            src="/aboutus/braclet.png"
            alt="Vision"
            loading="lazy"
            className="w-full h-[420px]  rounded-2xl shadow-md"
          />
        </div>

       {/* start */}
        <div className="text-center mt-16 pb-14">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Start Your Journey with Regalia
          </h3>

          <p className="text-gray-600 mb-6">
            Discover timeless jewellery crafted for elegance and confidence.
          </p>

          <Link to="/products">
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition shadow-md">
              Explore Collection
            </button>
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default About