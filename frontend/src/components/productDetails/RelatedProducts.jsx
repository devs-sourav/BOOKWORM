"use client";
import { useRef } from "react";
import ProductCard from "../products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    type: "PAPERBACK",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "14.99",
    image: "/images/products/1.jpg",
  },
  {
    id: 2,
    type: "KINDLE",
    title: "It Ends With Us",
    author: "Colleen Hoover",
    price: "1.75",
    image: "/images/products/2.jpg",
  },
  {
    id: 3,
    type: "PAPERBACK",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "12.99",
    image: "/images/products/3.jpg",
  },
  {
    id: 4,
    type: "PAPERBACK",
    title: "Verity",
    author: "Colleen Hoover",
    price: "13.30",
    image: "/images/products/4.jpg",
  },
  {
    id: 5,
    type: "KINDLE",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: "9.99",
    image: "/images/products/5.jpg",
  },
  {
    id: 6,
    type: "PAPERBACK",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    price: "10.50",
    image: "/images/products/6.jpg",
  },
  {
    id: 7,
    type: "PAPERBACK",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    price: "15.25",
    image: "/images/products/7.jpg",
  },
];

export default function RelatedProducts() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-10 relative">
      <h2 className="text-2xl font-semibold mb-6">Related products</h2>

      {/* Custom navigation buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 -left-6 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 -right-6 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
