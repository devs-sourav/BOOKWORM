"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "../products/ProductCard";
import { Container } from "../shared/Container";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Fixed: Changed from single object to array of products
const sampleProducts = [
  {
    image: "./images/products/1.jpg",
    title: "The Rural Diaries: Love, Livestock, and Big Life Lessons Down on Mischief Farm",
    author: "Hilarie Burton",
    price: "14.82",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/2.jpg",
    title: "Dark in Death: An Eve Dallas Novel (In Death,...)",
    author: "J. D. Robb",
    price: "14.20",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/3.jpg",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "12.49",
    type: "Hardcover",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/4.jpg",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    price: "16.99",
    type: "Paperback",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/5.jpg",
    title: "Becoming",
    author: "Michelle Obama",
    price: "18.75",
    type: "Hardcover",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/6.jpg",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "15.35",
    type: "Paperback",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/7.jpg",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    price: "21.00",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/1.jpg",
    title: "The Rural Diaries: Love, Livestock, and Big Life Lessons Down on Mischief Farm",
    author: "Hilarie Burton",
    price: "14.82",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/2.jpg",
    title: "Dark in Death: An Eve Dallas Novel (In Death,...)",
    author: "J. D. Robb",
    price: "14.20",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/3.jpg",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "12.49",
    type: "Hardcover",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/4.jpg",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    price: "16.99",
    type: "Paperback",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/5.jpg",
    title: "Becoming",
    author: "Michelle Obama",
    price: "18.75",
    type: "Hardcover",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/6.jpg",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "15.35",
    type: "Paperback",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/7.jpg",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    price: "21.00",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/1.jpg",
    title: "The Rural Diaries: Love, Livestock, and Big Life Lessons Down on Mischief Farm",
    author: "Hilarie Burton",
    price: "14.82",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/2.jpg",
    title: "Dark in Death: An Eve Dallas Novel (In Death,...)",
    author: "J. D. Robb",
    price: "14.20",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
  {
    image: "./images/products/3.jpg",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "12.49",
    type: "Hardcover",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/4.jpg",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    price: "16.99",
    type: "Paperback",
    href: "#",
    category: "Most View",
  },
  {
    image: "./images/products/5.jpg",
    title: "Becoming",
    author: "Michelle Obama",
    price: "18.75",
    type: "Hardcover",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/6.jpg",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "15.35",
    type: "Paperback",
    href: "#",
    category: "Latest",
  },
  {
    image: "./images/products/7.jpg",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    price: "21.00",
    type: "Hardcover",
    href: "#",
    category: "Best sale",
  },
];

const categories = ["Best sale", "Most View", "Latest"];

export default function NewArival() {
  const [activeCategory, setActiveCategory] = useState("Best sale");
  const [showArrows, setShowArrows] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const containerRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredProducts = sampleProducts.filter(
    (product) => product.category === activeCategory
  );

  const calculateSlidesPerView = (width) => {
    if (width >= 1280) return 5;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const updateArrowVisibility = () => {
    const width = window.innerWidth;
    const slidesPerView = calculateSlidesPerView(width);
    setShowArrows(filteredProducts.length > slidesPerView);
  };

  useEffect(() => {
    updateArrowVisibility();
    window.addEventListener("resize", updateArrowVisibility);
    return () => window.removeEventListener("resize", updateArrowVisibility);
  }, [filteredProducts]);

  // Update navigation when swiper instance changes
  useEffect(() => {
    if (swiperInstance && swiperInstance.params && swiperInstance.params.navigation) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-medium">Featured Books</h2>
          <ul className="flex items-center">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer px-3 py-1 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group" ref={containerRef}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={
              showArrows
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={filteredProducts.length > 2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
            onSwiper={setSwiperInstance}
            className="product-swiper !overflow-y-visible !overflow-x-hidden"
          >
            {filteredProducts.map((product, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows - Show only if enough items */}
          {showArrows && (
            <>
              <div 
                ref={prevRef}
                className="swiper-button-prev-custom absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 group-hover:border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </div>

              <div 
                ref={nextRef}
                className="swiper-button-next-custom absolute -right-5 border border-gray-300 group-hover:border-gray-300 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </>
          )}
        </div>

        <div className="swiper-pagination-custom flex justify-center mt-8" />
      </Container>
    </div>
  );
}