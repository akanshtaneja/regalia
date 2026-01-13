import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import db from "../../data/CarouselData.json";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: false,
    fade: true,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {db.carousel.map((item) => (
          <div key={item.id} className="relative w-full md:h-[450px] h-[300px] ">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

            <div className="absolute right-0 top-0 h-full w-[50%] flex items-center justify-end z-10">
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                fetchPriority="high"
                className="md:h-[450px] w-auto h-[300px]"
              />
            </div>

            <div className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 text-white max-w-lg space-y-4">
              <h3 className="text-gray-300 tracking-wide text-[12px] md:text-base ">
                {item.subtitle}
              </h3>

              <h1 className="text-lg md:text-3xl font-bold leading-tight">
                {item.title}
              </h1>

              <Link to="/products">
                <button className="md:px-5 md:py-2 mt-3 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition rounded-md sm:text-sm px-3 py-1">
                  {item.button}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
