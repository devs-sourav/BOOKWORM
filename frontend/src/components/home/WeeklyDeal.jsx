"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BookCard from "./BookCard";
import { Container } from "../shared/Container";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const books = [
  {
    imageSrc: "/images/products/1.jpg",
    format: "Paperback",
    title: "When We Believed in Mermaids: A Novel",
    author: "Barbara O'Neal",
    price: "2.00",
  },
  {
    imageSrc: "/images/products/2.jpg",
    format: "Kindle",
    title: "Angry God (All Saints High Book 3)",
    author: "L.J. Shen",
    price: "1.30",
    originalPrice: "1.75",
  },
  {
    imageSrc: "/images/products/3.jpg",
    format: "Hardcover",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: "3.50",
    originalPrice: "4.20",
  },
  {
    imageSrc: "/images/products/4.jpg",
    format: "Paperback",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: "2.75",
  },
];

export const WeeklyDeal = () => {
  return (
    <div className="py-8 lg:py-20 bg-gray-100">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
            Weekly Deals
          </h2>
          <p className="text-black text-sm lg:text-base">
            Don't miss out on these limited-time offers!
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="pb-12 divide-x divide-gray-300"
          >
            {books.map((book, i) => (
              <SwiperSlide key={i} className="h-auto ">
                <div className="h-full">
                  <BookCard {...book} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 w-10 h-10 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 -ml-5 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 w-10 h-10 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 -mr-5 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
        </div>

        <style jsx global>{`
          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #d1d5db;
            opacity: 1;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .swiper-pagination-custom .swiper-pagination-bullet-active {
            background: #374151;
            transform: scale(1.2);
          }

          .swiper-pagination-custom .swiper-pagination-bullet:hover {
            background: #9ca3af;
            cursor: pointer;
          }
        `}</style>
      </Container>
    </div>
  );
};
