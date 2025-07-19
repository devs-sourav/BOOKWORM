"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "../shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1 from "../../../public/images/banners/banner.png";
import banner2 from "../../../public/images/banners/banner2.png";
import banner3 from "../../../public/images/banners/banner3.png";
import book from "../../../public/images/banners/book1.png";

export default function BannerSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sample data for left slider
  const leftSliderData = [
    {
      id: 1,
      subtitle: "AVAILABLE ONCE A YEAR",
      title: "Get 40% off on",
      titleSpan: "Orders over $149",
      image: book,
    },
    {
      id: 2,
      subtitle: "LIMITED TIME OFFER",
      title: "Special Deal on",
      titleSpan: "Premium Books",
      image: book,
    },
    {
      id: 3,
      subtitle: "FLASH SALE",
      title: "Up to 60% off",
      titleSpan: "Selected Items",
      image: book,
    },
  ];

  // Sample data for top banner slider
  const topBannerData = [
    { id: 1, image: banner2 },
    { id: 2, image: banner3 },
    { id: 3, image: banner1 },
  ];

  // Sample data for bottom banner slider
  const bottomBannerData = [
    { id: 1, image: banner3 },
    { id: 2, image: banner1 },
    { id: 3, image: banner2 },
  ];

  const handleSlideChange = (swiper) => {
    setIsTransitioning(true);
    setActiveSlide(swiper.realIndex);
    
    // Reset animations after transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  const handleSlideChangeTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row gap-4 py-10 bg-white">
          {/* Left Side Slider */}
          <div 
            className="relative w-full md:w-[887px] h-[590px] rounded-lg overflow-hidden"
            style={{
              backgroundImage: 'url("/images/banners/bannerbg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={600}
              onSlideChange={handleSlideChange}
              onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
              className="w-full h-full"
            >
              {leftSliderData.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative w-full h-full flex items-center justify-between gap-10 px-20">
                    {/* Text Section with left slide animation */}
                    <div 
                      className={`z-10 w-1/2 space-y-3 transition-all duration-1200 ease-out ${
                        !isTransitioning && activeSlide === index
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-32'
                      }`}
                      style={{
                        transitionDelay: !isTransitioning && activeSlide === index ? '200ms' : '0ms'
                      }}
                    >
                      <p className="text-base text-gray-400 font-semibold mb-2">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-[40px] font-bold text-black leading-tight">
                        {slide.title} <br />
                        <span className="text-black font-normal">
                          {slide.titleSpan}
                        </span>
                      </h1>
                      <button className="mt-6 px-12 py-3 bg-black text-white text-base font-medium rounded hover:bg-gray-800 transition-colors">
                        Explore Now
                      </button>
                    </div>
                    {/* Book Image with right slide animation */}
                    <div 
                      className={`relative w-1/2 h-[360px] transition-all duration-800 ease-out ${
                        !isTransitioning && activeSlide === index
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-24'
                      }`}
                      style={{
                        transitionDelay: !isTransitioning && activeSlide === index ? '400ms' : '0ms'
                      }}
                    >
                      <Image
                        src={slide.image}
                        alt="Book"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 border rounded flex items-center justify-center bg-white shadow z-10 hover:bg-gray-50 transition-colors">
              <span className="text-lg">{"<"}</span>
            </button>
            <button className="swiper-button-next-custom absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 border rounded flex items-center justify-center bg-white shadow z-10 hover:bg-gray-50 transition-colors">
              <span className="text-lg">{">"}</span>
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom absolute bottom-5 left-1/2 -translate-x-1/2 z-10"></div>
          </div>

          {/* Right Side Separate Sliders */}
          <div className="flex flex-col gap-4 w-full md:w-[435px]">
            {/* Top Banner Slider */}
            <div className="bg-white h-[287px] relative rounded-lg overflow-hidden">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full"
              >
                {topBannerData.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt="Top Banner"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Bottom Banner Slider */}
            <div className="bg-white h-[287px] relative rounded-lg overflow-hidden">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full"
              >
                {bottomBannerData.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt="Bottom Banner"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>

      {/* Custom Styles */}
      <style jsx>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.8);
          opacity: 1;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: white;
        }
      `}</style>
    </div>
  );
}