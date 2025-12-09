import React from "react";
import data from "../data/FaqData.json";
import { Accordion } from "../Components/common/Accordion";
import { Footer } from "../Components/common/Footer";

export const Faq = () => {
  return (
    <>
    <main className="min-h-screen bg-[#f9fafb] px-4 md:px-8 py-10 flex justify-center">
  
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-black">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Clear answers to help you shop smoothly on Regalia.
        </p>

        <Accordion data={data} />
      </div>
    </main>
    <Footer />
    </>
  );
};
