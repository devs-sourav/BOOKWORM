// app/components/RomanceSection.js
"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { Container } from "../shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const books = [
  {
    image: "/images/products/1.jpg",
    format: "PAPERBACK",
    title: "Broken Faith: Inside the Word of Faith...",
    author: "Edward Lee",
    price: "10.29",
    href: "#",
  },
  {
    image: "/images/products/2.jpg",
    format: "PAPERBACK",
    title: "Eternity Springs: The McBrides of Texas Ev...",
    author: "Emily March",
    price: "6.99",
    href: "#",
  },
  {
    image: "/images/products/3.jpg",
    format: "HARDCOVER",
    title: "Jesus: The God Who Knows Your Name",
    author: "Max Lucado",
    price: "16.59",
    href: "#",
  },
  {
    image: "/images/products/4.jpg",
    format: "HARDCOVER, KINDLE, PAPERB...",
    title: "The Stellenbosch Mafia: Inside the Billionaire's...",
    author: "Pieter du Toit",
    price: "29.95 - 59.95",
    href: "#",
  },
  {
    image: "/images/products/1.jpg",
    format: "PAPERBACK",
    title: "Another Romance Novel",
    author: "Jane Smith",
    price: "12.99",
    href: "#",
  },
  {
    image: "/images/products/2.jpg",
    format: "KINDLE",
    title: "Love in the Digital Age",
    author: "Mike Johnson",
    price: "8.99",
    href: "#",
  },
];

const bannerSlides = [
  {
    title: "Romance",
    description:
      "Discover passionate love stories and heartwarming tales that will sweep you off your feet.",
    backgroundImage: "/images/banners/bgcategory.jpg",
    backgroundColor: "#FFD0CC",
  },
  {
    title: "New Releases",
    description:
      "Fresh romance novels from your favorite authors and exciting new voices.",
    backgroundImage: "/images/banners/bgcategory2.jpg",
    backgroundColor: "#E8F5E8",
  },
  {
    title: "Bestsellers",
    description: "The most popular romance novels that readers can't put down.",
    backgroundImage: "/images/banners/bgcategory.jpg",
    backgroundColor: "#F0E6FF",
  },
];

export default function RomanceSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div>
      <Container>
        <div className="grid grid-cols-12 gap-10 py-28">
          {/* Left Banner Slider */}
          <div className="col-span-3 h-full">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              className="h-full rounded-lg overflow-hidden banner-swiper"
            >
              {bannerSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-full p-8 flex flex-col justify-between relative overflow-hidden"
                    style={{
                      background: `${slide.backgroundColor} url("${slide.backgroundImage}") center/cover no-repeat`,
                      
                    }}
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        {slide.title}
                      </h2>
                      <p className="text-gray-700 mb-6">{slide.description}</p>
                    </div>
                    <div>
                      <button className="font-semibold text-black hover:underline">
                        VIEW ALL
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Book Cards Slider */}
          <div className="col-span-9 relative">
            <button
              ref={prevRef}
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="absolute left-[-24px] top-1/2 transform border-gray-300 -translate-y-1/2 bg-white border rounded-full p-3 shadow z-10 hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
            </button>

            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              navigation={false}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              className="products-swiper"
            >
              {books.map((book, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    product={{
                      image: book.image,
                      title: book.title,
                      author: book.author,
                      price: book.price,
                      type: book.format,
                      href: book.href,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              ref={nextRef}
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow z-10 hover:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .banner-swiper .swiper-pagination {
          bottom: 20px;
        }

        .banner-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7);
          opacity: 1;
          width: 8px;
          height: 8px;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: #fff;
        }

        .products-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
}
