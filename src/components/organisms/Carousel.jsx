import React, { memo, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import db from "../../data/CarouselData.json";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [autoPlay, setAutoPlay] = useState(true);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: autoPlay,
      autoplaySpeed: 3500,
      arrows: false,
      pauseOnHover: false,
      fade: true,
      accessibility: true,
    }),
    [autoPlay],
  );

  return (
    <div
      className="w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Homepage promotions"
    >
      <Slider {...settings}>
        {db.carousel.map((item) => (
          <div key={item.id} className="relative w-full md:h-[450px] h-[200px]">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

            {/* Image */}
            <div className="absolute right-0 top-0 h-full w-[50%] flex items-center justify-end z-10">
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                fetchPriority="high"
                className="md:h-[450px] w-auto h-[200px]"
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-5xl mx-auto px-4 md:px-10 w-full">
                <div className="text-white max-w-lg space-y-4">
                  <h3 className="text-gray-300 tracking-wide text-[12px] md:text-base">
                    {item.subtitle}
                  </h3>

                  <h1 className="text-lg md:text-3xl font-bold leading-tight">
                    {item.title}
                  </h1>

                  <Link to="/products" tabIndex={-1}>
  <button
    onFocus={() => setAutoPlay(false)}
    onBlur={() => setAutoPlay(true)}
    className="md:px-5 md:py-2 mt-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-md"
  >
    {item.button}
  </button>
</Link>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(Carousel);
